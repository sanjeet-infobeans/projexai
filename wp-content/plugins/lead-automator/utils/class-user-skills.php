<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class LA_User_Skills {

    public function __construct() {
        add_action('show_user_profile', [$this, 'custom_user_technology_fields']);
        add_action('edit_user_profile', [$this, 'custom_user_technology_fields']);
        add_action('wp_ajax_load_skills_ajax', [$this, 'load_skills_ajax']);
        add_action('personal_options_update', [$this, 'save_user_technology_fields']);
        add_action('edit_user_profile_update', [$this, 'save_user_technology_fields']);
    }

    public function load_skills_ajax () {
        $tech_ids = explode(',', sanitize_text_field($_POST['tech_ids'] ?? ''));
        $user_id = (int) ($_GET['user_id'] ?? 0);

        foreach ($tech_ids as $tech_id) {
            echo $this->render_skill_table_for_technology((int)$tech_id, $user_id);
        }

        wp_die();
    }
    
    public function custom_user_technology_fields($user) {
        $selected_techs = get_user_meta($user->ID, 'selected_technologies', true) ?: [];

        $technologies = get_terms([
            'taxonomy' => 'technology',
            'hide_empty' => false,
        ]);

        ?>
        <h2>Technologies & Skill Experience</h2>
        <table class="form-table">
            <tr>
                <th><label for="selected_technologies">Technologies</label></th>
                <td>
                    <select id="selected_technologies" name="selected_technologies[]" multiple style="width: 100%;">
                        <?php foreach ($technologies as $tech): ?>
                            <option value="<?= esc_attr($tech->term_id) ?>" <?= in_array($tech->term_id, $selected_techs) ? 'selected' : '' ?>>
                                <?= esc_html($tech->name) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </td>
            </tr>
        </table>

        <div id="tech-skills-container">
            <?php
            foreach ($selected_techs as $tech_id) {
                echo $this->render_skill_table_for_technology($tech_id, $user->ID);
            }
            ?>
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function () {
            const select = document.getElementById('selected_technologies');
            const container = document.getElementById('tech-skills-container');

            select.addEventListener('change', function () {
                const selected = Array.from(select.selectedOptions).map(opt => opt.value);

                fetch('<?php echo admin_url('admin-ajax.php'); ?>?action=load_skills_ajax&user_id=<?= $user->ID ?>', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'tech_ids=' + selected.join(',')
                }).then(res => res.text()).then(html => {
                    container.innerHTML = html;
                });
            });
        });
        </script>
        <?php
    }

    public function render_skill_table_for_technology($tech_id, $user_id) {
        $term = get_term($tech_id, 'technology');
        if (!$term) return '';

        $skills = [];
        foreach (get_term_meta($tech_id) as $meta_key => $value) {
            $term_slug = $term->slug;
            if (preg_match("/^{$term_slug}_skill_\d+$/", $meta_key)) {
                $skills[] = $value[0];
            }
        }

        ob_start();
        ?>
        <h4><?= esc_html($term->name) ?> Skills</h4>
        <table class="form-table">
            <tr><th>Skill</th><th>Experience</th></tr>
            <?php foreach ($skills as $skill): 
                $meta_key = "tech_{$tech_id}_skill_" . sanitize_title($skill);
                $saved = get_user_meta($user_id, $meta_key, true);
            ?>
            <tr>
                <td><?= esc_html($skill) ?></td>
                <td>
                    <input type="text" name="<?= esc_attr($meta_key) ?>" value="<?= esc_attr($saved) ?>" placeholder="e.g., 2 years" />
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php
        return ob_get_clean();
    }

    public function save_user_technology_fields($user_id) {
        if (!current_user_can('edit_user', $user_id)) return;

        $selected_techs = $_POST['selected_technologies'] ?? [];
        update_user_meta($user_id, 'selected_technologies', $selected_techs);

        foreach ($_POST as $key => $value) {
            if (strpos($key, 'tech_') === 0) {
                update_user_meta($user_id, $key, sanitize_text_field($value));
            }
        }
    }
}

new LA_User_Skills();