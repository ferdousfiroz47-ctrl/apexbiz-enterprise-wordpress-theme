import React from 'react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#e5eeff] p-5 my-auto">
        {/* Header Bar */}
        <div className="flex justify-between items-start gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#131b2e] text-white text-[11px] font-semibold">
                {caseStudy.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0051d5] text-[11px] font-bold">
                {caseStudy.badgeLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe]/30 text-[#009668] text-[11px] font-bold">
                {caseStudy.impactMetric}
              </span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-[#0b1c30]">
              {caseStudy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors shrink-0"
            aria-label="Close Case Study"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="h-52 w-full rounded-xl overflow-hidden relative mb-4 bg-slate-900">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent flex items-end p-3">
            <div className="text-white text-xs">
              <span className="font-semibold text-slate-300">Client: </span>
              <span>{caseStudy.client}</span>
              <span className="mx-2">•</span>
              <span className="text-[#6ffbbe]">{caseStudy.timeline}</span>
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="space-y-4 text-sm text-[#0b1c30]">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#0051d5] mb-1">
              Executive Summary
            </h4>
            <p className="text-[#45464d] leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#eff4ff] rounded-xl">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#ba1a1a] mb-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>The Challenge</span>
              </div>
              <p className="text-xs text-[#45464d] leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#009668] mb-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>The Architecture</span>
              </div>
              <p className="text-xs text-[#45464d] leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#0051d5] mb-2">
              Measurable Business Results
            </h4>
            <div className="space-y-2">
              {caseStudy.results.map((res, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-[18px] text-[#0051d5] shrink-0 mt-0.5">
                    verified
                  </span>
                  <span className="text-xs text-[#0b1c30] font-medium leading-relaxed">
                    {res}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="mt-5 pt-3 border-t border-[#eff4ff] flex items-center justify-between">
          <span className="text-xs text-[#45464d]">Built with ApexBiz Theme Blocks</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0051d5] text-white rounded-lg text-xs font-semibold hover:bg-[#316bf3] active:scale-95 transition-all"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
