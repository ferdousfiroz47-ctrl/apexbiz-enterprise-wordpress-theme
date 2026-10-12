import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'starter-templates', label: 'Templates', icon: 'web' },
    { id: 'theme-features', label: 'Features', icon: 'widgets' },
    { id: 'elementor-blocks', label: 'Blocks', icon: 'extension' },
    { id: 'pricing-license', label: 'Pricing', icon: 'shopping_bag' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)] transition-all"
      aria-label="Bottom Navigation"
    >
      <div className="flex justify-around items-center h-20 px-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all duration-200 rounded-xl group ${
                isActive
                  ? 'text-[#0051d5] font-bold scale-105'
                  : 'text-[#45464d] hover:text-[#0b1c30] hover:scale-105'
              } active:scale-95`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5">
                <span
                  className="material-symbols-outlined text-[24px] transition-all duration-200"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" />
                )}
              </div>
              <span className="font-label-sm text-[11px] leading-tight tracking-tight transition-colors">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
