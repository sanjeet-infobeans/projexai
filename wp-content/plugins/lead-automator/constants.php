<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Plugin Constants
define( 'LEAD_AUTOMATOR_VERSION', '1.0.0' );
define( 'LEAD_AUTOMATOR_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'LEAD_AUTOMATOR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'LEAD_AUTOMATOR_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Add more constants as needed for your plugin.
define( 'LEAD_AUTOMATOR_API_NAMESPACE', 'client/v1' );
define( 'LEAD_AUTOMATOR_CONVERSATION_SECRET', 'projexai-lead-conversation' );
// define( 'LEAD_AUTOMATOR_LEAD_STATUSES', [
//     'new',
//     'contacted',
//     'qualified',
//     'in_discussion',
//     'proposal_sent',
//     'follow_up',
//     'demo_scheduled',
//     'negotiation',
//     'won',
//     'onboarded',
//     'lost',
//     'paused',
//     'cold',
//     'reengaged',
// ] );
define( 'LEAD_AUTOMATOR_LEAD_STATUSES', [
    'new'             => 'New',
    'contacted'       => 'Contacted',
    'qualified'       => 'Qualified',
    'in_discussion'   => 'In Discussion',
    'proposal_sent'   => 'Proposal Sent',
    'follow_up'       => 'Follow Up',
    'demo_scheduled'  => 'Demo Scheduled',
    'negotiation'     => 'Negotiation',
    'won'             => 'Won',
    'onboarded'       => 'Onboarded',
    'lost'            => 'Lost',
    'paused'          => 'Paused',
    'cold'            => 'Cold',
    'reengaged'       => 'Reengaged',
] );