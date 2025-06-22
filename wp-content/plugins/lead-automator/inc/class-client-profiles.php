<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Client_Profiles {

    public function __construct() {
        add_action( 'init', [ $this, 'register_client_profile_cpt' ] );
        add_action( 'add_meta_boxes', [ $this, 'add_client_profile_meta_box' ] );
        add_action( 'save_post', [ $this, 'save_client_profile_meta_box' ] );
        add_action( 'admin_menu', [ $this, 'client_profile_csv_import_menu' ] );
        add_action( 'rest_api_init', [ $this, 'client_profile_rest_callback' ] );
        add_action( 'init', [ $this, 'client_profile_meta_register_callback' ]);
        add_filter( 'update_post_metadata', [ $this, 'validate_lead_status_before_save' ], 10, 4);
        add_action( 'update_post_meta', [ $this, 'create_project_on_onboarded' ], 10, 4);
    }

    // === 1. Register Custom Post Type ===
    public function register_client_profile_cpt() {
        register_post_type( 'client_profile', array(
            'labels' => array(
                'name' => 'Client Profiles',
                'singular_name' => 'Client Profile',
                'add_new_item' => 'Add New Client',
                'edit_item' => 'Edit Client',
            ),
            'public'        => true,
            'has_archive'   => true,
            'menu_icon'     => 'dashicons-id-alt',
            'supports'      => array( 'title', 'comments' ),
            'show_in_rest'  => true,
        ));
    }

    // === 2. Add Meta Box ===
    public function add_client_profile_meta_box() {
        add_meta_box(
            'client_profile_meta_box',
            'Client Details',
            [ $this, 'render_client_profile_meta_box' ],
            'client_profile',
            'normal',
            'default'
        );
    }

    public function render_client_profile_meta_box( $post ) {
        $fields = array( 'client_name', 'industry', 'location', 'contact_person', 'email', 'phone', 'status', 'lead_status' );
        foreach ( $fields as $field ) {
            ${$field} = get_post_meta( $post->ID, $field, true );
        }
        $lead_statuses = self::get_client_profile_statuses();
        ?>
        <table class="form-table">
            <tr><th>Client Name</th><td><input type="text" name="client_name" value="<?php echo esc_attr($client_name); ?>" class="widefat" /></td></tr>
            <tr><th>Industry</th><td><input type="text" name="industry" value="<?php echo esc_attr($industry); ?>" class="widefat" /></td></tr>
            <tr><th>Location</th><td><input type="text" name="location" value="<?php echo esc_attr($location); ?>" class="widefat" /></td></tr>
            <tr><th>Contact Person</th><td><input type="text" name="contact_person" value="<?php echo esc_attr($contact_person); ?>" class="widefat" /></td></tr>
            <tr><th>Email</th><td><input type="email" name="email" value="<?php echo esc_attr($email); ?>" class="widefat" /></td></tr>
            <tr><th>Phone</th><td><input type="text" name="phone" value="<?php echo esc_attr($phone); ?>" class="widefat" /></td></tr>
            <tr><th>Status</th>
                <td>
                    <select name="status">
                        <option value="1" <?php selected($status, '1'); ?>>Active</option>
                        <option value="0" <?php selected($status, '0'); ?>>Inactive</option>
                    </select>
                </td>
            </tr>
            <tr><th>Lead Status</th>
                <td>
                    <select name="lead_status" id="lead_status">
                        <option value="">Select Status</option>
                        <?php foreach ( $lead_statuses as $key => $label ) : ?>
                            <option value="<?php echo esc_attr( $key ); ?>" <?php selected( $lead_status, $key ); ?>>
                                <?php echo esc_html( $label ); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </td>
            </tr>
        </table>
        <?php
    }

    // === 3. Save Meta Box Data ===
    public function save_client_profile_meta_box( $post_id ) {
        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return;
        if ( get_post_type($post_id) !== 'client_profile' ) return;

        $fields = array( 'client_name', 'industry', 'location', 'contact_person', 'email', 'phone', 'status', 'lead_status' );
        foreach ( $fields as $field ) {
            if ( isset($_POST[$field]) ) {
                update_post_meta( $post_id, $field, sanitize_text_field($_POST[$field]) );
            }
        }
    }

    // === 4. CSV Import Admin Page ===
    public function client_profile_csv_import_menu() {
        add_submenu_page(
            'edit.php?post_type=client_profile',
            'Import Clients CSV',
            'Import CSV',
            'manage_options',
            'client-csv-import',
            [ $this, 'client_profile_csv_import_page' ]
        );
    }

    public function client_profile_csv_import_page() {
        ?>
        <div class="wrap">
            <h1>Import Clients from CSV</h1>
            <form method="post" enctype="multipart/form-data">
                <input type="file" name="client_csv" accept=".csv" required />
                <?php submit_button('Import CSV'); ?>
            </form>
        </div>
        <?php

        if ( isset($_FILES['client_csv']) && current_user_can('manage_options') ) {
            $file = $_FILES['client_csv']['tmp_name'];
            if ( is_uploaded_file($file) ) {
                $handle = fopen($file, 'r');
                if ( $handle !== false ) {
                    $header = fgetcsv($handle); // Skip header row
                    $count = 0;
                    while ( ($data = fgetcsv($handle)) !== false ) {
                        $title = sanitize_text_field($data[0]); // Client Name (also used as post title)

                        $post_id = wp_insert_post( array(
                            'post_type'   => 'client_profile',
                            'post_title'  => $title,
                            'post_status' => 'publish',
                        ) );

                        if ( $post_id && ! is_wp_error($post_id) ) {
                            update_post_meta( $post_id, 'client_name', sanitize_text_field($data[0]) );
                            update_post_meta( $post_id, 'industry', sanitize_text_field($data[1]) );
                            update_post_meta( $post_id, 'location', sanitize_text_field($data[2]) );
                            update_post_meta( $post_id, 'contact_person', sanitize_text_field($data[3]) );
                            update_post_meta( $post_id, 'email', sanitize_email($data[4]) );
                            update_post_meta( $post_id, 'phone', sanitize_text_field($data[5]) );
                            update_post_meta( $post_id, 'status', sanitize_text_field($data[6]) );
                            update_post_meta( $post_id, 'lead_status', sanitize_text_field($data[7]) );
                            $count++;
                        }
                    }
                    fclose($handle);
                    echo "<div class='notice notice-success'><p>Imported {$count} clients.</p></div>";
                }
            }
        }
    }

    public function client_profile_rest_callback() {
        register_rest_route( 'projexai/v1', '/client-profiles', array(
            'methods'  => 'GET',
            'callback' => [ $this, 'get_all_client_profiles' ],
            'permission_callback' => '__return_true', // Public API
            'args' => [
                'author' => [
                    'type'        => 'string',
                    'required'    => false,
                    'description' => 'Filter posts by author/co-author',
                ],
                'id'     => [
                    'type' => 'integer',
                    'required' => false,
                    'description' => 'Client Profile post ID to fetch'
                ]
            ]
        ));
        // Add POST and PUT for add/update
        register_rest_route( 'projexai/v1', '/client-profile', array(
            'methods'  => array('POST', 'PUT'),
            'callback' => [ $this, 'add_or_update_client_profile' ],
            'permission_callback' => function() { return current_user_can('edit_posts'); },
            'args' => [
                'id' => [
                    'type' => 'integer',
                    'required' => false,
                    'description' => 'ID for update (PUT only)'
                ],
                'title' => [
                    'type' => 'string',
                    'required' => true,
                ],
                'client_name' => [ 'type' => 'string', 'required' => true ],
                'industry' => [ 'type' => 'string', 'required' => false ],
                'location' => [ 'type' => 'string', 'required' => false ],
                'contact_person' => [ 'type' => 'string', 'required' => false ],
                'email' => [ 'type' => 'string', 'required' => false ],
                'phone' => [ 'type' => 'string', 'required' => false ],
                'status' => [ 'type' => 'string', 'required' => false ],
                'lead_status' => [ 'type' => 'string', 'required' => false ],
            ]
        ));
    }

    public function get_all_client_profiles( $request ) {

        $author_login = $request->get_param('author');
        $post_id      = $request->get_param('id');

        $args = array(
            'post_type'      => 'client_profile',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        );

        if ( $post_id ) {
            $args['post__in'] = [ $post_id ]; // Fetch specific post by ID
        }

        if ( $author_login ) {
            $author_args = $this->filter_rest_by_authors_args($author_login);
            if ( is_wp_error($author_args) ) {
                return $author_args; // Return error if no valid authors found
            }
            $args['tax_query'] = isset($author_args['tax_query']) ? $author_args['tax_query'] : [];
        }
        $query = new WP_Query( $args );
        $results = [];

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $id = get_the_ID();

                $authors = $this->get_authors( $id );
                $lead_status = get_post_meta( $id, 'lead_status', true );
                $status = get_post_meta( $id, 'status', true );
                $results[] = array(
                    'id'                    => $id,
                    'title'                 => get_the_title(),
                    'client_name'           => get_post_meta( $id, 'client_name', true ),
                    'industry'              => get_post_meta( $id, 'industry', true ),
                    'location'              => get_post_meta( $id, 'location', true ),
                    'contact_person'        => get_post_meta( $id, 'contact_person', true ),
                    'email'                 => get_post_meta( $id, 'email', true ),
                    'phone'                 => get_post_meta( $id, 'phone', true ),
                    'status'                => $status,
                    'status_readable'       => $status ? 'Active' : 'Inactive',
                    'lead_status'           => $lead_status,
                    'lead_status_readable'  => LEAD_AUTOMATOR_LEAD_STATUSES[$lead_status] ?? '',
                    'authors'               => $authors,
                );
            }
            wp_reset_postdata();
        }

        return rest_ensure_response( $results );
    }

    public function filter_rest_by_authors_args ( $author_login_param ) {
        $args = [];
        if ($author_login_param) {
            $author_logins = array_map('trim', explode(',', $author_login_param));
            $author_slugs = [];

            foreach ($author_logins as $login) {
                $user = get_user_by('login', $login);
                if ($user) {
                    $author_slugs[] = 'cap-' . $user->user_nicename;
                }
            }

            if (!empty($author_slugs)) {
                $args['tax_query']  = [
                    'relation' => 'AND', // Match any of the authors
                    [
                    'taxonomy' => 'author',
                    'field'    => 'slug',
                    'terms'    => $author_slugs,
                    'operator' => 'IN', // Match any
                ]];
            } else {
                return new WP_Error('invalid_authors', 'No valid users found from author list.', ['status' => 400]);
            }
        }
        return $args;

    }

    public function get_authors( $post_id ) {
        $authors = get_coauthors( $post_id );
        if ( empty( $authors ) ) {
            return [];
        }

        $author_data = [];
        foreach ( $authors as $author ) {
            $author_data[] = [
                'ID'         => $author->ID,
                'display_name' => $author->display_name,
                'user_login' => $author->user_login,
                'roles'      => $author->roles,
            ];
        }
        return $author_data;
    }

    public function client_profile_meta_register_callback() {
        register_post_meta('client_profile', 'lead_status', [
            'type'         => 'string',
            'single'       => true,
            'show_in_rest' => [
                'schema' => [
                    'type' => 'string',
                    'enum' => self::get_client_profile_statuses(true),
                ]
            ],
            'auth_callback' => '__return_true'
        ]);
    }

    public function validate_lead_status_before_save($check, $object_id, $meta_key, $meta_value) {
        if ($meta_key === 'lead_status') {
            $allowed = self::get_client_profile_statuses(true);
            if (!in_array($meta_value, $allowed, true)) {
                return false; // prevent saving invalid value
            }
        }
        return $check;
    }

    public static function get_client_profile_statuses( $keys = false ) {
        if ( $keys ) {
            return array_keys( LEAD_AUTOMATOR_LEAD_STATUSES );
        }
        // Return the full array of statuses
        return LEAD_AUTOMATOR_LEAD_STATUSES;
    }

    /**
     * Handle add/update client_profile via REST API
     */
    public function add_or_update_client_profile( $request ) {
        $params = $request->get_params();
        $is_update = $request->get_method() === 'PUT' || !empty($params['id']);
        $post_id = isset($params['id']) ? intval($params['id']) : 0;
        $fields = [ 'client_name', 'industry', 'location', 'contact_person', 'email', 'phone', 'status', 'lead_status' ];
        $postarr = [
            'post_type'   => 'client_profile',
            'post_title'  => sanitize_text_field($params['title']),
            'post_status' => 'publish',
        ];
        if ($is_update && $post_id) {
            $postarr['ID'] = $post_id;
            $existing = get_post($post_id);
            if (!$existing || $existing->post_type !== 'client_profile') {
                return new WP_Error('not_found', 'Client Profile not found', ['status' => 404]);
            }
            $post_id = wp_update_post($postarr, true);
        } else {
            $post_id = wp_insert_post($postarr, true);
        }
        if (is_wp_error($post_id)) {
            return $post_id;
        }
        
        $lead_status_updated = false;
        foreach ($fields as $field) {
            if (isset($params[$field])) {
                $value = sanitize_text_field($params[$field]);
                if ($field === 'email') $value = sanitize_email($params[$field]);
                
                // Check if lead_status is being updated to "onboarded"
                if ($field === 'lead_status' && $value === 'onboarded') {
                    $lead_status_updated = true;
                }
                
                update_post_meta($post_id, $field, $value);
            }
        }
        
        // If lead_status was updated to "onboarded", create project
        if ($lead_status_updated) {
            $this->create_project_on_onboarded(0, $post_id, 'lead_status', 'onboarded');
        }
        
        $response = [
            'id' => $post_id,
            'title' => get_the_title($post_id),
        ];
        foreach ($fields as $field) {
            $response[$field] = get_post_meta($post_id, $field, true);
        }
        return rest_ensure_response($response);
    }

    public function create_project_on_onboarded($meta_id, $object_id, $meta_key, $meta_value) {
        if ($meta_key === 'lead_status' && $meta_value === 'onboarded') {
            // Get the client profile data
            $client_profile = get_post($object_id);
            if (!$client_profile || $client_profile->post_type !== 'client_profile') {
                return;
            }
            
            $client_name = get_post_meta($object_id, 'client_name', true);
            $client_title = $client_profile->post_title;
            
            // Create project title: client_name + title
            $project_title = trim($client_name . ' - ' . $client_title);
            
            // Check if project already exists for this client
            $existing_project = get_posts([
                'post_type' => 'projects',
                'meta_query' => [
                    [
                        'key' => '_project_client',
                        'value' => $object_id,
                        'compare' => '='
                    ]
                ],
                'post_status' => 'publish',
                'numberposts' => 1
            ]);
            
            if (!empty($existing_project)) {
                return; // Project already exists for this client
            }
            
            // Create the project
            $project_id = wp_insert_post([
                'post_type' => 'projects',
                'post_title' => $project_title,
                'post_status' => 'publish',
                'post_content' => 'Project created automatically when client was onboarded.'
            ]);
            
            if (!is_wp_error($project_id)) {
                // Map the client to the project
                update_post_meta($project_id, '_project_client', $object_id);
                
                // Log the project creation
                error_log("Project created for onboarded client: {$project_id} - {$project_title}");
            }
        }
    }

}
