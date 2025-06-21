<?php
/**
 * Plugin Name: Lead Automator
 * Description: A WordPress plugin that integrates with OpenAI and Google Drive to generate sales proposals enriched with relevant case studies.
 * Version: 1.0
 * Author: InfoBeans
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

require_once plugin_dir_path(__FILE__) . 'constants.php';
require_once plugin_dir_path(__FILE__) . 'utils/class-roles-and-caps.php';
require_once plugin_dir_path(__FILE__) . 'utils/class-coauthors.php';
require_once plugin_dir_path(__FILE__) . 'inc/class-client-profiles.php';
require_once plugin_dir_path(__FILE__) . 'inc/class-proposals.php';
require_once plugin_dir_path(__FILE__) . 'inc/class-conversation.php';


new Client_Profiles();
new Proposals();
new Conversation();
