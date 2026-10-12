import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const FeaturesScreen: React.FC = () => {
  // Speed Audit Simulation
  const [testingSpeed, setTestingSpeed] = useState(false);
  const [speedResult, setSpeedResult] = useState<{
    score: number;
    ttfb: string;
    fcp: string;
    lcp: string;
    cls: string;
  }>({
    score: 99.8,
    ttfb: '42ms',
    fcp: '0.28s',
    lcp: '0.42s',
    cls: '0.002'
  });

  // Global Style Manager Interactive Simulator
  const [themeColor, setThemeColor] = useState<'sapphire' | 'emerald' | 'obsidian' | 'purple'>('sapphire');
  const [borderRadius, setBorderRadius] = useState<'sharp' | 'curved' | 'pill'>('curved');
  const [activeTabFeature, setActiveTabFeature] = useState<'fse' | 'styles' | 'speed' | 'commerce'>('speed');

  useScrollReveal(activeTabFeature);

  const runSpeedTest = () => {
    setTestingSpeed(true);
    setTimeout(() => {
      setSpeedResult({
        score: Number((99.5 + Math.random() * 0.4).toFixed(1)),
        ttfb: `${Math.floor(38 + Math.random() * 12)}ms`,
        fcp: `${(0.25 + Math.random() * 0.05).toFixed(2)}s`,
        lcp: `${(0.38 + Math.random() * 0.08).toFixed(2)}s`,
        cls: '0.001'
      });
      setTestingSpeed(false);
    }, 1200);
  };

  const colorPalettes = [
    { id: 'sapphire', name: 'Electric Sapphire', primary: '#0051d5', bg: '#e5eeff' },
    { id: 'emerald', name: 'Emerald Capital', primary: '#009668', bg: '#e6f7f0' },
    { id: 'obsidian', name: 'Obsidian Navy', primary: '#131b2e', bg: '#eaedf3' },
    { id: 'purple', name: 'Venture Violet', primary: '#6b21a8', bg: '#f3e8ff' }
  ];

  return (
    <div className="flex flex-col w-full px-4 py-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center mb-6 animate-hero-heading">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] mb-2 hover:bg-[#cbdbf5] transition-colors cursor-default">
          <span className="material-symbols-outlined text-[16px] text-[#0051d5]">bolt</span>
          <span className="font-label-sm text-xs">Architectural Rigor</span>
        </div>
        <h1 className="font-headline-lg-mobile text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
          Enterprise Theme Architecture
        </h1>
        <p className="font-body-sm text-xs sm:text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
          Engineered for extreme performance, clean DOM outputs, and instantaneous Full Site Editing customization.
        </p>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex justify-center gap-2 mb-6 animate-hero-ctas">
        {[
          { id: 'speed', label: '0.4s Benchmark', icon: 'speed' },
          { id: 'styles', label: 'Style Manager', icon: 'palette' },
          { id: 'fse', label: 'WordPress 6.7 FSE', icon: 'dashboard_customize' },
          { id: 'commerce', label: 'WooCommerce', icon: 'storefront' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabFeature(tab.id as any)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              activeTabFeature === tab.id
                ? 'bg-[#0051d5] text-white shadow-md scale-100'
                : 'bg-white text-[#0b1c30] border border-[#e5eeff] hover:bg-[#eff4ff]'
            } btn-interactive`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Feature 1: Speed Benchmark Interactive Panel */}
      {activeTabFeature === 'speed' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm card-hover-lift border border-[#e5eeff] max-w-xl mx-auto w-full mb-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider block">
                Google Lighthouse & Core Web Vitals
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
                Live Load Time Audit
              </h3>
            </div>
            <button
              onClick={runSpeedTest}
              disabled={testingSpeed}
              className="px-3.5 py-1.5 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-xl text-xs font-bold flex items-center gap-1 btn-interactive disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[16px] ${testingSpeed ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{testingSpeed ? 'Auditing...' : 'Re-Run Test'}</span>
            </button>
          </div>

          {/* Speed Dial Preview */}
          <div className="p-4 bg-[#eff4ff] rounded-xl flex items-center justify-around mb-5 border border-[#e5eeff]">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-4 border-[#009668] bg-white flex flex-col items-center justify-center shadow-inner mx-auto mb-1 group hover:scale-105 transition-transform">
                <span className="text-xl font-extrabold text-[#009668] font-mono">
                  {speedResult.score}
                </span>
                <span className="text-[9px] uppercase font-bold text-[#45464d]">Score</span>
              </div>
              <span className="text-xs font-bold text-[#0b1c30]">Performance</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#45464d]">Server TTFB:</span>
                <span className="font-mono font-bold text-[#0051d5]">{speedResult.ttfb}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#45464d]">First Contentful Paint:</span>
                <span className="font-mono font-bold text-[#009668]">{speedResult.fcp}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#45464d]">Largest Contentful Paint:</span>
                <span className="font-mono font-bold text-[#009668]">{speedResult.lcp}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#45464d]">Cumulative Layout Shift:</span>
                <span className="font-mono font-bold text-[#009668]">{speedResult.cls}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#45464d]">
            <div className="flex items-start gap-2 p-2 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] hover:border-[#0051d5]/40 transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#009668] mt-0.5">
                check_circle
              </span>
              <span>
                <strong>Zero External jQuery:</strong> 100% modern ES6 vanilla modules loaded asynchronously.
              </span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] hover:border-[#0051d5]/40 transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#009668] mt-0.5">
                check_circle
              </span>
              <span>
                <strong>Native Inline CSS:</strong> Critical above-the-fold styles inlined for instant mobile paint.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Feature 2: Interactive Global Style Manager */}
      {activeTabFeature === 'styles' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm card-hover-lift border border-[#e5eeff] max-w-xl mx-auto w-full mb-6 animate-in fade-in duration-300">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider block">
              WordPress 6.7 theme.json Engine
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              Global Style Manager Simulator
            </h3>
            <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
              Switch color palettes and radii tokens in real time to see how all theme components instantly update.
            </p>
          </div>

          {/* Palette selector */}
          <div className="mb-4">
            <label className="text-xs font-bold text-[#0b1c30] block mb-2">
              Select Brand Color Palette:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorPalettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setThemeColor(p.id as any)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold text-left transition-all ${
                    themeColor === p.id
                      ? 'border-[#0051d5] bg-[#eff4ff] ring-2 ring-[#0051d5]'
                      : 'border-[#e5eeff] bg-[#f8f9ff] hover:bg-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm transition-transform hover:scale-125"
                    style={{ backgroundColor: p.primary }}
                  />
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Radius selector */}
          <div className="mb-5">
            <label className="text-xs font-bold text-[#0b1c30] block mb-2">
              Corner Radius Geometry:
            </label>
            <div className="flex gap-2">
              {(['sharp', 'curved', 'pill'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setBorderRadius(r)}
                  className={`flex-1 py-2 text-xs font-semibold capitalize rounded-lg transition-all ${
                    borderRadius === r
                      ? 'bg-[#0051d5] text-white shadow-sm font-bold'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Card */}
          <div
            className={`p-4 border transition-all duration-300 ${
              borderRadius === 'sharp'
                ? 'rounded-none'
                : borderRadius === 'pill'
                ? 'rounded-3xl'
                : 'rounded-xl'
            }`}
            style={{
              borderColor: colorPalettes.find((p) => p.id === themeColor)?.primary,
              backgroundColor: colorPalettes.find((p) => p.id === themeColor)?.bg
            }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-wider block mb-1"
              style={{ color: colorPalettes.find((p) => p.id === themeColor)?.primary }}
            >
              Live Component Preview
            </span>
            <h4 className="font-bold text-sm text-[#0b1c30] mb-2">
              Modern Executive Card Component
            </h4>
            <p className="text-xs text-[#45464d] mb-3 leading-relaxed">
              This card reflects your active <code>theme.json</code> tokens with zero code reload.
            </p>
            <button
              className={`px-4 py-2 text-xs font-bold text-white shadow-md btn-interactive ${
                borderRadius === 'sharp'
                  ? 'rounded-none'
                  : borderRadius === 'pill'
                  ? 'rounded-full'
                  : 'rounded-lg'
              }`}
              style={{ backgroundColor: colorPalettes.find((p) => p.id === themeColor)?.primary }}
            >
              Primary Action Button
            </button>
          </div>
        </div>
      )}

      {/* Feature 3: WordPress 6.7 FSE */}
      {activeTabFeature === 'fse' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm card-hover-lift border border-[#e5eeff] max-w-xl mx-auto w-full mb-6 animate-in fade-in duration-300">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider block">
              100% Native Architecture
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              Full Site Editing & Block Themes
            </h3>
          </div>
          <div className="space-y-3 text-xs text-[#45464d]">
            <div className="p-3 bg-[#eff4ff] rounded-xl hover:border-[#0051d5]/40 border border-transparent transition-colors">
              <h4 className="font-bold text-[#0b1c30] mb-1">Visual Header & Footer Builder</h4>
              <p>Design transparent floating menus, mega navigations, and sticky utility bars without PHP coding.</p>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded-xl hover:border-[#0051d5]/40 border border-transparent transition-colors">
              <h4 className="font-bold text-[#0b1c30] mb-1">Synched Pattern Overrides</h4>
              <p>Update section layouts globally while preserving unique localized copywriting per page.</p>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded-xl hover:border-[#0051d5]/40 border border-transparent transition-colors">
              <h4 className="font-bold text-[#0b1c30] mb-1">ACF Pro & Custom Post Types</h4>
              <p>Pre-bundled field definitions for Case Studies, Team Members, Job Openings, and Investor Reports.</p>
            </div>
          </div>
        </div>
      )}

      {/* Feature 4: WooCommerce */}
      {activeTabFeature === 'commerce' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm card-hover-lift border border-[#e5eeff] max-w-xl mx-auto w-full mb-6 animate-in fade-in duration-300">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider block">
              Enterprise Commerce Ready
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              WooCommerce & B2B Solutions
            </h3>
          </div>
          <div className="space-y-3 text-xs text-[#45464d]">
            <div className="p-3 bg-[#eff4ff] rounded-xl hover:border-[#0051d5]/40 border border-transparent transition-colors">
              <h4 className="font-bold text-[#0b1c30] mb-1">AJAX Slide-Out Cart & Instant Checkout</h4>
              <p>Frictionless checkout experience engineered for minimum cart abandonment rates.</p>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded-xl hover:border-[#0051d5]/40 border border-transparent transition-colors">
              <h4 className="font-bold text-[#0b1c30] mb-1">B2B Wholesale & Currency Switcher</h4>
              <p>Multi-currency pricing tables, tiered wholesale quantity discounts, and automated invoice PDF generation.</p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Specifications Matrix */}
      <div className="bg-[#eff4ff] rounded-2xl p-5 border border-[#e5eeff] max-w-xl mx-auto w-full reveal-on-scroll">
        <h4 className="font-title-md text-sm font-bold text-[#0b1c30] mb-3">
          Verified System Requirements
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-white rounded-xl shadow-xs hover:border-[#0051d5]/40 border border-[#e5eeff] transition-all">
            <span className="text-[#76777d] block text-[11px]">WordPress</span>
            <strong className="text-[#0b1c30]">v6.7 or higher</strong>
          </div>
          <div className="p-2.5 bg-white rounded-xl shadow-xs hover:border-[#0051d5]/40 border border-[#e5eeff] transition-all">
            <span className="text-[#76777d] block text-[11px]">PHP Version</span>
            <strong className="text-[#0b1c30]">PHP 8.2 / 8.3</strong>
          </div>
          <div className="p-2.5 bg-white rounded-xl shadow-xs hover:border-[#0051d5]/40 border border-[#e5eeff] transition-all">
            <span className="text-[#76777d] block text-[11px]">Memory Limit</span>
            <strong className="text-[#0b1c30]">256MB recommended</strong>
          </div>
          <div className="p-2.5 bg-white rounded-xl shadow-xs hover:border-[#0051d5]/40 border border-[#e5eeff] transition-all">
            <span className="text-[#76777d] block text-[11px]">Page Builders</span>
            <strong className="text-[#0b1c30]">Gutenberg / Elementor Pro</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
