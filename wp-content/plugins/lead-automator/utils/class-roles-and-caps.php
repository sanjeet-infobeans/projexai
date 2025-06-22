<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}
/**
 * Class LA_Roles_And_Caps
 *
 * Handles the creation and management of custom roles and capabilities for the Lead Automator plugin.
 */

class LA_Roles_And_Caps {

    private static $roles = [
        'salesperson'      => 'Salesperson',
        'technical_lead'   => 'Technical Lead',
        'business_analyst' => 'Business Analyst',
        'manager'          => 'Manager',
        'team_member'      => 'Team Member',
    ];

    private static $capabilities = [
        'client_management' => [
            'view_own_client_data',
            'view_all_client_data',
            'view_client_data_if_stakeholder',
            'initiate_client_communication',
            'view_client_communication',
            'delete_client_data'
        ],
        'proposal_workflow' => [
            'onboard_client_requirement',
            'add_stakeholders',
            'create_draft_proposal',
            'finalize_proposal',
            'edit_draft_time_estimation',
            'finalize_time_estimation',
            'suggest_team',
            'finalize_team'
        ],
        'user_stories' => [
            'generate_user_stories',
            'edit_user_stories'
        ],
        'sales_pipeline' => [
            'view_own_sales_pipeline',
            'view_all_sales_pipeline',
        ],
        'user_role_management' => [
            'manage_users_and_roles'
        ],
    ];

    public function __construct() {

        add_filter('rest_user_collection_params', function ($params) {
            $params['roles'] = [
                'description' => 'Filter users by role.',
                'type'        => 'array',
                'items'       => ['type' => 'string'],
                'required'    => false,
            ];
            return $params;
        });


        add_filter('rest_endpoints', function ($endpoints) {
            if (isset($endpoints['/wp/v2/users'])) {
                foreach ($endpoints['/wp/v2/users'] as &$endpoint) {
                    if (isset($endpoint['permission_callback'])) {
                        $endpoint['permission_callback'] = '__return_true'; // ⚠️ Use cautiously
                    }
                }
            }
            return $endpoints;
        });

        add_filter('rest_user_query', function ($args, $request) {
            // Allow unauthenticated users or specific roles to filter by role
            $allowed_roles = ['team_member', 'manager', 'technical_lead', 'business_analyst', 'salesperson']; // Only allow filtering this role
            $requested_roles = [];
            $roles_param = $request->get_param('roles');
            if (!empty($roles_param)) {
                if (is_array($roles_param)) {
                    // REST API may send roles as array or as comma-separated string
                    if (count($roles_param) === 1 && is_string($roles_param[0]) && strpos($roles_param[0], ',') !== false) {
                        $requested_roles = array_map('trim', explode(',', $roles_param[0]));
                    } else {
                        $requested_roles = array_map('sanitize_text_field', $roles_param);
                    }
                } elseif (is_string($roles_param)) {
                    $requested_roles = array_map('trim', explode(',', $roles_param));
                }
                // Remove any empty values and sanitize
                $requested_roles = array_filter(array_map('sanitize_text_field', $requested_roles));
            }

            // Allow only if explicitly filtering to an allowed role
            if (!empty($requested_roles) && is_array($requested_roles)) {
                $safe_roles = array_intersect($requested_roles, $allowed_roles);
                if (!empty($safe_roles)) {
                    $args['role__in'] = $safe_roles;
                    unset($args['has_published_posts']);
                }
            }
            return $args;
        }, 10, 2);

        add_filter('rest_prepare_user', function ($response, $user, $request) {
            if (!$user instanceof WP_User) {
                return $response;
            }

            $data = $response->get_data();

            // Add roles
            $data['roles'] = $user->roles;
            $data['user_login'] = $user->user_login;

            // Optional: Add human-readable role labels
            $wp_roles = wp_roles()->roles;
            $data['role_labels'] = array_map(function ($role) use ($wp_roles) {
                return $wp_roles[$role]['name'] ?? $role;
            }, $user->roles);

            $response->set_data($data);
            return $response;
        }, 10, 3);



        // Only run add_roles_and_caps if roles/caps version has changed.
        add_action('init', function() {
            $current_version = '1.0.1'; // Increment this when roles/caps change.
            $stored_version = get_option('la_roles_caps_version');

            if ($stored_version !== $current_version) {
                LA_Roles_And_Caps::add_roles_and_caps();
                update_option('la_roles_caps_version', $current_version);
            }
        });

        register_deactivation_hook(__FILE__, [__CLASS__, 'remove_roles_and_caps']);
    }

    public static function add_roles_and_caps() {   
        foreach ( self::$roles as $role_key => $role_name ) {
            if ( ! get_role( $role_key ) ) {
                add_role( $role_key, $role_name, [] );
            }
        }
        self::la_add_capabilities();
    }

    public static function la_add_capabilities() {

        $role_caps = [
            'salesperson' => [
                'view_own_clients',
                'initiate_client_comms',
                'create_proposal',
                'edit_time_estimation',
                'manage_pipeline',
            ],
            'technical_lead' => [
                'view_own_clients',
                'finalize_proposal',
                'edit_time_estimation',
                'generate_user_stories',
                'edit_user_stories',
            ],
            'business_analyst' => [
                'view_all_clients',
                'create_proposal',
                'edit_user_stories',
            ],
            'manager' => array_unique(
                array_merge(
                    ...array_values(
                        self::$capabilities
                    )
                )
            ),
        ];
        foreach ( $role_caps as $role_name => $caps_to_add ) {
            $role = get_role( $role_name );
            if ( ! $role ) continue;

            foreach ( $caps_to_add as $cap ) {
                $role->add_cap( $cap );
            }
        }
    }


    public static function remove_roles_and_caps() {
        foreach ( array_keys(self::$roles) as $role_key ) {
            remove_role( $role_key );
        }
        $role = get_role( 'administrator' );
        if ( $role ) {
            foreach ( self::$capabilities as $cap ) {
                $role->remove_cap( $cap );
            }
        }
    }
}

new LA_Roles_And_Caps();
// utils/roles-and-caps.php
