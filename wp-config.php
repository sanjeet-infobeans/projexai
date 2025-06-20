<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'sanjeetp_wp319' );

/** Database username */
define( 'DB_USER', 'sanjeetp_wp319' );

/** Database password */
define( 'DB_PASSWORD', '9S9p)v]6SJ' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'nqmzhgjlk7tqux0co5qj5hyxivhsbwpveoijzs96ilcmlvoyvfujpmwywzya9exs' );
define( 'SECURE_AUTH_KEY',  'wss4klbjcwvqzlh1shwdno8yw0bwbfpvslq3wu8eoi9jneke2m9zlzb9xptbpbfa' );
define( 'LOGGED_IN_KEY',    'fnzma2zrkkdrdzyaamqgwe9ztz4saxx0ikziiafcxdt9rodyvglvek4wd2n8duq5' );
define( 'NONCE_KEY',        'c7hgmdqshpa88bzrriixjxcz7zqx7c5if32pdzo06ssbcp6nfctly7u4u9rakeze' );
define( 'AUTH_SALT',        'xnthw9mgzklpdwdmxvon7048uhppee6gb5xigwytmdfkbt2yeo9i4vtdhjtke5sg' );
define( 'SECURE_AUTH_SALT', 'yiusluureffajmoqdeksfz4e763vaok0dylcaqjio2e9oqiiew3gay0vjow9l69l' );
define( 'LOGGED_IN_SALT',   '2zzdgwwcjrj70fxbyo6zts2roph2xlmbxqqoguiattrlnklg49oqbeqvhtdozhqa' );
define( 'NONCE_SALT',       '7flisourjfy8zmzthpzwng4iczsucpxmj2qgbm4gvgvq6ahwnh1njrctw5vs6d5k' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wpfb_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
