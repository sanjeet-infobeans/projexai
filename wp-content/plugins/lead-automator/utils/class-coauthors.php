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

}

new LA_CoAuthors();