import React, { useState, useEffect, useRef } from 'react';
import heroCorporateHq from '../assets/images/hero_corporate_hq_1791831264326.jpg';
import heroBusinessMeeting from '../assets/images/hero_business_meeting_1791831278098.jpg';
import heroTechTransformation from '../assets/images/hero_tech_transformation_1791831292800.jpg';

export interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  fallbackImage: string;
}

export interface SliderSettings {
  autoplayInterval: number; // in milliseconds (e.g. 5000)
  showArrows: boolean;
  showDots: boolean;
  overlayOpacity: number; // 0.3 to 0.85
  transitionMode: 'fade' | 'slide';
}

export const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    badge: 'Enterprise Headquarters',
    badgeIcon: 'corporate_fare',
    headline: 'Scale Your Business With High-Performance Web Architecture',
    description: 'Empower your enterprise with modular Gutenberg block patterns, 90+ pre-built business layouts, blazing 0.4s load times, and effortless Elementor Pro integration.',
    primaryCtaText: 'Get Started',
    primaryCtaLink: '#pricing',
    secondaryCtaText: 'Explore Demos',
    secondaryCtaLink: '#demos',
    image: heroCorporateHq,
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'slide-2',
    badge: 'Executive Advisory & Boardroom Collaboration',
    badgeIcon: 'handshake',
    headline: 'We Combine Strategic Vision with Engineering Rigor',
    description: 'Partnering with executive boards, corporate strategists, and fast-growing founders to engineer resilient digital assets designed to compound enterprise valuation.',
    primaryCtaText: 'Get Started',
    primaryCtaLink: '#pricing',
    secondaryCtaText: 'Our Capabilities',
    secondaryCtaLink: '#services',
    image: heroBusinessMeeting,
    fallbackImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'slide-3',
    badge: 'Digital Transformation & Cloud Intelligence',
    badgeIcon: 'cloud_sync',
    headline: 'Future-Proof Enterprise Operations & Cloud Velocity',
    description: 'Decoupled serverless architectures, predictive analytics telemetry, and continuous SOC2 compliance engineered for resilient market leadership.',
    primaryCtaText: 'Get Started',
    primaryCtaLink: '#pricing',
    secondaryCtaText: 'Cloud Blueprints',
    secondaryCtaLink: '#services',
    image: heroTechTransformation,
    fallbackImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80'
  }
];

interface HeroSliderProps {
  slides?: SlideItem[];
  settings?: SliderSettings;
  onOpenCustomizer?: () => void;
  onCtaClick?: (link: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides = DEFAULT_SLIDES,
  settings = {
    autoplayInterval: 5000,
    showArrows: true,
    showDots: true,
    overlayOpacity: 0.65,
    transitionMode: 'fade'
  },
  onOpenCustomizer,
  onCtaClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number>(0);

  const totalSlides = slides.length;

  // Autoplay timer with 5-second interval and progress animation
  useEffect(() => {
    if (isPaused || settings.autoplayInterval <= 0) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = 50; // update progress every 50ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / settings.autoplayInterval) * 100, 100);
      setProgress(pct);

      if (elapsed >= settings.autoplayInterval) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setProgress(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused, settings.autoplayInterval, totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl bg-[#131b2e] shadow-2xl border border-white/10 group select-none min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Enterprise Business Hero Showcase"
    >
      {/* Slides Deck */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex items-center justify-center ${
              isActive
                ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                : 'opacity-0 z-0 scale-105 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Slide Background Image with Ken Burns Zoom Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slide.image}
                onError={(e) => {
                  // Graceful fallback to verified alternative
                  const target = e.currentTarget;
                  if (target.src !== slide.fallbackImage) {
                    target.src = slide.fallbackImage;
                  }
                }}
                alt={slide.headline}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>

            {/* Subtle Dark Scrim / Vignette Overlay for High Typography Contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/90 via-[#131b2e]/70 to-[#0b1c30]/85 pointer-events-none transition-opacity"
              style={{
                opacity: settings.overlayOpacity
              }}
            />

            {/* Decorative Electric Glow Accent */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#0051d5]/25 blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#6ffbbe]/15 blur-3xl pointer-events-none" />

            {/* Slide Content Box */}
            <div className="relative z-20 w-full max-w-4xl px-6 sm:px-12 py-10 text-center flex flex-col items-center justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-[#bec6e0] border border-white/20 mb-4 shadow-sm backdrop-blur-md animate-hero-badge hover:bg-white/25 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[16px] text-[#6ffbbe]">
                  {slide.badgeIcon || 'verified'}
                </span>
                <span className="font-label-sm text-xs tracking-wide uppercase font-bold text-[#eff4ff]">
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-headline-lg-mobile text-[28px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.15] text-white mb-4 max-w-3xl drop-shadow-md text-balance">
                {slide.headline}
              </h1>

              {/* Description */}
              <p className="font-body-md text-xs sm:text-sm lg:text-base text-[#dce9ff] mb-8 max-w-xl leading-relaxed drop-shadow-sm font-normal">
                {slide.description}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center">
                <button
                  onClick={() => onCtaClick ? onCtaClick(slide.primaryCtaLink) : window.location.hash = slide.primaryCtaLink}
                  className="flex items-center justify-center gap-2 h-12 sm:h-13 px-7 bg-[#0051d5] text-white rounded-full font-label-md text-sm font-bold shadow-lg hover:bg-[#316bf3] hover:shadow-[#0051d5]/40 transition-all active:scale-95"
                >
                  <span>{slide.primaryCtaText}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onCtaClick ? onCtaClick(slide.secondaryCtaLink) : window.location.hash = slide.secondaryCtaLink}
                  className="flex items-center justify-center gap-2 h-12 sm:h-13 px-7 bg-white/15 hover:bg-white/25 text-white border border-white/25 rounded-full font-label-md text-sm font-semibold backdrop-blur-md transition-all active:scale-95"
                >
                  <span>{slide.secondaryCtaText}</span>
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows (Prev / Next) */}
      {settings.showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-[#0051d5] text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-[#0051d5] text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </>
      )}

      {/* Bottom Bar: Indicators, Slide Counter, Autoplay Status, and Customizer Button */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-10 pointer-events-none">
        {/* Left: Current Slide Counter & Autoplay status */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm">
            <span className="text-[#6ffbbe] font-bold">0{currentSlide + 1}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">0{totalSlides}</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            title={isPaused ? 'Resume 5s Autoplay' : 'Pause Autoplay'}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>
        </div>

        {/* Center: Clickable Indicator Dots */}
        {settings.showDots && (
          <div className="flex items-center gap-2 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-8 bg-[#0051d5] shadow-lg shadow-[#0051d5]/50 ring-2 ring-white/30'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Right: WordPress Customizer Trigger Button */}
        {onOpenCustomizer && (
          <div className="pointer-events-auto">
            <button
              onClick={onOpenCustomizer}
              className="bg-black/60 hover:bg-[#0051d5] text-white border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
              title="Customize slides or Export WordPress Theme"
            >
              <span className="material-symbols-outlined text-[15px] text-[#6ffbbe]">tune</span>
              <span className="hidden sm:inline">Slider Settings</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar (countdown indicator for 5s auto-slide) */}
      {!isPaused && settings.autoplayInterval > 0 && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden z-30">
          <div
            className="h-full bg-gradient-to-r from-[#0051d5] to-[#6ffbbe] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
