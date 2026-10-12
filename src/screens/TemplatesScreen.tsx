import React, { useState } from 'react';
import { STARTER_TEMPLATES } from '../data/themeData';
import { StarterTemplate } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TemplatesScreenProps {
  onImportDemo: (template: StarterTemplate) => void;
  onPreviewTemplate: (template: StarterTemplate) => void;
}

export const TemplatesScreen: React.FC<TemplatesScreenProps> = ({
  onImportDemo,
  onPreviewTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useScrollReveal(selectedCategory);

  const categories = [
    { id: 'all', label: 'All Demos (90+)' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'saas', label: 'SaaS & Tech' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'health', label: 'Healthcare' },
    { id: 'agency', label: 'Creative Agency' },
  ];

  const filteredTemplates = STARTER_TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 py-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Screen Title & Subtitle */}
      <div className="text-center mb-6 animate-hero-heading">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] mb-2 hover:bg-[#cbdbf5] transition-colors cursor-default">
          <span className="material-symbols-outlined text-[16px] text-[#0051d5]">auto_awesome</span>
          <span className="font-label-sm text-xs">Ready-to-Deploy Blueprints</span>
        </div>
        <h1 className="font-headline-lg-mobile text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
          Pre-Built Starter Templates
        </h1>
        <p className="font-body-sm text-xs sm:text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
          Every demo imports complete with header designs, typography presets, block patterns, and high-conversion landing pages.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-4 max-w-md mx-auto w-full animate-hero-paragraph">
        <span className="material-symbols-outlined absolute left-3.5 top-3 text-[18px] text-[#76777d]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search corporate, fintech, clinic, consulting..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#e5eeff] rounded-xl text-xs sm:text-sm text-[#0b1c30] placeholder-[#76777d] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0051d5] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-[#76777d] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Horizontal Category Scroll */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 max-w-xl mx-auto no-scrollbar animate-hero-ctas">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full font-label-sm text-xs whitespace-nowrap transition-all active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-[#0051d5] text-white shadow-sm font-bold'
                : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid with Hover Lift and Image Zoom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-2xl bg-white overflow-hidden shadow-sm card-hover-lift flex flex-col border border-[#eff4ff] group"
          >
            <div className="h-44 w-full relative overflow-hidden bg-slate-900">
              <img
                src={tpl.image}
                alt={tpl.title}
                className="w-full h-full object-cover img-zoom-target"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#131b2e]/85 backdrop-blur-sm text-white text-[10px] font-semibold">
                  {tpl.categoryLabel}
                </span>
                {tpl.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/90 backdrop-blur-sm text-[#002113] text-[10px] font-bold">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                {tpl.pagesCount} pages
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-lg text-base font-bold text-[#0b1c30] group-hover:text-[#0051d5] transition-colors">
                    {tpl.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#0051d5] text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{tpl.rating}</span>
                  </div>
                </div>

                <p className="font-body-sm text-xs text-[#45464d] mb-3 line-clamp-2 leading-relaxed">
                  {tpl.description}
                </p>

                <div className="text-[11px] text-[#76777d] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                  <span>{tpl.compatibility}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#eff4ff]">
                <button
                  onClick={() => onPreviewTemplate(tpl)}
                  className="flex-1 h-10 rounded-xl bg-[#e5eeff] text-[#0051d5] font-label-md text-xs font-bold hover:bg-[#dce9ff] flex items-center justify-center gap-1 btn-interactive"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => onImportDemo(tpl)}
                  className="flex-1 h-10 rounded-xl bg-[#0051d5] text-white font-label-md text-xs font-bold hover:bg-[#316bf3] shadow-sm flex items-center justify-center gap-1 btn-interactive"
                >
                  <span className="material-symbols-outlined text-[16px]">cloud_download</span>
                  <span>1-Click Import</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#e5eeff] max-w-md mx-auto p-6 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-4xl text-[#76777d] mb-2">
            search_off
          </span>
          <h4 className="font-bold text-sm text-[#0b1c30]">No starter templates found</h4>
          <p className="text-xs text-[#45464d] mt-1 mb-4">
            Try adjusting your search query or select "All Demos" to browse 90+ designs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[#0051d5] text-white text-xs font-semibold rounded-xl btn-interactive"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
