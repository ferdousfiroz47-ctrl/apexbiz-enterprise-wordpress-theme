import React, { useState } from 'react';
import { ASSETS } from '../data/themeData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState('0:00');

  if (!isOpen) return null;

  const chapters = [
    { time: '0:00', title: 'Theme Overview & 0.4s Architecture' },
    { time: '1:15', title: 'FSE Gutenberg Block Patterns' },
    { time: '2:30', title: 'Elementor Pro Mega Menu Builder' },
    { time: '3:45', title: 'Global Style Manager & Color Tokens' },
    { time: '4:50', title: '1-Click Starter Template Import' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl relative border border-[#eff4ff]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5] animate-ping" />
            <h4 className="font-title-md text-[18px] font-bold text-[#0b1c30]">
              ApexBiz Theme Tour & Walkthrough
            </h4>
          </div>
          <button
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] transition-colors"
            aria-label="Close Tour"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="w-full h-56 rounded-xl overflow-hidden bg-[#131b2e] flex items-center justify-center relative group">
          <img
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-90' : 'opacity-70'
            }`}
            alt="Theme walkthrough preview"
            src={ASSETS.videoThumb}
          />

          {/* Overlays / Player */}
          {isPlaying ? (
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                <span className="font-mono">Streaming 4K HDR • {activeChapter}</span>
                <span className="text-[#4edea3]">● LIVE PREVIEW</span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="w-14 h-14 rounded-full bg-white/90 text-[#0051d5] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-[32px]">pause</span>
                </button>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0051d5] h-full w-2/3 animate-pulse" />
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-full bg-[#0051d5] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
              aria-label="Play tour video"
            >
              <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
            </button>
          )}
        </div>

        {/* Video Chapters */}
        <div className="mt-4">
          <p className="text-xs font-bold text-[#45464d] uppercase tracking-wider mb-2">
            Interactive Jump Chapters
          </p>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {chapters.map((ch) => (
              <button
                key={ch.time}
                onClick={() => {
                  setActiveChapter(ch.time);
                  setIsPlaying(true);
                }}
                className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                  activeChapter === ch.time
                    ? 'bg-[#e5eeff] text-[#0051d5] font-semibold'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="truncate pr-2">{ch.title}</span>
                <span className="font-mono text-[11px] opacity-75 shrink-0">{ch.time}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="font-caption text-xs text-[#45464d] mt-3 text-center">
          Full 4K walkthrough of block patterns, mega menus, and enterprise style settings.
        </p>
      </div>
    </div>
  );
};
