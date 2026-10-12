<?php
/**
 * Template part for displaying the Hero Image Slider in WordPress
 *
 * @package ApexBiz
 */

$autoplay_interval = get_theme_mod('apexbiz_slider_autoplay', 5000);
$show_arrows       = get_theme_mod('apexbiz_slider_arrows', true);
$show_dots         = get_theme_mod('apexbiz_slider_dots', true);

$slides = array(
    array(
        'image'       => get_theme_mod('apexbiz_slide1_image', get_template_directory_uri() . '/assets/images/hero_corporate_hq.jpg'),
        'badge'       => 'Headquarters & Global Scale',
        'headline'    => get_theme_mod('apexbiz_slide1_title', 'Scale Your Business With High-Performance Web Architecture'),
        'description' => get_theme_mod('apexbiz_slide1_desc', 'Empower your enterprise with modular Gutenberg block patterns, 90+ pre-built business layouts, blazing 0.4s load times, and effortless Elementor Pro integration.'),
        'btn_primary' => 'Get Started',
        'btn_link'    => '#pricing',
        'btn_second'  => 'Explore Demos',
        'btn_sec_link'=> '#demos'
    ),
    array(
        'image'       => get_theme_mod('apexbiz_slide2_image', get_template_directory_uri() . '/assets/images/hero_business_meeting.jpg'),
        'badge'       => 'Strategic Enterprise Advisory',
        'headline'    => get_theme_mod('apexbiz_slide2_title', 'We Combine Strategic Vision with Engineering Rigor'),
        'description' => get_theme_mod('apexbiz_slide2_desc', 'Partnering with executive boards and fast-growing founders to build resilient institutional assets designed to compound enterprise valuation.'),
        'btn_primary' => 'Get Started',
        'btn_link'    => '#pricing',
        'btn_second'  => 'Our Solutions',
        'btn_sec_link'=> '#services'
    ),
    array(
        'image'       => get_theme_mod('apexbiz_slide3_image', get_template_directory_uri() . '/assets/images/hero_tech_transformation.jpg'),
        'badge'       => 'Cloud Intelligence & AI',
        'headline'    => get_theme_mod('apexbiz_slide3_title', 'Engineered for Digital Transformation & Cloud Velocity'),
        'description' => get_theme_mod('apexbiz_slide3_desc', 'Decoupled edge architecture, SOC2-compliant serverless workflows, and autonomous business pipeline automation for enterprise leaders.'),
        'btn_primary' => 'Get Started',
        'btn_link'    => '#pricing',
        'btn_second'  => 'Cloud Blueprints',
        'btn_sec_link'=> '#services'
    )
);
?>

<div class="apexbiz-hero-slider-container" data-autoplay="<?php echo esc_attr($autoplay_interval); ?>">
    <div class="apexbiz-slides-wrapper">
        <?php foreach ($slides as $index => $slide) : ?>
            <div class="apexbiz-slide <?php echo $index === 0 ? 'active' : ''; ?>" data-slide-index="<?php echo esc_attr($index); ?>">
                <div class="apexbiz-slide-bg" style="background-image: url('<?php echo esc_url($slide['image']); ?>');"></div>
                <div class="apexbiz-slide-overlay"></div>
                <div class="apexbiz-slide-content">
                    <span class="apexbiz-slide-badge"><?php echo esc_html($slide['badge']); ?></span>
                    <h1 class="apexbiz-slide-title"><?php echo esc_html($slide['headline']); ?></h1>
                    <p class="apexbiz-slide-desc"><?php echo esc_html($slide['description']); ?></p>
                    <div class="apexbiz-slide-ctas">
                        <a href="<?php echo esc_url($slide['btn_link']); ?>" class="apexbiz-btn apexbiz-btn-primary">
                            <span><?php echo esc_html($slide['btn_primary']); ?></span>
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                        <a href="<?php echo esc_url($slide['btn_sec_link']); ?>" class="apexbiz-btn apexbiz-btn-secondary">
                            <span><?php echo esc_html($slide['btn_second']); ?></span>
                        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ($show_arrows) : ?>
        <button class="apexbiz-slider-arrow apexbiz-arrow-prev" aria-label="<?php esc_attr_e('Previous Slide', 'apexbiz'); ?>">
            <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="apexbiz-slider-arrow apexbiz-arrow-next" aria-label="<?php esc_attr_e('Next Slide', 'apexbiz'); ?>">
            <span class="material-symbols-outlined">chevron_right</span>
        </button>
    <?php endif; ?>

    <?php if ($show_dots) : ?>
        <div class="apexbiz-slider-dots">
            <?php foreach ($slides as $index => $slide) : ?>
                <button class="apexbiz-dot <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>" aria-label="<?php printf(esc_attr__('Go to slide %d', 'apexbiz'), $index + 1); ?>"></button>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>
