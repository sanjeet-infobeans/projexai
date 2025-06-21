<?php
/*
Plugin Name: Projects CPT
Description: Registers the Projects custom post type with client, tech_stake taxonomy, and teams selection.
*/

// Register Projects CPT
add_action('init', function() {
    $labels = [
        'name' => 'Projects',
        'singular_name' => 'Project',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Project',
        'edit_item' => 'Edit Project',
        'new_item' => 'New Project',
        'view_item' => 'View Project',
        'search_items' => 'Search Projects',
        'not_found' => 'No Projects found',
        'not_found_in_trash' => 'No Projects found in Trash',
        'all_items' => 'All Projects',
        'menu_name' => 'Projects',
        'name_admin_bar' => 'Project',
    ];
    register_post_type('projects', [
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'taxonomies' => ['tech_stake'],
        'show_in_rest' => true,
    ]);
});

// Add meta box for selecting Client (one-to-many)
add_action('add_meta_boxes', function() {
    add_meta_box(
        'project_client',
        'Client',
        function($post) {
            $selected_client = get_post_meta($post->ID, '_project_client', true);
            $clients = get_posts([
                'post_type' => 'clients',
                'numberposts' => -1,
                'post_status' => 'publish',
            ]);
            echo '<select name="project_client" id="project_client">';
            echo '<option value="">Select Client</option>';
            foreach ($clients as $client) {
                $selected = ($selected_client == $client->ID) ? 'selected' : '';
                echo '<option value="' . esc_attr($client->ID) . '" ' . $selected . '>' . esc_html($client->post_title) . '</option>';
            }
            echo '</select>';
        },
        'projects',
        'side',
        'default'
    );
});

add_action('save_post_projects', function($post_id) {
    if (isset($_POST['project_client'])) {
        update_post_meta($post_id, '_project_client', intval($_POST['project_client']));
    }
});

// Add meta box for selecting Teams (multi-select)
add_action('add_meta_boxes', function() {
    add_meta_box(
        'project_teams',
        'Teams',
        function($post) {
            $selected_teams = get_post_meta($post->ID, '_project_teams', true);
            if (!is_array($selected_teams)) $selected_teams = [];
            $teams = get_posts([
                'post_type' => 'teams',
                'numberposts' => -1,
                'post_status' => 'publish',
            ]);
            echo '<select name="project_teams[]" id="project_teams" multiple style="width:100%">';
            foreach ($teams as $team) {
                $selected = in_array($team->ID, $selected_teams) ? 'selected' : '';
                echo '<option value="' . esc_attr($team->ID) . '" ' . $selected . '>' . esc_html($team->post_title) . '</option>';
            }
            echo '</select>';
            echo '<p><small>Hold Ctrl (Windows) or Command (Mac) to select multiple teams.</small></p>';
        },
        'projects',
        'side',
        'default'
    );
});

add_action('save_post_projects', function($post_id) {
    if (isset($_POST['project_teams'])) {
        $teams = array_map('intval', (array)$_POST['project_teams']);
        update_post_meta($post_id, '_project_teams', $teams);
    } else {
        delete_post_meta($post_id, '_project_teams');
    }
});

// Add meta box for Client Requirement (text + attachment)
add_action('add_meta_boxes', function() {
    add_meta_box(
        'project_client_requirement',
        'Client Requirement',
        function($post) {
            $requirement = get_post_meta($post->ID, '_project_client_requirement', true);
            $attachment_id = get_post_meta($post->ID, '_project_client_requirement_attachment', true);
            $attachment_url = $attachment_id ? wp_get_attachment_url($attachment_id) : '';
            echo '<label for="project_client_requirement">Requirement:</label>';
            echo '<textarea name="project_client_requirement" id="project_client_requirement" rows="4" style="width:100%">' . esc_textarea($requirement) . '</textarea>';
            echo '<br><br>';
            echo '<label for="project_client_requirement_attachment">Attachment:</label><br>';
            if ($attachment_url) {
                echo '<a href="' . esc_url($attachment_url) . '" target="_blank">View Current Attachment</a><br>';
            }
            echo '<input type="file" name="project_client_requirement_attachment" id="project_client_requirement_attachment" />';
        },
        'projects',
        'normal',
        'default'
    );
});

add_action('save_post_projects', function($post_id) {
    // Save requirement text
    if (isset($_POST['project_client_requirement'])) {
        update_post_meta($post_id, '_project_client_requirement', sanitize_textarea_field($_POST['project_client_requirement']));
    }
    // Save attachment
    if (!empty($_FILES['project_client_requirement_attachment']['name'])) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        $file = $_FILES['project_client_requirement_attachment'];
        $upload = wp_handle_upload($file, ['test_form' => false]);
        if (!isset($upload['error']) && isset($upload['file'])) {
            $filetype = wp_check_filetype(basename($upload['file']), null);
            $attachment = [
                'post_mime_type' => $filetype['type'],
                'post_title' => sanitize_file_name($file['name']),
                'post_content' => '',
                'post_status' => 'inherit'
            ];
            $attach_id = wp_insert_attachment($attachment, $upload['file'], $post_id);
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
            wp_update_attachment_metadata($attach_id, $attach_data);
            update_post_meta($post_id, '_project_client_requirement_attachment', $attach_id);
        }
    }
});

// Tech Stake taxonomy assumed to be registered elsewhere and will appear in the sidebar by default. 