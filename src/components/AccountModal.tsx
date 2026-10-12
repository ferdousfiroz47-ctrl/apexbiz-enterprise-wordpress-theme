import React, { useState } from 'react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [verified, setVerified] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl relative border border-[#e5eeff]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5]">manage_accounts</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              License & Account
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* License status card */}
        <div className="p-3.5 bg-[#eff4ff] rounded-xl mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#0051d5]">Agency & Pro License</span>
            <span className="text-[10px] text-[#009668] bg-[#6ffbbe]/30 px-2 py-0.5 rounded-full font-bold">
              Active • Verified
            </span>
          </div>
          <p className="text-xs text-[#0b1c30] font-mono mb-1">ENVATO-APEX-7789-XQ</p>
          <div className="flex items-center gap-2 text-[11px] text-[#45464d]">
            <span>Active Domains: <strong>3 of Unlimited</strong></span>
            <span>•</span>
            <span>Support: <strong>Priority SLA</strong></span>
          </div>
        </div>

        {/* Connected domains */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-bold text-[#0b1c30] block">
            Connected Production Environments
          </label>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff] border border-[#e5eeff]">
              <span className="font-mono text-[#0b1c30]">https://demo.apexbiz-theme.wp</span>
              <span className="text-[#009668] text-[10px] font-bold">● Active</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff] border border-[#e5eeff]">
              <span className="font-mono text-[#0b1c30]">https://enterprise.finflow.eu</span>
              <span className="text-[#009668] text-[10px] font-bold">● Active</span>
            </div>
          </div>
        </div>

        {/* Envato API token update */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
            Update Envato Personal Token
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter 32-character Token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1 h-10 px-3 bg-[#f8f9ff] border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30]"
            />
            <button
              onClick={() => {
                if (tokenInput) {
                  alert('Token verified and saved for automated core updates.');
                  setTokenInput('');
                }
              }}
              className="px-3 h-10 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0051d5] text-xs font-bold rounded-xl"
            >
              Verify
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-[#eff4ff]">
          <button
            onClick={() => {
              onClose();
              onUpgrade();
            }}
            className="flex-1 h-11 bg-[#0051d5] text-white rounded-xl text-xs font-bold hover:bg-[#316bf3]"
          >
            Upgrade to Enterprise
          </button>
          <button
            onClick={onClose}
            className="px-4 h-11 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
