import React, { useState } from 'react';
import { PRICING_PLANS, FAQS } from '../data/themeData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PricingScreenProps {
  onOpenCheckout: (planId: string, isLifetime: boolean) => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({ onOpenCheckout }) => {
  const [isLifetime, setIsLifetime] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useScrollReveal(isLifetime);

  const comparisonRows = [
    { feature: 'Production Domains', single: '1 Domain', agency: 'Unlimited', enterprise: 'Unlimited + Reseller' },
    { feature: '90+ Business Layouts', single: 'Included', agency: 'Included', enterprise: 'Included' },
    { feature: 'Elementor Pro Templates', single: '—', agency: 'Included', enterprise: 'Included' },
    { feature: 'Lifetime Core Updates', single: '1 Year', agency: 'Lifetime Automatic', enterprise: 'Lifetime Automatic' },
    { feature: 'Support SLA', single: '6 Months Email', agency: '24/7 Priority Ticket & Slack', enterprise: 'Dedicated Solutions Engineer' },
    { feature: 'Performance Audit', single: '—', agency: 'Checklist Included', enterprise: '1-on-1 Personalized Audit' },
    { feature: 'White-Label Branding', single: '—', agency: '—', enterprise: 'Full White-Label Rights' },
  ];

  return (
    <div className="flex flex-col w-full px-4 py-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center mb-6 animate-hero-heading">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] mb-2 hover:bg-[#cbdbf5] transition-colors cursor-default">
          <span className="material-symbols-outlined text-[16px] text-[#0051d5]">verified</span>
          <span className="font-label-sm text-xs">Official Envato Marketplace Licensing</span>
        </div>
        <h1 className="font-headline-lg-mobile text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
          Flexible Licensing for Every Scale
        </h1>
        <p className="font-body-sm text-xs sm:text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
          Choose between annual flexible renewals or one-time lifetime ownership with direct dashboard updates.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#e5eeff] shadow-inner mt-4 animate-hero-ctas">
          <button
            onClick={() => setIsLifetime(false)}
            className={`px-4 py-1.5 rounded-full font-label-sm text-xs transition-all ${
              !isLifetime
                ? 'bg-white text-[#0b1c30] shadow-sm font-bold scale-100'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            Annual <span className="text-[#0051d5] font-bold">(Save 20%)</span>
          </button>
          <button
            onClick={() => setIsLifetime(true)}
            className={`px-4 py-1.5 rounded-full font-label-sm text-xs transition-all ${
              isLifetime
                ? 'bg-white text-[#0b1c30] shadow-sm font-bold scale-100'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            Lifetime Ownership
          </button>
        </div>
      </div>

      {/* Pricing Cards with Card Hover Lift */}
      <div className="flex flex-col gap-6 max-w-xl mx-auto w-full mb-12">
        {PRICING_PLANS.map((plan) => {
          const price = isLifetime ? plan.lifetimePrice : plan.annualPrice;
          const isPop = plan.recommended;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl bg-white flex flex-col relative transition-all duration-300 card-hover-lift ${
                isPop
                  ? 'border-2 border-[#0051d5] shadow-xl'
                  : 'border border-[#eff4ff] shadow-sm'
              }`}
            >
              {isPop && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0051d5] text-white px-4 py-0.5 rounded-full font-label-sm text-[10px] shadow-md font-bold uppercase tracking-wider animate-pulse">
                  Recommended For Agencies
                </div>
              )}

              <div className="flex justify-between items-center mb-1">
                <h3 className="font-title-lg text-lg font-bold text-[#0b1c30]">{plan.name}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isPop ? 'bg-[#dbe1ff] text-[#0051d5]' : 'bg-[#e5eeff] text-[#0b1c30]'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              <p className="font-body-sm text-xs text-[#45464d] mb-4 leading-relaxed">{plan.tagline}</p>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-headline-lg-mobile text-3xl font-bold text-[#0b1c30]">
                  ${price}
                </span>
                <span className="font-caption text-xs text-[#45464d]">
                  {isLifetime ? 'one-time' : '/ year'}
                </span>
              </div>

              <ul className="flex flex-col gap-2 mb-6 font-body-sm text-xs sm:text-sm text-[#0b1c30]">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 ${
                      !feat.included ? 'text-[#76777d] opacity-60' : ''
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        feat.included ? 'text-[#0051d5]' : ''
                      }`}
                    >
                      {feat.included ? 'check' : 'close'}
                    </span>
                    <span className={feat.bold ? 'font-bold' : ''}>{feat.name}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenCheckout(plan.id, isLifetime)}
                className={`w-full h-12 rounded-xl font-label-md text-xs font-semibold shadow-md btn-interactive ${
                  isPop
                    ? 'bg-[#0051d5] hover:bg-[#316bf3] text-white'
                    : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e5eeff] max-w-2xl mx-auto w-full mb-12 overflow-x-auto card-hover-lift reveal-on-scroll">
        <h3 className="font-title-lg text-base font-bold text-[#0b1c30] mb-4 text-center">
          Detailed Feature Comparison
        </h3>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#e5eeff] text-[#76777d]">
              <th className="py-2.5 font-bold">Feature</th>
              <th className="py-2.5 font-bold">Single</th>
              <th className="py-2.5 font-bold text-[#0051d5]">Agency & Pro</th>
              <th className="py-2.5 font-bold">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff4ff]">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#f8f9ff] transition-colors">
                <td className="py-2.5 font-semibold text-[#0b1c30]">{row.feature}</td>
                <td className="py-2.5 text-[#45464d]">{row.single}</td>
                <td className="py-2.5 font-bold text-[#0051d5]">{row.agency}</td>
                <td className="py-2.5 text-[#45464d]">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <div className="bg-[#eff4ff] rounded-2xl p-6 border border-[#e5eeff] max-w-xl mx-auto w-full mb-6 reveal-on-scroll">
        <h3 className="font-title-lg text-base font-bold text-[#0b1c30] mb-4 text-center">
          Licensing FAQs
        </h3>
        <div className="space-y-2">
          {FAQS.slice(0, 3).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-[#e5eeff] transition-colors">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-[#0b1c30] hover:text-[#0051d5] transition-colors"
                >
                  <span className="pr-2">{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[18px] text-[#0051d5] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-[#45464d] leading-relaxed pt-1 border-t border-[#eff4ff] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
