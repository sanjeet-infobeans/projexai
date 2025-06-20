<?php
/**
 * Plugin Name: Lead Automator
 * Description: A WordPress plugin that integrates with OpenAI and Google Drive to generate sales proposals enriched with relevant case studies.
 * Version: 1.0
 * Author: InfoBeans
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

// === 1. Register Custom Post Type ===
function register_client_profile_cpt() {
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
        'supports'      => array( 'title' ),
        'show_in_rest'  => false,
    ));
}
add_action( 'init', 'register_client_profile_cpt' );

// === 2. Add Meta Box ===
function add_client_profile_meta_box() {
    add_meta_box(
        'client_profile_meta_box',
        'Client Details',
        'render_client_profile_meta_box',
        'client_profile',
        'normal',
        'default'
    );
}
add_action( 'add_meta_boxes', 'add_client_profile_meta_box' );

function render_client_profile_meta_box( $post ) {
    $fields = array( 'client_name', 'industry', 'location', 'contact_person', 'email', 'phone', 'status' );
    foreach ( $fields as $field ) {
        ${$field} = get_post_meta( $post->ID, $field, true );
    }
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
    </table>
    <?php
}

// === 3. Save Meta Box Data ===
function save_client_profile_meta_box( $post_id ) {
    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return;
    if ( get_post_type($post_id) !== 'client_profile' ) return;

    $fields = array( 'client_name', 'industry', 'location', 'contact_person', 'email', 'phone', 'status' );
    foreach ( $fields as $field ) {
        if ( isset($_POST[$field]) ) {
            update_post_meta( $post_id, $field, sanitize_text_field($_POST[$field]) );
        }
    }
}
add_action( 'save_post', 'save_client_profile_meta_box' );

// === 4. CSV Import Admin Page ===
function client_profile_csv_import_menu() {
    add_submenu_page(
        'edit.php?post_type=client_profile',
        'Import Clients CSV',
        'Import CSV',
        'manage_options',
        'client-csv-import',
        'client_profile_csv_import_page'
    );
}
add_action( 'admin_menu', 'client_profile_csv_import_menu' );

function client_profile_csv_import_page() {
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
                        $count++;
                    }
                }
                fclose($handle);
                echo "<div class='notice notice-success'><p>Imported {$count} clients.</p></div>";
            }
        }
    }
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'projexai/v1', '/client-profiles', array(
        'methods'  => 'GET',
        'callback' => 'get_all_client_profiles',
        'permission_callback' => '__return_true' // Public API
    ));
});

function get_all_client_profiles() {
    $args = array(
        'post_type'      => 'client_profile',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );

    $query = new WP_Query( $args );
    $results = [];

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $id = get_the_ID();
            $results[] = array(
                'id'             => $id,
                'title'          => get_the_title(),
                'client_name'    => get_post_meta( $id, 'client_name', true ),
                'industry'       => get_post_meta( $id, 'industry', true ),
                'location'       => get_post_meta( $id, 'location', true ),
                'contact_person' => get_post_meta( $id, 'contact_person', true ),
                'email'          => get_post_meta( $id, 'email', true ),
                'phone'          => get_post_meta( $id, 'phone', true ),
                'status'         => get_post_meta( $id, 'status', true ),
            );
        }
        wp_reset_postdata();
    }

    return rest_ensure_response( $results );
}


