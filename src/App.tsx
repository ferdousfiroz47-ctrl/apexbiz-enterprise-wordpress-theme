import { useState } from 'react';
import { TabType, CaseStudy, StarterTemplate } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { VideoModal } from './components/VideoModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ImportDemoModal } from './components/ImportDemoModal';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ChangelogModal } from './components/ChangelogModal';
import { AccountModal } from './components/AccountModal';
import { SliderCustomizerModal } from './components/SliderCustomizerModal';
import { DEFAULT_SLIDES, SlideItem, SliderSettings } from './components/HeroSlider';

import { OverviewScreen } from './screens/OverviewScreen';
import { TemplatesScreen } from './screens/TemplatesScreen';
import { FeaturesScreen } from './screens/FeaturesScreen';
import { BlocksScreen } from './screens/BlocksScreen';
import { PricingScreen } from './screens/PricingScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isDesktopView, setIsDesktopView] = useState(false);

  // Hero Slider State (Customizable via WordPress Customizer)
  const [slides, setSlides] = useState<SlideItem[]>(DEFAULT_SLIDES);
  const [sliderSettings, setSliderSettings] = useState<SliderSettings>({
    autoplayInterval: 5000,
    showArrows: true,
    showDots: true,
    overlayOpacity: 0.65,
    transitionMode: 'fade'
  });
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<StarterTemplate | null>(null);
  const [importingTemplate, setImportingTemplate] = useState<StarterTemplate | null>(null);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState('agency');
  const [checkoutIsLifetime, setCheckoutIsLifetime] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleOpenCheckout = (planId: string = 'agency', isLifetime: boolean = false) => {
    setCheckoutPlanId(planId);
    setCheckoutIsLifetime(isLifetime);
    setIsCheckoutOpen(true);
  };

  const handleCopySnippet = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans relative selection:bg-[#dbe1ff] selection:text-[#0051d5]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 border border-white/10">
          <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Quick Slider Settings Action */}
      <Header
        activeTab={activeTab}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        isDesktopView={isDesktopView}
        onToggleDesktopView={() => setIsDesktopView(!isDesktopView)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col pt-24 pb-28 w-full transition-all duration-300 ${
          isDesktopView
            ? 'max-w-6xl mx-auto px-4'
            : 'max-w-md mx-auto min-h-screen bg-[#f8f9ff] shadow-[0_0_50px_rgba(0,0,0,0.06)]'
        }`}
      >
        {activeTab === 'overview' && (
          <OverviewScreen
            onSelectTab={setActiveTab}
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onOpenCaseStudy={(cs) => setSelectedCaseStudy(cs)}
            onOpenCheckout={(planId, isLifetime) => handleOpenCheckout(planId, isLifetime)}
            onSubscribeNewsletter={(email) =>
              showToast(`Subscribed ${email} to theme patchnotes!`)
            }
            slides={slides}
            sliderSettings={sliderSettings}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}

        {activeTab === 'starter-templates' && (
          <TemplatesScreen
            onImportDemo={(tpl) => setImportingTemplate(tpl)}
            onPreviewTemplate={(tpl) => setPreviewTemplate(tpl)}
          />
        )}

        {activeTab === 'theme-features' && <FeaturesScreen />}

        {activeTab === 'elementor-blocks' && (
          <BlocksScreen onCopySnippet={handleCopySnippet} />
        )}

        {activeTab === 'pricing-license' && (
          <PricingScreen
            onOpenCheckout={(planId, isLifetime) => handleOpenCheckout(planId, isLifetime)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Interactive Modals */}
      <SliderCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        slides={slides}
        settings={sliderSettings}
        onUpdateSlides={(newSlides) => setSlides(newSlides)}
        onUpdateSettings={(newSettings) => setSliderSettings(newSettings)}
        onResetDefaults={() => {
          setSlides(DEFAULT_SLIDES);
          setSliderSettings({
            autoplayInterval: 5000,
            showArrows: true,
            showDots: true,
            overlayOpacity: 0.65,
            transitionMode: 'fade'
          });
          showToast('Reset slider to default enterprise business slides');
        }}
        onNotify={showToast}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onOpenCheckout={(planId) => handleOpenCheckout(planId || 'agency', false)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onImport={(tpl) => setImportingTemplate(tpl)}
      />

      <ImportDemoModal
        template={importingTemplate}
        onClose={() => setImportingTemplate(null)}
        onSuccess={(name) => {
          setImportingTemplate(null);
          showToast(`Demo "${name}" imported successfully!`);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlanId={checkoutPlanId}
        isLifetime={checkoutIsLifetime}
        onSuccess={() => showToast('Order completed! License key generated.')}
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onUpgrade={() => handleOpenCheckout('enterprise', true)}
      />
    </div>
  );
}
