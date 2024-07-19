<?php

// CSS JavaScript
add_action( 'wp_enqueue_scripts', function () {
    wp_register_style( 'app', get_theme_file_uri() . '/assets/css/app.css', array(), APP_VERSION );
    // wp_register_script('app', get_theme_file_uri() . '/assets/js/app.js', array(), APP_VERSION, true );

    wp_enqueue_style('app');
    // wp_enqueue_script('app');
});
?>
