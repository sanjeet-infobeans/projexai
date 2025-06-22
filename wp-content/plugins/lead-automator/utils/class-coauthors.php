<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class LA_CoAuthors {

    private $custom_roles = [
        'salesperson',
        'technical_lead',
        'business_analyst',
        'manager',
    ];

    /**
     * Constructor to initialize the CoAuthors functionality.
     */
    public function __construct() {
        add_post_type_support( 'client_profile', 'author' );
        add_action('init', [ $this, 'allow_custom_roles_in_coauthor_callback'] );
        add_filter('coauthors_plus_allowed_roles', [ $this, 'coauthors_allow_custom_role_callback'] );
        add_filter( 'coauthors_supported_post_types', [$this, 'coauthors_allow_custom_post_types_callback'] );
        add_filter('coauthors_edit_author_ajax_response', [ $this, 'coauthor_metabox_user_display_callback'], 10, 2 );

        add_filter('coauthors_edit_author_cap', function ($cap) {
            return 'edit_posts';
        });

        add_action('rest_api_init', [$this, 'add_post_coauthors_rest_callback']);
        add_action('rest_api_init', [$this, 'remove_post_coauthors_rest_callback']);

    }
    
    public function coauthors_allow_custom_post_types_callback( $types ) {
        $types[] = 'client_profile';
        return $types;
    }

    public function allow_custom_roles_in_coauthor_callback() {
        foreach ( $this->custom_roles as $role_name ) {
            $role = get_role($role_name);
            if ( $role && !$role->has_cap('edit_posts') ) {
                $role->add_cap('edit_posts');
            }
        }
    }

    public function coauthors_allow_custom_role_callback($roles) {
        return array_merge($roles, $this->custom_roles);
    }

    function coauthor_metabox_user_display_callback($response, $user) {
        // Get the user roles (usually one for most users)
        $roles = $user->roles;
        $role = !empty($roles) ? ucfirst(str_replace('_', ' ', $roles[0])) : 'User';

        // Customize the display label
        $label = $user->display_name . ' (' . $role . ')';

        // Return only what's needed
        return [
            'ID'    => $user->ID,
            'value' => $user->user_login,
            'label' => $label,
        ];
    }

    public function add_post_coauthors_rest_callback() {
        register_rest_route('client/v1', '/add-coauthor', [
            'methods'  => 'POST',
            'callback' => [ $this, 'add_coauthor_to_post' ],
            'permission_callback' => function () {
                return current_user_can('edit_posts'); // adjust permission if needed
            },
            'args' => [
                'post_id' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
                'coauthors' => [
                    'required' => true,
                    'type'     => 'array',
                    'items'    => ['type' => 'string'],
                ],
            ]
        ]);
    }

    public function add_coauthor_to_post($request) {
        if (!function_exists('get_coauthors')) {
            return new WP_Error('coauthors_missing', 'Co-Authors Plus plugin not active', ['status' => 500]);
        }

        $post_id    = (int) $request->get_param('post_id');
        $usernames  = $request->get_param('coauthors');

        $coauthor_objects = [];

        foreach ($usernames as $username) {
            $coauthor = get_user_by('login', $username);
            if (!$coauthor) {
                return new WP_Error('invalid_user', "User {$username} not found", ['status' => 400]);
            }
            $coauthor_objects[] = $coauthor;
        }

        $usernames_only = array_map(fn($u) => $u->user_login, $coauthor_objects);

        // Set co-authors
        global $coauthors_plus;
        if (!isset($coauthors_plus)) {
            $coauthors_plus = new CoAuthors_Plus();
        }

        $coauthors_plus->add_coauthors($post_id, $usernames_only);

        return [
            'success' => true,
            'message' => 'Co-authors added successfully.',
            'coauthors' => array_map(fn($u) => $u->user_login, $coauthor_objects)
        ];
    }

    public function remove_post_coauthors_rest_callback() {
        register_rest_route('client/v1', '/remove-coauthors', [
            'methods'  => 'POST',
            'callback' => [ $this, 'remove_coauthors_from_post' ],
            'permission_callback' => function () {
                return true; //current_user_can('edit_posts'); // Adjust as needed
            },
            'args' => [
                'post_id' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
                'coauthors' => [
                    'required' => true,
                    'type'     => 'array',
                    'items'    => ['type' => 'string'],
                ],
            ],
        ]);
    }

    public function remove_coauthors_from_post(WP_REST_Request $request) {
        $post_id   = (int) $request->get_param('post_id');
        $to_remove = $request->get_param('coauthors');

        if (!function_exists('get_coauthors')) {
            return new WP_Error('coauthors_plugin_missing', 'Co-Authors Plus plugin is not active', ['status' => 500]);
        }

        global $coauthors_plus;

        if (!isset($coauthors_plus)) {
            $coauthors_plus = new CoAuthors_Plus();
        }

        // Get current co-authors
        $current_coauthors = get_coauthors($post_id);
        $remaining = [];

        foreach ($current_coauthors as $author) {
            if (!in_array($author->user_login, $to_remove, true)) {
                $remaining[] = $author->user_login;
            }
        }

        // Update co-authors list
        $coauthors_plus->add_coauthors($post_id, $remaining);

        return rest_ensure_response([
            'success'   => true,
            'message'   => 'Selected co-authors removed.',
            'remaining' => $remaining,
        ]);
    }

}

new LA_CoAuthors();
