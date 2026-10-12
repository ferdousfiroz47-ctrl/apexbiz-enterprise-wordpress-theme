import React from 'react';
import { TabType } from '../types';
import { ASSETS } from '../data/themeData';

interface HeaderProps {
  activeTab: TabType;
  onOpenDrawer: () => void;
  onOpenChangelog: () => void;
  onOpenAccount: () => void;
  isDesktopView: boolean;
  onToggleDesktopView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenDrawer,
  onOpenChangelog,
  onOpenAccount,
  isDesktopView,
  onToggleDesktopView
}) => {
  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'overview':
        return 'Overview';
      case 'starter-templates':
        return 'Templates';
      case 'theme-features':
        return 'Features';
      case 'elementor-blocks':
        return 'Blocks';
      case 'pricing-license':
        return 'Pricing';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-[#131b2e] text-white px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6ffbbe] animate-pulse"></span>
          <span className="font-semibold text-[11px] text-[#eff4ff]">WP v6.7 & Elementor Pro Ready</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDesktopView}
            className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#bec6e0] hover:text-white transition-colors hover:scale-105"
            title="Toggle between Mobile Shell and Wide View"
          >
            <span className="material-symbols-outlined text-[13px]">
              {isDesktopView ? 'smartphone' : 'desktop_windows'}
            </span>
            <span>{isDesktopView ? 'Phone Frame' : 'Expand View'}</span>
          </button>
          <button
            onClick={onOpenChangelog}
            className="font-semibold text-[11px] text-[#dbe1ff] hover:text-white flex items-center gap-1 transition-all hover:gap-1.5"
          >
            Changelog <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle Mobile Menu"
            onClick={onOpenDrawer}
            className="w-11 h-11 flex items-center justify-center text-[#0b1c30] hover:text-[#0051d5] active:scale-95 transition-all rounded-xl hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex items-center gap-1.5 cursor-pointer group">
            <img
              alt="ApexBiz Logo"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              src={ASSETS.logo}
            />
            <span className="font-headline-sm text-[18px] tracking-tight text-[#0b1c30] font-bold group-hover:text-[#0051d5] transition-colors">
              ApexBiz
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#0051d5] text-xs font-semibold shadow-xs">
            {getTabLabel(activeTab)}
          </div>
          <button
            aria-label="User Account and Licensing"
            onClick={onOpenAccount}
            className="w-9 h-9 rounded-full bg-black hover:bg-[#131b2e] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm text-white"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
