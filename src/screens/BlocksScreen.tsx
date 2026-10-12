import React, { useState } from 'react';
import { ELEMENTOR_BLOCKS } from '../data/themeData';
import { ElementorBlock } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BlocksScreenProps {
  onCopySnippet: (text: string, label: string) => void;
}

export const BlocksScreen: React.FC<BlocksScreenProps> = ({ onCopySnippet }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedBlock, setInspectedBlock] = useState<ElementorBlock | null>(null);

  useScrollReveal(selectedCategory);

  const categories = [
    { id: 'all', label: 'All 90+ Blocks' },
    { id: 'hero', label: 'Hero Sections' },
    { id: 'stats', label: 'Stats & KPIs' },
    { id: 'pricing', label: 'Pricing Tables' },
    { id: 'services', label: 'Portfolios & Grids' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'Call to Actions' },
  ];

  const filteredBlocks = ELEMENTOR_BLOCKS.filter((b) =>
    selectedCategory === 'all' ? true : b.category === selectedCategory
  );

  return (
    <div className="flex flex-col w-full px-4 py-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center mb-6 animate-hero-heading">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] mb-2 hover:bg-[#cbdbf5] transition-colors cursor-default">
          <span className="material-symbols-outlined text-[16px] text-[#0051d5]">extension</span>
          <span className="font-label-sm text-xs">Modular Pattern Library</span>
        </div>
        <h1 className="font-headline-lg-mobile text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
          Gutenberg & Elementor Blocks
        </h1>
        <p className="font-body-sm text-xs sm:text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
          Mix-and-match decoupled section patterns with zero vendor lock-in. Copy Gutenberg JSON or Elementor shortcodes instantly.
        </p>
      </div>

      {/* Categories Filter */}
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

      {/* Blocks List with Card Hover Lift */}
      <div className="flex flex-col gap-4 max-w-xl mx-auto w-full mb-8">
        {filteredBlocks.map((block) => (
          <div
            key={block.id}
            className="p-5 rounded-2xl bg-white shadow-sm card-hover-lift flex flex-col justify-between border border-[#eff4ff] group"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-wider bg-[#eff4ff] px-2 py-0.5 rounded-full group-hover:bg-[#0051d5] group-hover:text-white transition-colors">
                  {block.categoryLabel}
                </span>
                <span className="text-xs text-[#009668] flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>FSE 6.7 Ready</span>
                </span>
              </div>

              <h3 className="font-title-lg text-base font-bold text-[#0b1c30] mb-1 group-hover:text-[#0051d5] transition-colors">
                {block.title}
              </h3>
              <p className="font-body-sm text-xs text-[#45464d] mb-3 leading-relaxed">
                {block.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {block.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-[#45464d] bg-[#f8f9ff] px-2 py-0.5 rounded border border-[#e5eeff] group-hover:border-[#dce9ff] transition-colors"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#eff4ff]">
              <button
                onClick={() => setInspectedBlock(block)}
                className="flex-1 h-10 rounded-xl bg-[#e5eeff] text-[#0051d5] font-label-md text-xs font-bold hover:bg-[#dce9ff] flex items-center justify-center gap-1 btn-interactive"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>Inspect Code</span>
              </button>
              <button
                onClick={() => onCopySnippet(block.shortcode, `${block.title} shortcode`)}
                className="flex-1 h-10 rounded-xl bg-[#0051d5] text-white font-label-md text-xs font-bold hover:bg-[#316bf3] shadow-sm flex items-center justify-center gap-1 btn-interactive"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span>Copy Shortcode</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Code Inspector Modal */}
      {inspectedBlock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl relative border border-[#e5eeff] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5]">code</span>
                <h4 className="font-title-md text-sm sm:text-base font-bold text-[#0b1c30]">
                  {inspectedBlock.title}
                </h4>
              </div>
              <button
                onClick={() => setInspectedBlock(null)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] hover:rotate-90 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30] mb-1">
                  <span>Gutenberg Block HTML / Comments:</span>
                  <button
                    onClick={() => onCopySnippet(inspectedBlock.codeSnippet, 'Gutenberg Block')}
                    className="text-[#0051d5] text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy JSON</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#131b2e] text-[#eff4ff] text-xs font-mono rounded-xl overflow-x-auto max-h-36">
                  {inspectedBlock.codeSnippet}
                </pre>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30] mb-1">
                  <span>Elementor Shortcode Equivalent:</span>
                  <button
                    onClick={() => onCopySnippet(inspectedBlock.shortcode, 'Shortcode')}
                    className="text-[#0051d5] text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#f8f9ff] text-[#0b1c30] border border-[#e5eeff] text-xs font-mono rounded-xl overflow-x-auto">
                  {inspectedBlock.shortcode}
                </pre>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex justify-end">
              <button
                onClick={() => setInspectedBlock(null)}
                className="px-4 py-2 bg-[#0051d5] text-white rounded-xl text-xs font-semibold hover:bg-[#316bf3] btn-interactive"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
