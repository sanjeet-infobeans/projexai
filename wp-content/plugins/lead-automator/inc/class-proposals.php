<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Proposals {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'proposal_add_endpoint_callback' ] );
        add_action( 'init', [ $this, 'register_proposal_taxonomies' ] );
        add_action( 'rest_api_init', [ $this, 'get_client_profile_proposals_callback' ] );
    }


    public function save_new_proposal_version( $post_id, $proposal_text ) {
        
        if ( ! $post_id || empty( $proposal_text ) ) return false;

        $meta = get_post_meta( $post_id );
        $index = 1;

        // Find the next available index
        foreach ( $meta as $key => $value ) {
            if ( preg_match( '/^proposal_(\d+)$/', $key, $matches ) ) {
                $number = intval( $matches[1] );
                if ( $number >= $index ) {
                    $index = $number + 1;
                }
            }
        }

        $key = 'proposal_' . $index;

        // Store the proposal as post meta
        return add_post_meta( $post_id, $key, $proposal_text );
    }

    public function proposal_add_endpoint_callback() {
        register_rest_route( 'client/v1', '/add-proposal', [
            'methods'  => 'POST',
            'callback' => [ $this, 'handle_add_proposal' ],
            'permission_callback' => '__return_true', // Make public; change if needed
            'args' => [
                'post_id' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
                'proposal_text' => [
                    'required' => true,
                    'type'     => 'string',
                ],
            ],
        ]);
    }

    public function handle_add_proposal( $request ) {
        $post_id       = $request->get_param( 'post_id' );
        $proposal_text = $request->get_param( 'proposal_text' );

        if ( get_post_type( $post_id ) !== 'client_profile' ) {
            return new WP_Error( 'invalid_post_type', 'Invalid post type.', [ 'status' => 400 ] );
        }

        $success = $this->save_new_proposal_version( $post_id, $proposal_text );

        if ( ! $success ) {
            return new WP_Error( 'proposal_save_error', 'Failed to save proposal.', [ 'status' => 500 ] );
        }

        // Return all proposals for this post
        $meta      = get_post_meta( $post_id );
        $proposals = [];

        foreach ( $meta as $key => $value ) {
            if ( strpos( $key, 'proposal_' ) === 0 ) {
                $proposals[ $key ] = maybe_unserialize( $value[0] );
            }
        }

        return [
            'success'   => true,
            'proposals' => $proposals,
        ];
    }

    public function register_proposal_taxonomies() {
        // Register Tech Stack
        register_taxonomy( 'tech_stack', 'client_profile', array(
            'label'        => 'Tech Stack',
            'hierarchical' => false,
            'public'       => true,
            'show_in_rest' => true,
            'show_ui'            => true, // ✅ SHOWS IN ADMIN MENU
            'show_admin_column'  => true, // ✅ Shows in table column for lead_proposal
            'rewrite'      => array( 'slug' => 'tech-stack' ),
        ) );

        // Register Project Nature
        register_taxonomy( 'project_nature', 'client_profile', array(
            'label'        => 'Project Nature',
            'hierarchical' => false,
            'public'       => true,
            'show_in_rest' => true,
            'show_ui'            => true, // ✅ SHOWS IN ADMIN MENU
            'show_admin_column'  => true, // ✅ Shows in table column for lead_proposal
            'rewrite'      => array( 'slug' => 'project-nature' ),
        ) );

        // Prefill Terms — run only once
        if ( ! get_option( 'lead_proposal_taxonomy_prefilled' ) ) {

            $tech_stack_terms = array(
                'React', 'Angular', 'Vue.js', 'Next.js',
                'Node.js', 'Python', 'PHP', 'Java', 'Go',
                'WordPress', 'Contentful', 'Flutter', 'React Native',
                'Docker', 'Kubernetes', 'MySQL', 'MongoDB',
                'AWS', 'Azure', 'GCP', 'LangChain', 'GPT-4', 'Llama',
                'Bubble', 'OutSystems', 'Retool'
            );

            $project_nature_terms = array(
                'Web App', 'Mobile App', 'SaaS Platform', 'E-commerce',
                'Internal Tool', 'Website/Corporate Site', 'Integration Project',
                'AI/ML/LLM Enabled', 'Data Analytics Dashboard',
                'MVP', 'POC/Prototype', 'CMS Migration',
                'Low-code Automation', 'White-label Product'
            );

            foreach ( $tech_stack_terms as $term ) {
                if ( ! term_exists( $term, 'tech_stack' ) ) {
                    wp_insert_term( $term, 'tech_stack' );
                }
            }

            foreach ( $project_nature_terms as $term ) {
                if ( ! term_exists( $term, 'project_nature' ) ) {
                    wp_insert_term( $term, 'project_nature' );
                }
            }

            // Mark as prefilled so this doesn’t run again
            update_option( 'lead_proposal_taxonomy_prefilled', true );
        }
    }

    public function get_client_profile_proposals_callback() {
        register_rest_route( 'client/v1', '/proposals', [
            'methods'  => 'GET',
            'callback' => [ $this, 'get_client_profile_proposals' ],
            'permission_callback' => '__return_true', // Make public; change if needed
            'args'     => [
                'post_id' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
            ],
        ] );
    }

    public function get_client_profile_proposals( $request ) {
        $post_id = $request->get_param( 'post_id' );

        if ( get_post_type( $post_id ) !== 'client_profile' ) {
            return new WP_Error( 'invalid_post_type', 'Invalid post type.', [ 'status' => 400 ] );
        }

        $meta      = get_post_meta( $post_id );
        $proposals = [];

        foreach ( $meta as $key => $value ) {
            if ( strpos( $key, 'proposal_' ) === 0 ) {
                $proposals[ $key ] = maybe_unserialize( $value[0] );
            }
        }

        if ( empty( $proposals ) ) {
            return new WP_REST_Response( [ 'message' => 'No proposals found.' ], 200 );
        }

        return new WP_REST_Response( [
            'post_id'   => $post_id,
            'proposals' => $proposals,
        ], 200 );
    }
}