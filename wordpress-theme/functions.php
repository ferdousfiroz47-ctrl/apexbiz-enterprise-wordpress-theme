<?php
/**
 * ApexBiz Enterprise Theme Functions and Definitions
 *
 * @package ApexBiz
 * @version 6.7.2
 */

if (!defined('ABSPATH')) {
    exit;
}

function apexbiz_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');

    register_nav_menus(array(
        'primary' => __('Primary Navigation Menu', 'apexbiz'),
        'footer'  => __('Footer Navigation Menu', 'apexbiz'),
    ));
}
add_action('after_setup_theme', 'apexbiz_setup');

function apexbiz_enqueue_scripts() {
    wp_enqueue_style('apexbiz-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Material+Symbols+Outlined&display=swap', array(), null);
    wp_enqueue_style('apexbiz-style', get_stylesheet_uri(), array(), '6.7.2');
    wp_enqueue_style('apexbiz-hero-slider', get_template_directory_uri() . '/assets/css/hero-slider.css', array(), '6.7.2');

    wp_enqueue_script('apexbiz-hero-slider-js', get_template_directory_uri() . '/assets/js/hero-slider.js', array(), '6.7.2', true);
}
add_action('wp_enqueue_scripts', 'apexbiz_enqueue_scripts');

require_once get_template_directory() . '/inc/customizer.php';
