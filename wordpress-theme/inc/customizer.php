<?php
/**
 * ApexBiz WordPress Theme Customizer Configuration
 * Adds Slider Settings Section to WordPress Admin -> Appearance -> Customize
 */

function apexbiz_customize_register($wp_customize) {
    // Hero Slider Section
    $wp_customize->add_section('apexbiz_slider_section', array(
        'title'       => __('Homepage Hero Slider', 'apexbiz'),
        'priority'    => 30,
        'description' => __('Customize the homepage enterprise hero image slider.', 'apexbiz'),
    ));

    // Slider Autoplay Duration
    $wp_customize->add_setting('apexbiz_slider_autoplay', array(
        'default'           => 5000,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('apexbiz_slider_autoplay', array(
        'label'       => __('Autoplay Interval (milliseconds)', 'apexbiz'),
        'section'     => 'apexbiz_slider_section',
        'type'        => 'number',
        'description' => __('Default is 5000ms (5 seconds). Set to 0 to disable autoplay.', 'apexbiz'),
    ));

    // Show Arrows
    $wp_customize->add_setting('apexbiz_slider_arrows', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('apexbiz_slider_arrows', array(
        'label'   => __('Display Navigation Arrows', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'checkbox',
    ));

    // Show Indicator Dots
    $wp_customize->add_setting('apexbiz_slider_dots', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('apexbiz_slider_dots', array(
        'label'   => __('Display Indicator Dots', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'checkbox',
    ));

    // Slide 1 Settings
    $wp_customize->add_setting('apexbiz_slide1_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'apexbiz_slide1_image', array(
        'label'       => __('Slide 1 Background Image (Corporate HQ)', 'apexbiz'),
        'section'     => 'apexbiz_slider_section',
    )));

    $wp_customize->add_setting('apexbiz_slide1_title', array(
        'default'           => 'Scale Your Business With High-Performance Web Architecture',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('apexbiz_slide1_title', array(
        'label'   => __('Slide 1 Headline', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('apexbiz_slide1_desc', array(
        'default'           => 'Empower your enterprise with modular Gutenberg block patterns, 90+ pre-built business layouts, blazing 0.4s load times, and effortless Elementor Pro integration.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('apexbiz_slide1_desc', array(
        'label'   => __('Slide 1 Short Description', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'textarea',
    ));

    // Slide 2 Settings
    $wp_customize->add_setting('apexbiz_slide2_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'apexbiz_slide2_image', array(
        'label'       => __('Slide 2 Background Image (Boardroom Meeting)', 'apexbiz'),
        'section'     => 'apexbiz_slider_section',
    )));

    $wp_customize->add_setting('apexbiz_slide2_title', array(
        'default'           => 'We Combine Strategic Vision with Engineering Rigor',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('apexbiz_slide2_title', array(
        'label'   => __('Slide 2 Headline', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'text',
    ));

    // Slide 3 Settings
    $wp_customize->add_setting('apexbiz_slide3_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'apexbiz_slide3_image', array(
        'label'       => __('Slide 3 Background Image (Tech & Cloud)', 'apexbiz'),
        'section'     => 'apexbiz_slider_section',
    )));

    $wp_customize->add_setting('apexbiz_slide3_title', array(
        'default'           => 'Engineered for Digital Transformation & Cloud Velocity',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('apexbiz_slide3_title', array(
        'label'   => __('Slide 3 Headline', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'text',
    ));
}
add_action('customize_register', 'apexbiz_customize_register');
