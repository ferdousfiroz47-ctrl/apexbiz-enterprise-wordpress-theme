import React from 'react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const logs = [
    {
      version: 'v6.7.2 (Latest Release)',
      date: 'October 2026',
      badge: 'WP 6.7 Ready',
      changes: [
        'Full compatibility validation with WordPress 6.7 core block editor and Inter font provider',
        'Added 6 new Gutenberg pattern presets for enterprise SaaS telemetry widgets',
        'Performance enhancement: reduced cumulative layout shift (CLS) to 0.002',
        'Updated WooCommerce 9.4 template files and cart block layouts',
        'Integrated automated license renewal reminders inside WP admin dashboard'
      ]
    },
    {
      version: 'v6.7.0',
      date: 'September 2026',
      badge: 'Major FSE Update',
      changes: [
        'Complete Full Site Editing (FSE) block theme architectural restructure',
        'New Global Style Manager panel supporting live token switching',
        'Introduced 12 corporate starter templates for Fintech and Healthcare',
        'Built-in support for WebP and AVIF image compression'
      ]
    },
    {
      version: 'v6.6.5',
      date: 'August 2026',
      badge: 'Performance Patch',
      changes: [
        'Asset minification overhaul: JavaScript payload reduced by 34%',
        'Fixed WPML language switcher dropdown accessibility in dark mode',
        'PHP 8.2 and 8.3 strict deprecation notices resolved'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl relative border border-[#e5eeff] p-5 my-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5]">history</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              ApexBiz Release Changelog
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4">
          {logs.map((log, idx) => (
            <div key={idx} className="p-3.5 bg-[#f8f9ff] border border-[#e5eeff] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#0b1c30]">{log.version}</span>
                  <span className="text-[10px] text-[#009668] bg-[#6ffbbe]/30 px-1.5 py-0.5 rounded font-bold">
                    {log.badge}
                  </span>
                </div>
                <span className="text-[11px] text-[#45464d]">{log.date}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#45464d]">
                {log.changes.map((change, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#0051d5] shrink-0 mt-0.5">
                      check
                    </span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#eff4ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0051d5] text-white rounded-xl text-xs font-semibold hover:bg-[#316bf3]"
          >
            Close Changelog
          </button>
        </div>
      </div>
    </div>
  );
};
