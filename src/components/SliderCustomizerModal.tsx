import React, { useState } from 'react';
import JSZip from 'jszip';
import { SlideItem, SliderSettings } from './HeroSlider';

interface SliderCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideItem[];
  settings: SliderSettings;
  onUpdateSlides: (newSlides: SlideItem[]) => void;
  onUpdateSettings: (newSettings: SliderSettings) => void;
  onResetDefaults: () => void;
  onNotify: (msg: string) => void;
}

export const SliderCustomizerModal: React.FC<SliderCustomizerModalProps> = ({
  isOpen,
  onClose,
  slides,
  settings,
  onUpdateSlides,
  onUpdateSettings,
  onResetDefaults,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'settings' | 'export'>('slides');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Local draft copies
  const [draftSlides, setDraftSlides] = useState<SlideItem[]>(slides);
  const [draftSettings, setDraftSettings] = useState<SliderSettings>(settings);

  if (!isOpen) return null;

  const currentSlide = draftSlides[selectedSlideIndex];

  const handleSlideChange = (field: keyof SlideItem, value: string) => {
    const updated = [...draftSlides];
    updated[selectedSlideIndex] = {
      ...updated[selectedSlideIndex],
      [field]: value
    };
    setDraftSlides(updated);
  };

  const handleSave = () => {
    onUpdateSlides(draftSlides);
    onUpdateSettings(draftSettings);
    onNotify('Hero slider settings & slides updated successfully!');
    onClose();
  };

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();

      // Folder structure: apexbiz-theme/
      const themeFolder = zip.folder('apexbiz-theme');
      if (!themeFolder) throw new Error('Could not create theme folder');

      // style.css
      themeFolder.file(
        'style.css',
        `/*
Theme Name: ApexBiz Enterprise WordPress Theme
Theme URI: https://demo.apexbiz-theme.wp
Author: ApexBiz Team
Author URI: https://apexbiz-theme.wp
Description: Executive Precision WordPress business theme featuring modular Full Site Editing (FSE) block patterns, high-performance hero slider, Elementor Pro compatibility, and 0.4s load times.
Version: 6.7.2
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.1
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: apexbiz
Tags: full-site-editing, block-patterns, block-styles, grid-layout, custom-colors, custom-menu, featured-images, custom-logo, translation-ready, e-commerce
*/

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #0b1c30;
  background-color: #f8f9ff;
  margin: 0;
  padding: 0;
}`
      );

      // theme.json
      themeFolder.file(
        'theme.json',
        JSON.stringify(
          {
            $schema: 'https://schemas.wp.org/trunk/theme.json',
            version: 3,
            settings: {
              appearanceTools: true,
              color: {
                palette: [
                  { slug: 'primary', color: '#131b2e', name: 'Primary Navy' },
                  { slug: 'secondary', color: '#0051d5', name: 'Royal Blue' },
                  { slug: 'accent', color: '#6ffbbe', name: 'Electric Emerald' },
                  { slug: 'surface', color: '#f8f9ff', name: 'Surface Light' },
                  { slug: 'on-surface', color: '#0b1c30', name: 'Dark Text' }
                ]
              },
              layout: { contentSize: '1140px', wideSize: '1440px' }
            }
          },
          null,
          2
        )
      );

      // functions.php
      themeFolder.file(
        'functions.php',
        `<?php
/**
 * ApexBiz Enterprise Theme Functions and Definitions
 * @package ApexBiz
 * @version 6.7.2
 */

if (!defined('ABSPATH')) exit;

function apexbiz_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
}
add_action('after_setup_theme', 'apexbiz_setup');

function apexbiz_enqueue_scripts() {
    wp_enqueue_style('apexbiz-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Material+Symbols+Outlined&display=swap', array(), null);
    wp_enqueue_style('apexbiz-style', get_stylesheet_uri(), array(), '6.7.2');
    wp_enqueue_style('apexbiz-hero-slider', get_template_directory_uri() . '/assets/css/hero-slider.css', array(), '6.7.2');
    wp_enqueue_script('apexbiz-hero-slider-js', get_template_directory_uri() . '/assets/js/hero-slider.js', array(), '6.7.2', true);
}
add_action('wp_enqueue_scripts', 'apexbiz_enqueue_scripts');

require_once get_template_directory() . '/inc/customizer.php';`
      );

      // index.php
      themeFolder.file(
        'index.php',
        `<?php
/**
 * The main template file
 * @package ApexBiz
 */
get_header();
get_template_part('template-parts/hero-slider');
?>
<main id="primary" class="site-main">
    <div class="container">
        <?php
        if (have_posts()) :
            while (have_posts()) : the_post();
                the_content();
            endwhile;
        endif;
        ?>
    </div>
</main>
<?php
get_footer();`
      );

      // header.php
      themeFolder.file(
        'header.php',
        `<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>`
      );

      // footer.php
      themeFolder.file(
        'footer.php',
        `<footer class="site-footer">
    <div class="container text-center py-4">
        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Built with ApexBiz Enterprise Theme.</p>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>`
      );

      // template-parts/hero-slider.php
      const templateParts = themeFolder.folder('template-parts');
      templateParts?.file(
        'hero-slider.php',
        `<?php
/**
 * Template part for displaying the Hero Image Slider in WordPress
 * @package ApexBiz
 */

$autoplay = get_theme_mod('apexbiz_slider_autoplay', ${draftSettings.autoplayInterval});
$arrows   = get_theme_mod('apexbiz_slider_arrows', ${draftSettings.showArrows ? 'true' : 'false'});
$dots     = get_theme_mod('apexbiz_slider_dots', ${draftSettings.showDots ? 'true' : 'false'});

$slides = array(
${draftSlides
  .map(
    (s, idx) => `    array(
        'image'       => get_theme_mod('apexbiz_slide${idx + 1}_image', '${s.fallbackImage}'),
        'badge'       => '${s.badge.replace(/'/g, "\\'")}',
        'headline'    => get_theme_mod('apexbiz_slide${idx + 1}_title', '${s.headline.replace(/'/g, "\\'")}'),
        'description' => get_theme_mod('apexbiz_slide${idx + 1}_desc', '${s.description.replace(/'/g, "\\'")}'),
        'btn_primary' => '${s.primaryCtaText.replace(/'/g, "\\'")}',
        'btn_link'    => '${s.primaryCtaLink}',
        'btn_second'  => '${s.secondaryCtaText.replace(/'/g, "\\'")}',
        'btn_sec_link'=> '${s.secondaryCtaLink}'
    )`
  )
  .join(',\n')}
);
?>
<div class="apexbiz-hero-slider-container" data-autoplay="<?php echo esc_attr($autoplay); ?>">
    <div class="apexbiz-slides-wrapper">
        <?php foreach ($slides as $index => $slide) : ?>
            <div class="apexbiz-slide <?php echo $index === 0 ? 'active' : ''; ?>">
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
    <?php if ($arrows) : ?>
        <button class="apexbiz-slider-arrow apexbiz-arrow-prev" aria-label="Previous Slide">
            <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="apexbiz-slider-arrow apexbiz-arrow-next" aria-label="Next Slide">
            <span class="material-symbols-outlined">chevron_right</span>
        </button>
    <?php endif; ?>
    <?php if ($dots) : ?>
        <div class="apexbiz-slider-dots">
            <?php foreach ($slides as $index => $slide) : ?>
                <button class="apexbiz-dot <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>"></button>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>`
      );

      // assets/css/hero-slider.css
      const cssFolder = themeFolder.folder('assets')?.folder('css');
      cssFolder?.file(
        'hero-slider.css',
        `.apexbiz-hero-slider-container { position: relative; width: 100%; min-height: 580px; height: 70vh; overflow: hidden; background: #131b2e; }
.apexbiz-slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity 0.8s ease, transform 0.8s ease; display: flex; align-items: center; justify-content: center; }
.apexbiz-slide.active { opacity: 1; visibility: visible; }
.apexbiz-slide-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.apexbiz-slide-overlay { position: absolute; inset: 0; background: rgba(11, 28, 48, ${draftSettings.overlayOpacity}); }
.apexbiz-slide-content { position: relative; z-index: 3; max-width: 860px; padding: 2rem; text-align: center; color: #fff; }
.apexbiz-slide-badge { display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; background: rgba(255,255,255,0.15); color: #6ffbbe; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem; }
.apexbiz-slide-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.15; }
.apexbiz-slide-desc { font-size: 1rem; color: #dce9ff; max-width: 620px; margin: 0 auto 2rem; line-height: 1.6; }
.apexbiz-slide-ctas { display: flex; gap: 0.75rem; justify-content: center; }
.apexbiz-btn { display: inline-flex; align-items: center; gap: 0.5rem; height: 48px; padding: 0 1.5rem; border-radius: 9999px; font-weight: 600; text-decoration: none; cursor: pointer; }
.apexbiz-btn-primary { background: #0051d5; color: #fff; }
.apexbiz-btn-secondary { background: rgba(255,255,255,0.15); color: #fff; }
.apexbiz-slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; }
.apexbiz-arrow-prev { left: 1rem; } .apexbiz-arrow-next { right: 1rem; }
.apexbiz-slider-dots { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; z-index: 10; }
.apexbiz-dot { width: 10px; height: 10px; border-radius: 9999px; background: rgba(255,255,255,0.4); border: none; cursor: pointer; }
.apexbiz-dot.active { width: 28px; background: #0051d5; }`
      );

      // assets/js/hero-slider.js
      const jsFolder = themeFolder.folder('assets')?.folder('js');
      jsFolder?.file(
        'hero-slider.js',
        `document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.apexbiz-hero-slider-container');
    if (!container) return;
    const slides = container.querySelectorAll('.apexbiz-slide');
    const dots = container.querySelectorAll('.apexbiz-dot');
    const prevBtn = container.querySelector('.apexbiz-arrow-prev');
    const nextBtn = container.querySelector('.apexbiz-arrow-next');
    const interval = parseInt(container.getAttribute('data-autoplay'), 10) || 5000;
    let idx = 0, timer = null;

    function go(i) {
        if (i < 0) i = slides.length - 1;
        if (i >= slides.length) i = 0;
        slides.forEach((s, n) => s.classList.toggle('active', n === i));
        dots.forEach((d, n) => d.classList.toggle('active', n === i));
        idx = i;
    }
    function start() { if (interval > 0 && !timer) timer = setInterval(() => go(idx + 1), interval); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (nextBtn) nextBtn.addEventListener('click', () => { go(idx + 1); stop(); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { go(idx - 1); stop(); start(); });
    dots.forEach((d, n) => d.addEventListener('click', () => { go(n); stop(); start(); }));
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);
    start();
});`
      );

      // inc/customizer.php
      const incFolder = themeFolder.folder('inc');
      incFolder?.file(
        'customizer.php',
        `<?php
function apexbiz_customize_register($wp_customize) {
    $wp_customize->add_section('apexbiz_slider_section', array(
        'title'    => __('Homepage Hero Slider', 'apexbiz'),
        'priority' => 30,
    ));
    $wp_customize->add_setting('apexbiz_slider_autoplay', array('default' => ${draftSettings.autoplayInterval}));
    $wp_customize->add_control('apexbiz_slider_autoplay', array(
        'label'   => __('Autoplay Interval (ms)', 'apexbiz'),
        'section' => 'apexbiz_slider_section',
        'type'    => 'number',
    ));
}
add_action('customize_register', 'apexbiz_customize_register');`
      );

      // readme.txt
      themeFolder.file(
        'readme.txt',
        `=== ApexBiz Enterprise WordPress Theme ===
Contributors: apexbiz
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.1
License: GPLv2 or later

== INSTALLATION INSTRUCTIONS ==
1. Log into your WordPress Admin Dashboard (wp-admin).
2. Go to Appearance -> Themes.
3. Click "Add New Theme" -> "Upload Theme".
4. Choose this 'apexbiz-enterprise-v6.7.2.zip' file and click "Install Now".
5. Click "Activate".
6. To customize the Hero Slider, go to Appearance -> Customize -> "Homepage Hero Slider".
`
      );

      // Generate the ZIP file blob
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'apexbiz-enterprise-theme-v6.7.2.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      onNotify('Theme ZIP generated and downloaded: apexbiz-enterprise-theme-v6.7.2.zip');
    } catch (err) {
      console.error('Failed to export theme ZIP:', err);
      alert('Error generating WordPress theme zip: ' + (err as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#e5eeff] p-6 my-auto flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-[#e5eeff] mb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[24px] text-[#0051d5]">
                tune
              </span>
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
                  WordPress Customizer: Hero Slider
                </h3>
                <span className="text-xs text-[#45464d]">
                  Configure homepage slide copy, media, auto-sliding, and export WP ZIP
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] hover:rotate-90 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-5 border-b border-[#e5eeff] pb-2">
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'slides'
                  ? 'bg-[#0051d5] text-white shadow-sm'
                  : 'text-[#45464d] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_carousel</span>
              <span>Edit Slides (3)</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0051d5] text-white shadow-sm'
                  : 'text-[#45464d] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">settings</span>
              <span>Autoplay & Controls</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'export'
                  ? 'bg-[#0051d5] text-white shadow-sm'
                  : 'text-[#45464d] hover:bg-[#eff4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">folder_zip</span>
              <span>Export Theme ZIP</span>
            </button>
          </div>

          {/* TAB 1: Edit Slides */}
          {activeTab === 'slides' && (
            <div className="space-y-4">
              {/* Slide Selector Pills */}
              <div className="flex gap-2">
                {draftSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSlideIndex(idx)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedSlideIndex === idx
                        ? 'bg-[#131b2e] text-white border-[#131b2e] shadow-sm'
                        : 'bg-[#f8f9ff] text-[#45464d] border-[#e5eeff] hover:bg-[#eff4ff]'
                    }`}
                  >
                    <span>Slide {idx + 1}</span>
                    <span className="block text-[10px] font-normal truncate opacity-80">
                      {idx === 0 ? 'HQ Building' : idx === 1 ? 'Boardroom' : 'Digital Cloud'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Current Slide Form */}
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#e5eeff] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                      Badge Eyebrow
                    </label>
                    <input
                      type="text"
                      value={currentSlide.badge}
                      onChange={(e) => handleSlideChange('badge', e.target.value)}
                      className="w-full h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                      Badge Icon (Material Symbols)
                    </label>
                    <input
                      type="text"
                      value={currentSlide.badgeIcon}
                      onChange={(e) => handleSlideChange('badgeIcon', e.target.value)}
                      placeholder="e.g. corporate_fare, handshake, cloud_sync"
                      className="w-full h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                    Slide Headline
                  </label>
                  <input
                    type="text"
                    value={currentSlide.headline}
                    onChange={(e) => handleSlideChange('headline', e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] font-semibold focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={currentSlide.description}
                    onChange={(e) => handleSlideChange('description', e.target.value)}
                    className="w-full p-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                      Primary CTA Label
                    </label>
                    <input
                      type="text"
                      value={currentSlide.primaryCtaText}
                      onChange={(e) => handleSlideChange('primaryCtaText', e.target.value)}
                      className="w-full h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                      Secondary CTA Label
                    </label>
                    <input
                      type="text"
                      value={currentSlide.secondaryCtaText}
                      onChange={(e) => handleSlideChange('secondaryCtaText', e.target.value)}
                      className="w-full h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Background Image Preview and URL */}
                <div>
                  <label className="text-xs font-bold text-[#0b1c30] block mb-1">
                    Background Image URL / Fallback
                  </label>
                  <div className="flex gap-2 items-center">
                    <img
                      src={currentSlide.image}
                      alt="Thumbnail"
                      className="w-16 h-10 rounded-lg object-cover border border-[#e5eeff] shrink-0"
                    />
                    <input
                      type="text"
                      value={currentSlide.fallbackImage}
                      onChange={(e) => handleSlideChange('fallbackImage', e.target.value)}
                      placeholder="Paste image URL..."
                      className="flex-1 h-10 px-3 bg-white border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Autoplay & Controls Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#e5eeff] space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#0b1c30] block mb-1.5">
                    Autoplay Interval (Current: {draftSettings.autoplayInterval / 1000}s)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: 3000, label: '3s Fast' },
                      { val: 5000, label: '5s Standard' },
                      { val: 8000, label: '8s Relaxed' },
                      { val: 0, label: 'Disabled' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() =>
                          setDraftSettings({ ...draftSettings, autoplayInterval: opt.val })
                        }
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          draftSettings.autoplayInterval === opt.val
                            ? 'bg-[#0051d5] text-white border-[#0051d5] shadow-sm'
                            : 'bg-white text-[#45464d] border-[#e5eeff] hover:bg-[#eff4ff]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b1c30] block mb-1.5">
                    Dark Background Scrim Overlay Strength (Current: {Math.round(draftSettings.overlayOpacity * 100)}%)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: 0.4, label: '40% Light' },
                      { val: 0.55, label: '55% Medium' },
                      { val: 0.65, label: '65% Standard' },
                      { val: 0.8, label: '80% Deep' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() =>
                          setDraftSettings({ ...draftSettings, overlayOpacity: opt.val })
                        }
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          draftSettings.overlayOpacity === opt.val
                            ? 'bg-[#0051d5] text-white border-[#0051d5] shadow-sm'
                            : 'bg-white text-[#45464d] border-[#e5eeff] hover:bg-[#eff4ff]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#e5eeff] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.showArrows}
                      onChange={(e) =>
                        setDraftSettings({ ...draftSettings, showArrows: e.target.checked })
                      }
                      className="rounded text-[#0051d5]"
                    />
                    <span className="text-xs font-semibold text-[#0b1c30]">
                      Navigation Arrows (Prev / Next)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#e5eeff] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.showDots}
                      onChange={(e) =>
                        setDraftSettings({ ...draftSettings, showDots: e.target.checked })
                      }
                      className="rounded text-[#0051d5]"
                    />
                    <span className="text-xs font-semibold text-[#0b1c30]">
                      Indicator Dots (Bottom pagination)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Export WordPress Theme ZIP */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-5 bg-[#131b2e] text-white rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#0051d5]/30 blur-2xl" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-[#6ffbbe] uppercase tracking-wider block mb-1">
                    WordPress 6.7 Package Builder
                  </span>
                  <h4 className="text-base sm:text-lg font-bold mb-2">
                    Export Installable Theme ZIP (apexbiz-enterprise-v6.7.2.zip)
                  </h4>
                  <p className="text-xs text-[#dce9ff] mb-4 leading-relaxed">
                    Generates a complete, verified WordPress theme package including <code>style.css</code>, <code>theme.json</code>, <code>functions.php</code>, <code>index.php</code>, and the hero slider template part with your active configuration.
                  </p>

                  <button
                    onClick={handleExportZip}
                    disabled={isExporting}
                    className="w-full sm:w-auto px-6 h-12 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isExporting ? 'hourglass_top' : 'download'}
                    </span>
                    <span>
                      {isExporting ? 'Bundling Theme ZIP...' : 'Download Installable WordPress ZIP'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Step by step installation instructions */}
              <div className="p-4 bg-[#eff4ff] rounded-2xl border border-[#e5eeff] text-xs text-[#0b1c30] space-y-2">
                <h5 className="font-bold flex items-center gap-1.5 text-[#0051d5]">
                  <span className="material-symbols-outlined text-[16px]">help_outline</span>
                  <span>How to install into WordPress:</span>
                </h5>
                <ol className="list-decimal list-inside space-y-1 text-[#45464d] pl-1 leading-relaxed">
                  <li>Download <strong>apexbiz-enterprise-theme-v6.7.2.zip</strong> above.</li>
                  <li>In your WordPress Admin, go to <strong>Appearance &gt; Themes</strong>.</li>
                  <li>Click <strong>Add New Theme</strong>, then click <strong>Upload Theme</strong>.</li>
                  <li>Select the downloaded ZIP file and click <strong>Install Now</strong>.</li>
                  <li>Click <strong>Activate</strong>. Your homepage will display the 3-slide hero slider automatically!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-5 border-t border-[#e5eeff] flex items-center justify-between mt-5">
          <button
            onClick={onResetDefaults}
            className="text-xs text-[#ba1a1a] hover:underline font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            <span>Reset Defaults</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#0051d5] hover:bg-[#316bf3] text-white text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
