import React, { useState } from 'react';
import { ASSETS, CASE_STUDIES, FAQS } from '../data/themeData';
import { CaseStudy, TabType } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HeroSlider, SlideItem, SliderSettings } from '../components/HeroSlider';

interface OverviewScreenProps {
  onSelectTab: (tab: TabType) => void;
  onOpenVideoModal: () => void;
  onOpenCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenCheckout: (planId: string, isLifetime: boolean) => void;
  onSubscribeNewsletter: (email: string) => void;
  slides?: SlideItem[];
  sliderSettings?: SliderSettings;
  onOpenCustomizer?: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onSelectTab,
  onOpenVideoModal,
  onOpenCaseStudy,
  onOpenCheckout,
  onSubscribeNewsletter,
  slides,
  sliderSettings,
  onOpenCustomizer
}) => {
  // Case Studies Filter state
  const [caseFilter, setCaseFilter] = useState<'all' | 'fintech' | 'saas' | 'health'>('all');

  // Pricing Toggle state (Annual vs Lifetime)
  const [isLifetimePricing, setIsLifetimePricing] = useState(false);

  // FAQ Accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Newsletter input state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Activate Intersection Observer scroll reveal animations
  useScrollReveal(caseFilter);

  const filteredCaseStudies = caseFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.category === caseFilter);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSliderCta = (link: string) => {
    if (link.startsWith('#')) {
      const targetId = link.replace('#', '');
      scrollToSection(targetId);
    } else {
      onSelectTab('pricing-license');
    }
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300 relative overflow-hidden">
      {/* Subtle Background Ambient Aura Glow */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-br from-[#0051d5]/12 via-[#316bf3]/8 to-[#6ffbbe]/10 rounded-full blur-3xl pointer-events-none -z-10 ambient-glow-pulse" 
        aria-hidden="true"
      />

      {/* Top Notice / Promo Pill */}
      <div className="px-4 py-1 flex justify-center animate-hero-badge mb-3">
        <button
          onClick={() => scrollToSection('pricing')}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dce9ff] text-[#0b1c30] hover:bg-[#d3e4fe] hover:shadow-sm transition-all active:scale-95 shadow-sm max-w-full"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#0051d5] animate-ping" />
          <span className="font-label-sm text-xs truncate text-[#0051d5] font-bold">
            WordPress 6.7+ & FSE Ready
          </span>
          <span className="font-caption text-xs text-[#45464d] hidden sm:inline">
            • 99.8% Speed Score
          </span>
          <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
            arrow_forward
          </span>
        </button>
      </div>

      {/* HOMEPAGE HERO SECTION: PROFESSIONAL BUSINESS IMAGE SLIDER */}
      <section className="px-3 sm:px-4 pb-12 max-w-5xl mx-auto w-full relative">
        <HeroSlider
          slides={slides}
          settings={sliderSettings}
          onOpenCustomizer={onOpenCustomizer}
          onCtaClick={handleSliderCta}
        />

        {/* Social Proof Metrics Strip */}
        <div className="grid grid-cols-3 gap-1 w-full max-w-lg mx-auto p-2 rounded-2xl bg-white shadow-md my-8 text-left border border-[#e5eeff] animate-hero-stats hover:shadow-lg transition-shadow">
          <div className="flex flex-col p-2.5 group cursor-default">
            <div className="flex items-center gap-1 text-[#0051d5]">
              <span
                className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#0b1c30]">
                4.9/5
              </span>
            </div>
            <span className="font-caption text-xs text-[#45464d]">ThemeForest Rating</span>
          </div>

          <div className="flex flex-col p-2.5 border-l border-[#e5eeff] group cursor-default">
            <div className="flex items-center gap-1 text-[#0b1c30]">
              <span className="font-headline-sm text-lg sm:text-xl font-bold group-hover:text-[#0051d5] transition-colors">18.5k+</span>
            </div>
            <span className="font-caption text-xs text-[#45464d]">Active Installs</span>
          </div>

          <div className="flex flex-col p-2.5 border-l border-[#e5eeff] group cursor-default">
            <div className="flex items-center gap-1 text-[#0051d5]">
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">support_agent</span>
              <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#0b1c30]">24/7</span>
            </div>
            <span className="font-caption text-xs text-[#45464d]">Expert SLA</span>
          </div>
        </div>

        {/* Hero Mockup / Dashboard Preview Card with Subtle Image Zoom */}
        <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-white p-2 shadow-xl border border-[#eff4ff] animate-hero-mockup group">
          <div className="relative rounded-xl overflow-hidden bg-[#131b2e] p-4 text-left">
            {/* Window Controls */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] hover:opacity-80 cursor-pointer" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#dbe1ff] hover:opacity-80 cursor-pointer" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6ffbbe] hover:opacity-80 cursor-pointer" />
              </div>
              <span className="font-caption text-xs text-[#7c839b] font-mono">
                demo.apexbiz-theme.wp/enterprise
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#7c839b]">tab</span>
            </div>

            {/* Dashboard Internal Layout with Image Zoom on Hover */}
            <div className="grid grid-cols-1 gap-2">
              <div className="h-44 sm:h-52 rounded-lg relative overflow-hidden bg-[#dce9ff]/10">
                <img
                  className="w-full h-full object-cover rounded-lg img-zoom-target"
                  alt="Modern corporate analytics dashboard screen preview"
                  src={ASSETS.dashboardPreview}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Stat Chip Overlap with Subtle Floating Motion */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg flex items-center gap-2 border border-[#eff4ff] floating-badge hover:shadow-xl transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0051d5]">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-headline-sm text-base font-bold text-[#0b1c30]">
                    +142%
                  </span>
                  <span className="font-label-sm text-[10px] text-[#009668] bg-[#6ffbbe]/30 px-1 rounded font-bold">
                    YoY
                  </span>
                </div>
                <p className="font-caption text-[11px] text-[#45464d]">Organic Conversion</p>
              </div>

              {/* Sparkline SVG */}
              <svg className="w-12 h-5 text-[#0051d5] ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 60 20">
                <polyline points="0,18 10,14 22,16 34,8 46,11 58,2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Client Trust Bar with Scroll Reveal */}
      <section className="w-full bg-[#eff4ff] py-6 px-4 border-y border-[#e5eeff] reveal-on-scroll">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <span className="font-label-sm text-xs uppercase text-[#45464d] tracking-wider text-center font-bold">
            Trusted by 500+ global enterprises & fast-growing startups
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-80">
            <div className="flex items-center gap-1 font-headline-sm text-sm sm:text-base text-[#0b1c30] font-extrabold tracking-tighter hover:opacity-100 hover:scale-105 transition-transform cursor-default">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">layers</span>
              <span>VERTEX</span>
            </div>
            <div className="flex items-center gap-1 font-headline-sm text-sm sm:text-base text-[#0b1c30] font-bold tracking-tight hover:opacity-100 hover:scale-105 transition-transform cursor-default">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">cloud</span>
              <span>CloudScale</span>
            </div>
            <div className="flex items-center gap-1 font-headline-sm text-sm sm:text-base text-[#0b1c30] font-black tracking-normal hover:opacity-100 hover:scale-105 transition-transform cursor-default">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">blur_on</span>
              <span>HORIZON AI</span>
            </div>
            <div className="flex items-center gap-1 font-headline-sm text-sm sm:text-base text-[#0b1c30] font-semibold tracking-wide hover:opacity-100 hover:scale-105 transition-transform cursor-default">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">token</span>
              <span>Novalink</span>
            </div>
            <div className="flex items-center gap-1 font-headline-sm text-sm sm:text-base text-[#0b1c30] font-bold tracking-tight hover:opacity-100 hover:scale-105 transition-transform cursor-default">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">expand</span>
              <span>STRATOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section with Scroll Reveal & Hover Lift */}
      <section className="px-4 py-16 max-w-4xl mx-auto w-full reveal-on-scroll" id="services">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
            WHAT WE DO
          </span>
          <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-2 font-bold">
            Engineered For Enterprise Growth
          </h2>
          <p className="font-body-sm text-sm text-[#45464d] max-w-md">
            Architected with decoupled performance blocks, responsive micro-layouts, and turnkey commercial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#eff4ff] group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] text-[#0051d5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0051d5] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[26px]">insights</span>
              </div>
              <h3 className="font-title-lg text-lg text-[#0b1c30] mb-1 font-bold group-hover:text-[#0051d5] transition-colors">
                Strategic Consulting
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4">
                Business model refinement, digital transformation roadmaps, and seamless M&A tech integration.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('theme-features')}
              className="flex items-center gap-1 text-[#0051d5] font-label-md text-xs font-semibold text-left group-hover:gap-2 transition-all"
            >
              <span>Explore roadmap</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#eff4ff] group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#0051d5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0051d5] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[26px]">dns</span>
              </div>
              <h3 className="font-title-lg text-lg text-[#0b1c30] mb-1 font-bold group-hover:text-[#0051d5] transition-colors">
                Cloud Infrastructure
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4">
                Scalable AWS/GCP architecture, zero-downtime serverless transitions, and continuous SOC2 compliance.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('theme-features')}
              className="flex items-center gap-1 text-[#0051d5] font-label-md text-xs font-semibold text-left group-hover:gap-2 transition-all"
            >
              <span>Cloud blueprints</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#eff4ff] group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#0051d5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0051d5] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[26px]">design_services</span>
              </div>
              <h3 className="font-title-lg text-lg text-[#0b1c30] mb-1 font-bold group-hover:text-[#0051d5] transition-colors">
                Product Design & UI/UX
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4">
                Research-driven design systems, user journey telemetry, and high-conversion wireframes engineered to sell.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('elementor-blocks')}
              className="flex items-center gap-1 text-[#0051d5] font-label-md text-xs font-semibold text-left group-hover:gap-2 transition-all"
            >
              <span>Design systems</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#eff4ff] group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] text-[#0051d5] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0051d5] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[26px]">psychology</span>
              </div>
              <h3 className="font-title-lg text-lg text-[#0b1c30] mb-1 font-bold group-hover:text-[#0051d5] transition-colors">
                AI & Data Intelligence
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4">
                Custom LLM integrations, predictive analytics dashboards, and autonomous business pipeline automation.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('theme-features')}
              className="flex items-center gap-1 text-[#0051d5] font-label-md text-xs font-semibold text-left group-hover:gap-2 transition-all"
            >
              <span>AI solutions</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => onSelectTab('theme-features')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff] hover:shadow-sm transition-all font-label-md text-xs font-bold active:scale-95"
          >
            <span>View All 12 Capabilities</span>
            <span className="material-symbols-outlined text-[18px] text-[#0051d5]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* About / Story Section with Scroll Reveal */}
      <section className="bg-[#eff4ff] px-4 py-16 border-y border-[#e5eeff] reveal-on-scroll">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
              ABOUT OUR FIRM
            </span>
            <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-2 font-bold">
              We Combine Strategic Vision with Engineering Rigor
            </h2>
            <p className="font-body-md text-sm text-[#45464d] mb-4 leading-relaxed">
              Founded by seasoned corporate architects and digital strategists, ApexBiz provides organizations with the exact operational velocity needed to lead saturated marketplaces.
            </p>

            {/* Visual Block with Team Image and Floating Animated Badge */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md mb-4 bg-slate-900 group">
              <div className="h-56 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover img-zoom-target"
                  alt="Executive team collaborating in conference room"
                  src={ASSETS.teamConference}
                />
              </div>
              <div className="absolute bottom-3 left-3 bg-[#131b2e] text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/10 floating-badge">
                <span className="font-headline-sm text-xl font-extrabold text-[#dbe1ff]">12+</span>
                <span className="font-label-sm text-[11px] leading-tight text-slate-300">
                  Years of<br />Excellence
                </span>
              </div>
            </div>

            {/* Checklist with Hover Micro-Interactions */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#e5eeff] hover:border-[#0051d5]/40 hover:shadow-sm transition-all group">
                <div className="w-7 h-7 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#0051d5] shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <span className="font-body-sm text-xs sm:text-sm text-[#0b1c30] font-medium">
                  ISO 27001 Certified Security Practices
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#e5eeff] hover:border-[#0051d5]/40 hover:shadow-sm transition-all group">
                <div className="w-7 h-7 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#0051d5] shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </div>
                <span className="font-body-sm text-xs sm:text-sm text-[#0b1c30] font-medium">
                  Agile Delivery with Guaranteed 2-Week Sprints
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-[#e5eeff] hover:border-[#0051d5]/40 hover:shadow-sm transition-all group">
                <div className="w-7 h-7 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#0051d5] shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                </div>
                <span className="font-body-sm text-xs sm:text-sm text-[#0b1c30] font-medium">
                  Dedicated Client Success & Solutions Architects
                </span>
              </div>
            </div>

            {/* Managing Partner Quote Card */}
            <div className="p-4 rounded-2xl bg-white shadow-sm card-hover-lift flex items-start gap-4 border border-[#e5eeff] group">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#dce9ff] group-hover:border-[#0051d5] transition-colors">
                <img
                  className="w-full h-full object-cover img-zoom-target"
                  alt="Portrait of Marcus Vance"
                  src={ASSETS.marcusVance}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-body-sm text-xs sm:text-sm italic text-[#0b1c30] mb-1 leading-relaxed">
                  "We don't merely ship software; we engineer resilient institutional assets designed to compound enterprise valuation."
                </p>
                <span className="font-label-md text-xs font-bold text-[#0b1c30]">
                  Marcus Vance
                </span>
                <span className="font-caption text-[11px] text-[#45464d]">
                  Managing Partner & Chief Strategist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio & Case Studies Showcase with Scroll Reveal & Image Zoom */}
      <section className="px-4 py-16 max-w-4xl mx-auto w-full reveal-on-scroll" id="demos">
        <div className="flex flex-col items-center text-center mb-6">
          <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
            FEATURED WORK
          </span>
          <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-1 font-bold">
            Proven Impact Across Global Markets
          </h2>
          <p className="font-body-sm text-sm text-[#45464d] max-w-md">
            Discover how our block architecture powers top-tier digital transformation.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4" id="caseFilters">
            {(['all', 'fintech', 'saas', 'health'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCaseFilter(cat)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-xs transition-all active:scale-95 ${
                  caseFilter === cat
                    ? 'bg-[#0051d5] text-white shadow-sm font-bold'
                    : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                {cat === 'all' ? 'All' : cat === 'fintech' ? 'Fintech' : cat === 'saas' ? 'SaaS' : 'Healthcare'}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards with Smooth Hover Transitions & Image Zoom */}
        <div className="flex flex-col gap-6 max-w-xl mx-auto">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-white overflow-hidden shadow-sm card-hover-lift flex flex-col border border-[#eff4ff] group"
            >
              <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                <img
                  className="w-full h-full object-cover img-zoom-target"
                  alt={study.title}
                  src={study.image}
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#131b2e]/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {study.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#0051d5] text-[10px] font-bold">
                    {study.badgeLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-lg text-lg text-[#0b1c30] font-bold group-hover:text-[#0051d5] transition-colors">
                    {study.title}
                  </h3>
                  <span className="font-label-sm text-[11px] font-bold text-[#009668] bg-[#6ffbbe]/30 px-2 py-0.5 rounded-full">
                    {study.impactMetric}
                  </span>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4 leading-relaxed">
                  {study.description}
                </p>
                <button
                  onClick={() => onOpenCaseStudy(study)}
                  className="inline-flex items-center gap-1 text-[#0051d5] font-label-md text-xs font-semibold self-start hover:gap-2 transition-all"
                >
                  <span>Read Case Study</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => onSelectTab('starter-templates')}
            className="inline-flex items-center gap-2 text-[#0051d5] font-label-md text-xs font-bold hover:underline"
          >
            <span>View Full Portfolio Case Studies</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Client Testimonials Grid with Scroll Reveal */}
      <section className="bg-[#eff4ff] px-4 py-16 border-y border-[#e5eeff] reveal-on-scroll">
        <div className="flex flex-col items-center text-center mb-8 max-w-xl mx-auto">
          <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
            TESTIMONIALS
          </span>
          <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-1 font-bold">
            Loved by CTOs, Founders & Agencies
          </h2>
          <p className="font-body-sm text-xs sm:text-sm text-[#45464d]">
            See why fast-growing enterprises trust ApexBiz for digital deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {/* Quote 1 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#e5eeff] group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-[#0051d5]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[#009668] bg-[#6ffbbe]/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Verified Buyer</span>
                </span>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-[#0b1c30] mb-4 italic leading-relaxed">
                "ApexBiz completely transformed how our enterprise presents itself. We launched our localized sites in under two weeks without touching custom CSS once."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#dce9ff] group-hover:border-[#0051d5] transition-colors">
                <img
                  className="w-full h-full object-cover img-zoom-target"
                  alt="Elena Rostova"
                  src={ASSETS.elenaRostova}
                />
              </div>
              <div>
                <h4 className="font-title-md text-xs sm:text-sm font-bold text-[#0b1c30]">
                  Elena Rostova
                </h4>
                <p className="font-caption text-[11px] text-[#45464d]">VP Product at SynthCore</p>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#e5eeff] group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-[#0051d5]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[#009668] bg-[#6ffbbe]/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Verified Buyer</span>
                </span>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-[#0b1c30] mb-4 italic leading-relaxed">
                "The cleanest theme code I’ve ever worked with in WordPress. Gutenberg blocks work seamlessly out of the box with zero runtime bloat."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#dce9ff] group-hover:border-[#0051d5] transition-colors">
                <img
                  className="w-full h-full object-cover img-zoom-target"
                  alt="David Chen"
                  src={ASSETS.davidChen}
                />
              </div>
              <div>
                <h4 className="font-title-md text-xs sm:text-sm font-bold text-[#0b1c30]">
                  David Chen
                </h4>
                <p className="font-caption text-[11px] text-[#45464d]">Lead Architect at Horizon Labs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Pricing / Licensing Section with Scroll Reveal */}
      <section className="px-4 py-16 max-w-4xl mx-auto w-full reveal-on-scroll" id="pricing">
        <div className="flex flex-col items-center text-center mb-8 max-w-xl mx-auto">
          <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
            FLEXIBLE LICENSING
          </span>
          <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-1 font-bold">
            Transparent Pricing For Every Scale
          </h2>
          <p className="font-body-sm text-xs sm:text-sm text-[#45464d] mb-4">
            Instant download, verified Envato marketplace licensing, and lifetime access options.
          </p>

          {/* Billing Toggle with Smooth Active Switch */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#e5eeff] shadow-inner">
            <button
              onClick={() => setIsLifetimePricing(false)}
              className={`px-4 py-1.5 rounded-full font-label-sm text-xs transition-all ${
                !isLifetimePricing
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold scale-100'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              Annual <span className="text-[#0051d5] font-bold">(Save 20%)</span>
            </button>
            <button
              onClick={() => setIsLifetimePricing(true)}
              className={`px-4 py-1.5 rounded-full font-label-sm text-xs transition-all ${
                isLifetimePricing
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold scale-100'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>

        {/* 3 Pricing Tier Cards with Card Hover Lift */}
        <div className="flex flex-col gap-6 max-w-xl mx-auto">
          {/* Tier 1: Starter */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col border border-[#eff4ff]">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-title-lg text-lg font-bold text-[#0b1c30]">Single License</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] text-[11px] font-semibold">
                Standard
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#45464d] mb-4">
              Perfect for single business websites or founder portfolios.
            </p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-headline-lg-mobile text-3xl font-bold text-[#0b1c30]">
                ${isLifetimePricing ? 99 : 49}
              </span>
              <span className="font-caption text-xs text-[#45464d]">
                {isLifetimePricing ? 'one-time' : '/ year'}
              </span>
            </div>
            <ul className="flex flex-col gap-2 mb-6 font-body-sm text-xs sm:text-sm text-[#0b1c30]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>1 Production Domain</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>All 90+ Business Layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>6 Months Standard Support</span>
              </li>
              <li className="flex items-center gap-2 text-[#76777d] opacity-60">
                <span className="material-symbols-outlined text-[18px]">close</span>
                <span>Elementor Pro Templates</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenCheckout('single', isLifetimePricing)}
              className="w-full h-12 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-label-md text-xs font-semibold hover:bg-[#dce9ff] btn-interactive"
            >
              Get Starter Plan
            </button>
          </div>

          {/* Tier 2: Professional (Most Popular) */}
          <div className="relative p-6 rounded-2xl bg-white shadow-xl card-hover-lift flex flex-col border-2 border-[#0051d5]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0051d5] text-white px-4 py-0.5 rounded-full font-label-sm text-[10px] shadow-md font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div className="flex justify-between items-center mb-1 pt-1">
              <h3 className="font-title-lg text-lg font-bold text-[#0b1c30]">Agency & Pro</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#0051d5] text-[11px] font-bold">
                Recommended
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#45464d] mb-4">
              Unlimited scale for ambitious agencies, developers, and studios.
            </p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-headline-lg-mobile text-3xl font-bold text-[#0051d5]">
                ${isLifetimePricing ? 179 : 89}
              </span>
              <span className="font-caption text-xs text-[#45464d]">
                {isLifetimePricing ? 'one-time' : '/ year'}
              </span>
            </div>
            <ul className="flex flex-col gap-2 mb-6 font-body-sm text-xs sm:text-sm text-[#0b1c30]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span className="font-bold">Unlimited Production Websites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>Elementor Pro & Gutenberg Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>Lifetime Automatic Core Updates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>Priority 24/7 Slack & Ticket Desk</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenCheckout('agency', isLifetimePricing)}
              className="w-full h-12 rounded-xl bg-[#0051d5] text-white font-label-md text-xs font-semibold hover:bg-[#316bf3] shadow-md btn-interactive"
            >
              Get Professional Access
            </button>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="p-6 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col border border-[#eff4ff]">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-title-lg text-lg font-bold text-[#0b1c30]">Enterprise Elite</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] text-[11px] font-semibold">
                Custom
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#45464d] mb-4">
              Complete source repositories, white-label rights, and dedicated audit.
            </p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-headline-lg-mobile text-3xl font-bold text-[#0b1c30]">
                ${isLifetimePricing ? 399 : 199}
              </span>
              <span className="font-caption text-xs text-[#45464d]">
                {isLifetimePricing ? 'one-time' : '/ year'}
              </span>
            </div>
            <ul className="flex flex-col gap-2 mb-6 font-body-sm text-xs sm:text-sm text-[#0b1c30]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>Everything in Professional Tier</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>1-on-1 WordPress Performance Audit</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>White-Label Branding Rights</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">check</span>
                <span>Dedicated Solutions Engineer</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenCheckout('enterprise', isLifetimePricing)}
              className="w-full h-12 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-label-md text-xs font-semibold hover:bg-[#dce9ff] btn-interactive"
            >
              Contact Enterprise Team
            </button>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion with Scroll Reveal */}
      <section className="bg-[#eff4ff] px-4 py-16 border-y border-[#e5eeff] reveal-on-scroll">
        <div className="flex flex-col items-center text-center mb-8 max-w-xl mx-auto">
          <span className="font-label-sm text-xs uppercase tracking-wider text-[#0051d5] font-bold mb-1">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-headline-md-mobile text-2xl sm:text-3xl text-[#0b1c30] mb-1 font-bold">
            Got Questions? We’ve Got Answers
          </h2>
          <p className="font-body-sm text-xs sm:text-sm text-[#45464d]">
            Everything you need to know about setting up ApexBiz on your WordPress stack.
          </p>
        </div>

        <div className="flex flex-col gap-2 max-w-xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white overflow-hidden shadow-sm border border-[#e5eeff] transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left font-title-md text-sm sm:text-base font-bold text-[#0b1c30] hover:text-[#0051d5] transition-colors"
                >
                  <span className="pr-2">{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#0051d5] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-[#45464d] leading-relaxed border-t border-[#eff4ff] pt-2 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pre-Footer Marketplace CTA Banner with Ambient Animated Gradient */}
      <section className="px-4 py-12 max-w-4xl mx-auto w-full reveal-on-scroll">
        <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden bg-[#131b2e] text-white p-8 text-center shadow-2xl border border-white/10 group">
          {/* Living glowing background accents with subtle ambient breathing pulse */}
          <div className="absolute -top-20 -left-20 w-52 h-52 rounded-full bg-[#0051d5] blur-3xl opacity-35 ambient-glow-pulse" />
          <div className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full bg-[#6ffbbe] blur-3xl opacity-25 ambient-glow-pulse" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-[#dbe1ff] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>

            <h2 className="font-headline-lg-mobile text-2xl sm:text-3xl mb-2 font-bold text-white">
              Ready to Build a High-Converting Business Website?
            </h2>

            <p className="font-body-md text-xs sm:text-sm text-[#7c839b] mb-6 max-w-sm leading-relaxed">
              Join 18,000+ satisfied business owners, agencies, and founders. Launch your corporate flagship today.
            </p>

            <button
              onClick={() => onOpenCheckout('agency', false)}
              className="w-full sm:w-auto px-8 h-14 rounded-full bg-[#0051d5] text-white font-label-md text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#316bf3] btn-interactive mb-2"
            >
              <span>Get ApexBiz Now — $59</span>
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            </button>

            <span className="font-caption text-[11px] text-[#7c839b]">
              Includes 6 months hands-on technical support & future version updates
            </span>
          </div>
        </div>
      </section>

      {/* Footer matching HTML with Animated Hover Links */}
      <footer className="w-full bg-[#eff4ff] mt-8 px-4 pt-10 pb-8 border-t border-[#e5eeff] reveal-on-scroll">
        <div className="flex flex-col gap-6 max-w-xl mx-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                alt="ApexBiz Logo"
                className="h-7 w-auto object-contain hover:scale-105 transition-transform"
                src={ASSETS.logo}
              />
              <span className="font-headline-sm text-base text-[#0b1c30] font-bold">ApexBiz WP</span>
            </div>
            <p className="font-body-sm text-xs text-[#45464d]">
              Enterprise WordPress business ecosystem architected for modern corporate velocity.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#d3e4fe] text-[#45464d] font-label-sm text-[11px] font-semibold hover:bg-[#bec6e0] transition-colors cursor-default">
              Gutenberg Optimized
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#d3e4fe] text-[#45464d] font-label-sm text-[11px] font-semibold hover:bg-[#bec6e0] transition-colors cursor-default">
              Elementor Ready
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#d3e4fe] text-[#45464d] font-label-sm text-[11px] font-semibold hover:bg-[#bec6e0] transition-colors cursor-default">
              WooCommerce Compatible
            </span>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-2 bg-white p-4 rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#e5eeff] card-hover-lift">
            <span className="font-title-md text-sm font-bold text-[#0b1c30]">
              Subscribe to Updates
            </span>
            <p className="font-body-sm text-xs text-[#45464d]">
              Receive theme patchnotes and exclusive starter kit drops.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) {
                  onSubscribeNewsletter(newsletterEmail);
                  setNewsletterEmail('');
                }
              }}
              className="flex gap-2"
            >
              <input
                className="flex-1 h-11 px-3 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0b1c30] placeholder-[#76777d] focus:outline-none focus:ring-2 focus:ring-[#0051d5] transition-all"
                placeholder="business@company.com"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                className="h-11 px-5 bg-[#0051d5] text-white rounded-lg font-label-md text-xs font-semibold hover:bg-[#316bf3] btn-interactive"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="font-label-md text-xs font-bold text-[#0b1c30]">Theme Demos</span>
              <button onClick={() => onSelectTab('starter-templates')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Corporate Main</button>
              <button onClick={() => onSelectTab('starter-templates')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">SaaS & Venture</button>
              <button onClick={() => onSelectTab('starter-templates')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Consulting Pro</button>
              <button onClick={() => onSelectTab('starter-templates')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Agency Showcase</button>
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="font-label-md text-xs font-bold text-[#0b1c30]">Resources</span>
              <button onClick={() => onSelectTab('theme-features')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Documentation</button>
              <button onClick={() => onSelectTab('elementor-blocks')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Child Themes</button>
              <button onClick={() => onSelectTab('theme-features')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">API & Hooks</button>
              <button onClick={() => onSelectTab('pricing-license')} className="text-left text-[#45464d] hover:text-[#0051d5] nav-link-hover self-start">Support Desk</button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:text-[#0051d5] hover:bg-[#dce9ff] hover:scale-110 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">tag</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:text-[#0051d5] hover:bg-[#dce9ff] hover:scale-110 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">business</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:text-[#0051d5] hover:bg-[#dce9ff] hover:scale-110 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
            </a>
            <button
              onClick={onOpenVideoModal}
              aria-label="YouTube walkthrough"
              className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:text-[#0051d5] hover:bg-[#dce9ff] hover:scale-110 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">smart_display</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-[#45464d]">
            © 2026 ApexBiz WordPress Theme. Built with Elementor & Gutenberg ready.
          </div>
        </div>
      </footer>
    </div>
  );
};
