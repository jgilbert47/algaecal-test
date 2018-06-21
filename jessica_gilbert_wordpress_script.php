<?php 

// To replace the locally included Wordpress jQuery script with an updated script, add this function to the 
// functions.php file located in /public_html/wp-content/themes/[theme_name]
function replace_jquery() {
    if (!is_admin()) {
        // Deregister the default version of jQuery that Wordpress includes locally
        wp_deregister_script('jquery');
        // Register the latest version of jQuery from the Google Hosted CDN
        wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, '1.8.1');
    }
}
add_action('init', 'replace_jquery');

?>
