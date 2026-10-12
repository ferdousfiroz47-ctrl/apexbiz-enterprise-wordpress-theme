import React, { useState } from 'react';
import { StarterTemplate } from '../types';

interface TemplatePreviewModalProps {
  template: StarterTemplate | null;
  onClose: () => void;
  onImport: (template: StarterTemplate) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
  onImport
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Top Controller Bar */}
      <div className="bg-[#131b2e] text-white px-4 py-2.5 rounded-2xl flex items-center justify-between max-w-4xl w-full mx-auto shadow-2xl border border-white/10 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#6ffbbe] uppercase tracking-wider hidden sm:inline">
            Live Preview
          </span>
          <h3 className="font-bold text-sm text-white truncate max-w-[200px]">
            {template.title}
          </h3>
        </div>

        {/* Device Viewport switchers */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl">
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
              deviceView === 'mobile' ? 'bg-[#0051d5] text-white' : 'text-[#7c839b] hover:text-white'
            }`}
            title="Mobile Viewport"
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span className="hidden sm:inline">390px</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
              deviceView === 'tablet' ? 'bg-[#0051d5] text-white' : 'text-[#7c839b] hover:text-white'
            }`}
            title="Tablet Viewport"
          >
            <span className="material-symbols-outlined text-[16px]">tablet</span>
            <span className="hidden sm:inline">768px</span>
          </button>
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
              deviceView === 'desktop' ? 'bg-[#0051d5] text-white' : 'text-[#7c839b] hover:text-white'
            }`}
            title="Desktop Viewport"
          >
            <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
            <span className="hidden sm:inline">1440px</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onClose();
              onImport(template);
            }}
            className="px-3 py-1.5 bg-[#0051d5] text-white rounded-xl text-xs font-bold hover:bg-[#316bf3] flex items-center gap-1 active:scale-95 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">cloud_download</span>
            <span>Import Demo</span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Simulated Device Frame */}
      <div className="flex-1 flex items-center justify-center overflow-hidden w-full">
        <div
          className={`h-full max-h-[82vh] bg-white rounded-2xl shadow-2xl overflow-y-auto border-4 border-[#131b2e] transition-all duration-300 flex flex-col ${
            deviceView === 'mobile'
              ? 'w-full max-w-[390px]'
              : deviceView === 'tablet'
              ? 'w-full max-w-[720px]'
              : 'w-full max-w-[1100px]'
          }`}
        >
          {/* Mock Browser Header */}
          <div className="bg-[#eff4ff] px-3 py-2 border-b border-[#e5eeff] flex items-center justify-between text-xs text-[#76777d] shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="font-mono text-[11px] bg-white px-3 py-0.5 rounded-md border border-[#e5eeff]">
              https://demo.apexbiz-theme.wp/{template.id}
            </span>
            <span className="material-symbols-outlined text-[16px]">refresh</span>
          </div>

          {/* Simulated Page Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="relative">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-white space-y-4">
                <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wider">
                  {template.categoryLabel} Demo Architecture
                </span>
                <h2 className="text-xl font-bold text-[#0b1c30]">{template.title}</h2>
                <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                  {template.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#eff4ff] rounded-xl">
                  <div>
                    <span className="text-[10px] text-[#76777d] block">Pre-built Layouts</span>
                    <strong className="text-xs text-[#0b1c30]">{template.pagesCount} Pages</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#76777d] block">Client Rating</span>
                    <strong className="text-xs text-[#0051d5]">★ {template.rating} / 5.0</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#76777d] block">Total Imports</span>
                    <strong className="text-xs text-[#0b1c30]">{template.downloads}</strong>
                  </div>
                </div>

                <div className="p-4 bg-[#131b2e] text-white rounded-xl text-center space-y-2">
                  <h3 className="font-bold text-sm">Ready to use this layout?</h3>
                  <p className="text-xs text-[#7c839b]">
                    Importing takes under 30 seconds with 1-click database synchronization.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onImport(template);
                    }}
                    className="px-6 py-2 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-lg text-xs font-bold inline-block"
                  >
                    Import {template.title} Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
