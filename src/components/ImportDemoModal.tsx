import React, { useState, useEffect } from 'react';
import { StarterTemplate } from '../types';

interface ImportDemoModalProps {
  template: StarterTemplate | null;
  onClose: () => void;
  onSuccess: (templateName: string) => void;
}

export const ImportDemoModal: React.FC<ImportDemoModalProps> = ({
  template,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<number>(0);
  const [includeDummyPosts, setIncludeDummyPosts] = useState(true);
  const [includeWooCommerce, setIncludeWooCommerce] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isImporting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (template) {
              onSuccess(template.title);
            }
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isImporting, template, onSuccess]);

  if (!template) return null;

  const stepsList = [
    'Verifying WordPress 6.7 environment & memory limit (256MB+)',
    'Installing required Block Pattern modules & Elementor widgets',
    'Importing corporate layouts, menus, and typography presets',
    'Generating sample pages & Global Style Manager tokens',
    'Finalizing installation & optimizing local asset cache'
  ];

  const currentStepDescription = stepsList[Math.min(Math.floor(progress / 25), 4)];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl relative border border-[#e5eeff]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5]">cloud_download</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              1-Click Demo Importer
            </h3>
          </div>
          {!isImporting && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Selected Template Card */}
        <div className="flex items-center gap-3 p-3 bg-[#eff4ff] rounded-xl mb-4">
          <img
            src={template.image}
            alt={template.title}
            className="w-16 h-12 rounded-lg object-cover shrink-0"
          />
          <div>
            <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider block">
              {template.categoryLabel}
            </span>
            <h4 className="font-bold text-sm text-[#0b1c30]">{template.title}</h4>
            <span className="text-[11px] text-[#45464d]">{template.pagesCount} Pre-built Pages</span>
          </div>
        </div>

        {!isImporting ? (
          <div>
            <p className="text-xs text-[#45464d] mb-3 leading-relaxed">
              This will install the complete template kit into your WordPress instance without altering any existing database users or core settings.
            </p>

            <div className="space-y-2 mb-5">
              <label className="flex items-center gap-2 text-xs text-[#0b1c30] p-2 rounded-lg bg-[#f8f9ff] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDummyPosts}
                  onChange={(e) => setIncludeDummyPosts(e.target.checked)}
                  className="rounded text-[#0051d5]"
                />
                <span>Import starter demo posts & sample case studies</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#0b1c30] p-2 rounded-lg bg-[#f8f9ff] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWooCommerce}
                  onChange={(e) => setIncludeWooCommerce(e.target.checked)}
                  className="rounded text-[#0051d5]"
                />
                <span>Setup WooCommerce catalog & sample commerce products</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsImporting(true)}
                className="flex-1 h-11 rounded-xl bg-[#0051d5] text-white text-xs font-bold hover:bg-[#316bf3] shadow-md flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Start Import</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-3">
            <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30] mb-2">
              <span>Importing Demo Kit...</span>
              <span className="font-mono text-[#0051d5]">{progress}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#e5eeff] h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-[#0051d5] h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[#45464d] text-center min-h-[32px] animate-pulse">
              {currentStepDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
