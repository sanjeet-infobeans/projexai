<?php

if( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class LA_Authentication {

    /**
     * Constructor to initialize the authentication functionality.
     */
    public function __construct() {
        add_filter('jwt_auth_token_before_dispatch', function ($data, $user) {
            $data['user_role'] = $user->roles;
            $data['email'] = $user->user_email;
            $data['display_name'] = $user->display_name;
            $data['user_id'] = $user->ID;
            return $data;
        }, 10, 2);
    }
}

new LA_Authentication();
