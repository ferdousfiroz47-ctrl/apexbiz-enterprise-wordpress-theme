import React from 'react';
import { TabType } from '../types';
import { ASSETS } from '../data/themeData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenChangelog: () => void;
  onOpenCheckout: (planId?: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenChangelog,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const navLinks: { id: TabType; label: string; icon: string; count?: string }[] = [
    { id: 'overview', label: 'Theme Overview', icon: 'dashboard' },
    { id: 'starter-templates', label: 'Starter Templates', icon: 'web', count: '90+' },
    { id: 'theme-features', label: 'Theme Features', icon: 'widgets', count: 'FSE 6.7' },
    { id: 'elementor-blocks', label: 'Elementor Blocks', icon: 'extension', count: 'Library' },
    { id: 'pricing-license', label: 'Pricing & Licensing', icon: 'shopping_bag', count: 'Save 20%' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex transition-opacity duration-300 animate-in fade-in">
      <div 
        className="w-80 max-w-[85vw] h-full bg-[#f8f9ff] shadow-2xl flex flex-col justify-between p-5 border-r border-[#e5eeff] transition-transform duration-300 ease-out animate-in slide-in-from-left"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e5eeff] mb-4">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logo} alt="ApexBiz Logo" className="h-8 w-auto object-contain hover:scale-105 transition-transform" />
              <div>
                <span className="font-headline-sm text-lg font-bold text-[#0b1c30] block leading-tight">
                  ApexBiz WP
                </span>
                <span className="text-[11px] text-[#4edea3] font-semibold bg-[#131b2e] px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                  <span>v6.7.2 Ready</span>
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] hover:rotate-90 transition-all duration-200"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Quick Nav Links with Staggered Slide In Animation */}
          <div className="space-y-1 mb-6">
            <p className="text-[11px] font-bold text-[#76777d] uppercase tracking-wider px-2 mb-1">
              Navigation
            </p>
            {navLinks.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all duration-200 animate-in fade-in slide-in-from-left-2 ${
                    isActive
                      ? 'bg-[#0051d5] text-white shadow-md translate-x-1'
                      : 'text-[#0b1c30] hover:bg-[#eff4ff] hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#dce9ff] text-[#0051d5]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Resources & Quick Actions */}
          <div className="space-y-1 border-t border-[#e5eeff] pt-4">
            <p className="text-[11px] font-bold text-[#76777d] uppercase tracking-wider px-2 mb-1">
              Ecosystem
            </p>
            <button
              onClick={() => {
                onOpenChangelog();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#0b1c30] hover:bg-[#eff4ff] hover:translate-x-1 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">history</span>
                <span>Release Notes & Changelog</span>
              </div>
              <span className="text-[10px] text-[#009668] bg-[#6ffbbe]/30 px-1.5 py-0.5 rounded font-bold">
                New
              </span>
            </button>
            <a
              href="https://wordpress.org"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#0b1c30] hover:bg-[#eff4ff] hover:translate-x-1 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">menu_book</span>
                <span>Theme Documentation</span>
              </div>
              <span className="material-symbols-outlined text-[14px] text-[#76777d]">open_in_new</span>
            </a>
            <div className="px-3 py-2 text-xs text-[#45464d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#009668]">verified_user</span>
              <span>Envato Market Certified</span>
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="pt-4 border-t border-[#e5eeff] space-y-2">
          <button
            onClick={() => {
              onOpenCheckout('agency');
              onClose();
            }}
            className="w-full h-11 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md btn-interactive"
          >
            <span>Get ApexBiz Theme — $59</span>
            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
          </button>
          <div className="text-center text-[10px] text-[#76777d]">
            Envato Token Verification • 100% GPL License
          </div>
        </div>
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClose} aria-label="Close drawer" />
    </div>
  );
};
