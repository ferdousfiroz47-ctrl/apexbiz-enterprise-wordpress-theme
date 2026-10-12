import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/themeData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: string;
  isLifetime: boolean;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId,
  isLifetime,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('company.com');
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const plan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];
  const price = isLifetime ? plan.lifetimePrice : plan.annualPrice;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedKey = `APEX-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setLicenseKey(generatedKey);
    setDownloadStarted(true);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl relative border border-[#e5eeff]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5]">shopping_bag</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0b1c30]">
              {licenseKey ? 'Order Confirmed!' : 'Theme Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!licenseKey ? (
          <form onSubmit={handlePurchase} className="space-y-4">
            {/* Selected Plan Summary */}
            <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0051d5] uppercase tracking-wide">
                  {plan.name}
                </span>
                <p className="text-xs text-[#45464d]">{isLifetime ? 'Lifetime License' : 'Annual Billing'}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-[#0b1c30]">${price}</span>
                <span className="text-[11px] text-[#45464d] block">
                  {isLifetime ? 'one-time' : '/ year'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                Your Work Email (For License Key delivery)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@enterprise.com"
                className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#0051d5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                Primary Production Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="mycompany.com"
                className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#e5eeff] rounded-xl text-xs text-[#0b1c30] focus:outline-none focus:border-[#0051d5]"
              />
            </div>

            {/* Payment simulation */}
            <div className="p-3 border border-[#e5eeff] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#45464d]">
                <span>Payment Method</span>
                <span className="font-semibold text-[#0b1c30]">Instant Card / Envato Pay</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#009668] bg-[#6ffbbe]/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>256-bit TLS Encrypted Checkout • 100% Money-back 30-Day Guarantee</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>Authorize & Complete Purchase (${price})</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-[#6ffbbe]/20 rounded-xl text-center">
              <span className="material-symbols-outlined text-[#009668] text-4xl mb-1">
                check_circle
              </span>
              <h4 className="font-bold text-sm text-[#0b1c30]">Thank you for purchasing ApexBiz!</h4>
              <p className="text-xs text-[#45464d] mt-1">
                Receipt and bundle download instructions sent to <strong>{email || 'your email'}</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                Your ApexBiz Activation License Key
              </label>
              <div className="flex items-center gap-2 p-3 bg-[#131b2e] text-[#6ffbbe] rounded-xl font-mono text-xs select-all justify-between">
                <span>{licenseKey}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(licenseKey)}
                  className="text-white hover:text-[#6ffbbe] text-[11px] flex items-center gap-1 font-sans"
                  title="Copy Key"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Simulated bundle download buttons */}
            <div className="space-y-2">
              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0051d5]">folder_zip</span>
                  <div>
                    <span className="text-xs font-bold text-[#0b1c30] block">
                      apexbiz-theme-v6.7.2.zip
                    </span>
                    <span className="text-[11px] text-[#45464d]">Full theme + child theme + demo data (14.2 MB)</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Download started: apexbiz-theme-v6.7.2.zip')}
                  className="px-3 py-1.5 bg-[#0051d5] text-white rounded-lg text-xs font-semibold hover:bg-[#316bf3]"
                >
                  Download
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full h-11 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-xl text-xs font-bold"
            >
              Done & Return to App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
