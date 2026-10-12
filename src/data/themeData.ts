import { CaseStudy, StarterTemplate, ElementorBlock, PricingPlan } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UUhxmdgXdQMoUQYYA6hMZK6jlm6gBAImaVD7ng3uW25_ua3-2--iSuE6CmqE22KVPXw9ev45z7gf6y4n5mi5VdqlGFq3u3iDIxSyqs5wh9SUx8ifZRvq5HlxKDFJRpmKEM8yg9BNSXkpmJQbI33Vd7EI5xr0PJH0qC3CbJ1VK_ArewRur3sJmY6tHy8hf15MdzKdaRfS1ACmMe6q0EqSQxs-3LPAvN8HfYsHXlN6h_2dI2iQhFOia942k',
  dashboardPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgDjZuBCitD5c38JkQkRQgFnhyYGGffWVhdiDlw8TUX_60mbJrhlay1_U_OBRcxu9VU-71aetBzvVK0RR-ds0X3wVsggHIun2wqaIOTC38v9Lood6X85GNnaXIAR2ZSdrdMA8wzRTWdsFtR7kObDSue5RLiFC3fukMboW1Qj4cEBFA4pXRFQqwwMeGkqPAQzvVLos-J8Unv5NJ2VGuReCovrOOzLajOodzSK0XGpmBEh_gDoex3UKg',
  teamConference: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtxa0i94ZJMFW5LEKXeNcbo_tWrU22EhpxRvR343Va4a_2g5vEqJxdgHXEjWa61cnY69OzKOD6n1UthsSXSgcxXUj1cWa8Fo6M2OikIU62ZQ15lI_gvvcaHtTV-0sDeNYR30bAeaaivtVPRNScrOO90SWSiXS4RUs6MIRpr8OooYyxnlt8kBwMBlRMEg-kiwnReo-J3JbnUo1P4xd-Ra-y7qBsus0D517QIBsaZo__-4v5OjE_JkiJ',
  marcusVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh_DvxL_VPy72mYAkGHJ5d9cMJ0JYx72ZuD-drE70gha9yT4Mwb4_Zq6GrVNGmEi62ab-tugIc5HEklIHFyZFvYlYeLIIR-bp997UBxfEwInE1zbqu5L3CZEzM5Lp8bYsSDeDBdtnHQbV2RBj-17FjXxEOCrR9JJQFzwhM2o2injPJKakqUBY8dJIJ0BwhX93207cpBvxj2NgS_C2hjn7V8TOnK4e4T27V7nmtIKy_iXcReCiqlmwg',
  finflowMockup: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRL2zebyFPzibtqAx5rddrlDo2o8Wl_5INJyWGq5yOE2SHzCBR_ia8RQzzISlk8TItmNdFgr9i69ckMuAbDaHB1ilDjktpCGrfiQ0irk_JewU1D_sVcyR6CNYPX7MI21qetEbjhZrQzfbIjMXdfyDWnkAdx0rr7eLjMtRKfVsD7YaDRZr1f8HB3MYFmfQPEksbdrZV_fQVHiNxB69GettfXe0EjWf0iUW1fLg7M4hJDHBkbvkdMaBu',
  medisyncMockup: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjXmaaycXkixAaCWlIn-MfNiZlCJxVmhgJHpvXov3KIZAtQ3F7orjDp1pqs2kCPfr33uC0Of-R0C-WSr_-tlZgBif7GcMNXnVKFS3XEaljC2wE7j_fFV70D0flppItj7TB8NaBMLCRruesbpy8OFF9EJmFl8ze74sM7mwPMn68_HVXIcn_wGeGZAXd4Si-6xreBZ9kX4i6B9tCQ2e8sYMnQtQG0E_Oa4Hc56vrRkqoSTtRQft6uhSW',
  omnichainMockup: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj0nB7Zk_WPi55AR6GvLa-puI0v_sqsm3PqZVJ5Zv7jNsYf7kJSA-Diaj_K9Kl4i1NGKhPkdKtMMuBFs4W5eQ9iT9g41NhIUEt45uTo9Nlhpbs-4_4WTyrZffDVlVec2H0nQgUranVhG3YMWJBrbG-nu7_q9oZcKD3cBW2AKkKzhC5-RtVEOFF0den-FyeIGA87EG0O6EKbKEb2RkycIzPmWO5DIgAWOln4lIe31PdOGtZQi5_N89O',
  elenaRostova: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Xg_YlVHvNreckzxOGv2XWrS1XaNUx4qze2C5dFkKQaflA-Xz4NUIeUuRkR_kiyfOc3bASxamH7MJcSfjSCPdcePAT6G_WUMVzX_n2UXuwT_M-WRJVjnyhQo3qPshc3LDFoUU44NvjctqIyxwgLXlz2SRYOYJg_fRMlYJcuzEi-kWzWfOgKPY9ZpxJFKZIrmrRm2hElIQ8qH313zJdtOiBO6rg4a5Mv4Usslz442JiyPIsjxCt5se',
  davidChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhiL2o78ED7g7yame0OlrklwJqC-HLfUNQmLLPIM_PAI_2m_qwx_zO4cxpTt39YIK4iZOwmWajF856E7SFWK57iULLDxIOY6AMPbmBlxBLDWWggCCrIcWzeU-RfhUqcggnMrVu6O470DTyTW2QLkLBfEFK730BS06syO_YaqeZaE1yfj_u0g2RNvzWG0tayxdbojXjiBjJNIPiMuAaST7uTo_cnVLiu9Rf5s4AByfhCuo5gH7mWu-q',
  videoThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO2kH04V44EZkwUlrNIRHuX0dw1K0vUB2KmOyqE05lVbgwZV9EOEMbjUAbmOe82zSXxtWq7H-Ubs_XJ29k-IDsD-JyeeV8PzQhZKUp402aapNROEXTam4rFw2CpYvE5HqlItLd33RczwyC0kzkC0jhKhpT9TIdb04zDZro21kXNlnpK5JLdi0m8UikLvFvPZZHeUu2YoLOZiydK89Z9kgqbAVywYCJ8Lxh8rlophCCSGSVZARkjDnU'
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'finflow',
    category: 'fintech',
    categoryLabel: 'Fintech',
    badgeLabel: 'Mobile UX',
    title: 'FinFlow Global Banking',
    impactMetric: '+340% Onboarding',
    description: 'Complete overhaul of enterprise mobile onboarding flow resulting in rapid digital account origination across 14 European markets.',
    image: ASSETS.finflowMockup,
    challenge: 'FinFlow legacy customer acquisition had a 68% drop-off rate during KYC identity verification due to slow server roundtrips.',
    solution: 'Engineered an asynchronous, biometric-verified 4-step wizard using native Gutenberg blocks and edge caching.',
    results: [
      '+340% increase in completed onboardings within 60 days',
      'Average verification time dropped from 7 minutes to 48 seconds',
      'Seamless compliance across 14 distinct regulatory jurisdictions'
    ],
    client: 'FinFlow AG (Zurich & Frankfurt)',
    timeline: '6 weeks sprint delivery'
  },
  {
    id: 'medisync',
    category: 'health',
    categoryLabel: 'Healthcare',
    badgeLabel: 'Cloud',
    title: 'MediSync Health Cloud',
    impactMetric: '2M+ Records',
    description: 'HIPAA-compliant distributed records system handling over 2M+ active patient tele-consultations with sub-second retrieval speeds.',
    image: ASSETS.medisyncMockup,
    challenge: 'High latency and fragmented medical histories across 120 clinic nodes caused friction during critical tele-doctor appointments.',
    solution: 'Implemented zero-trust edge APIs and decoupled headless WordPress patient portal templates.',
    results: [
      'Over 2,150,000 active patient files synced securely',
      'Zero downtime over 18 months of continuous operational uptime',
      'Fully audited and certified under SOC2 Type II and HIPAA'
    ],
    client: 'MediSync Health Network (Boston)',
    timeline: '8 weeks sprint delivery'
  },
  {
    id: 'omnichain',
    category: 'saas',
    categoryLabel: 'Supply Chain',
    badgeLabel: 'AI/ML',
    title: 'OmniChain Logistics AI',
    impactMetric: '-28% Freight Cost',
    description: 'Predictive route dispatch algorithms integrated directly into legacy ERP systems, driving measurable fuel and dispatch efficiency.',
    image: ASSETS.omnichainMockup,
    challenge: 'Unpredictable port congestions and static container dispatching generated $4.2M in annual demurrage and idle driver penalties.',
    solution: 'Designed an interactive real-time dispatch dashboard with telemetry widgets and automated load allocation.',
    results: [
      '28.4% reduction in net overland freight transport expenses',
      'Real-time tracking telemetry across 45,000 active freight haulers',
      'Saved an estimated 1,200 metric tons of carbon emissions in year one'
    ],
    client: 'OmniChain Global Freight (Singapore & Rotterdam)',
    timeline: '5 weeks sprint delivery'
  }
];

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'corporate-main',
    title: 'Corporate Flagship',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description: 'The ultimate enterprise portal with high-impact hero architecture, executive bios, case studies, and investor relations.',
    image: ASSETS.dashboardPreview,
    pagesCount: 14,
    rating: 4.9,
    downloads: '8,420',
    compatibility: 'WP 6.7 · Gutenberg · Elementor Pro',
    featured: true
  },
  {
    id: 'finflow-portal',
    title: 'FinTech Capital & Banking',
    category: 'fintech',
    categoryLabel: 'Fintech',
    description: 'Tailored for wealth management firms, neobanks, and crypto asset platforms with live financial widgets.',
    image: ASSETS.finflowMockup,
    pagesCount: 11,
    rating: 4.95,
    downloads: '5,180',
    compatibility: 'WP 6.7 · FSE · ACF Pro',
    featured: true
  },
  {
    id: 'saas-venture',
    title: 'SaaS & Venture Scale',
    category: 'saas',
    categoryLabel: 'SaaS',
    description: 'High-conversion product landing pages with interactive pricing sliders, feature tabs, and telemetry mockups.',
    image: ASSETS.omnichainMockup,
    pagesCount: 12,
    rating: 4.88,
    downloads: '6,920',
    compatibility: 'WP 6.7 · Elementor Pro · Blocks',
    featured: true
  },
  {
    id: 'medisync-portal',
    title: 'HealthTech & Clinics',
    category: 'health',
    categoryLabel: 'Healthcare',
    description: 'HIPAA-ready clinical layout with appointment booking modal, doctor directories, and patient portal styling.',
    image: ASSETS.medisyncMockup,
    pagesCount: 9,
    rating: 4.92,
    downloads: '3,840',
    compatibility: 'WP 6.7 · WooCommerce · FSE'
  },
  {
    id: 'consulting-pro',
    title: 'Strategic Advisory & M&A',
    category: 'consulting',
    categoryLabel: 'Consulting',
    description: 'Authoritative, polished design for strategy consultancies, legal firms, and corporate restructuring partners.',
    image: ASSETS.teamConference,
    pagesCount: 10,
    rating: 4.91,
    downloads: '4,100',
    compatibility: 'WP 6.7 · Gutenberg · WPML'
  },
  {
    id: 'agency-showcase',
    title: 'Digital Studio & Agency',
    category: 'agency',
    categoryLabel: 'Agency',
    description: 'Showcase immersive case studies, design systems, client reels, and award collections with smooth transitions.',
    image: ASSETS.videoThumb,
    pagesCount: 8,
    rating: 4.87,
    downloads: '4,650',
    compatibility: 'WP 6.7 · Motion Ready · Elementor'
  }
];

export const ELEMENTOR_BLOCKS: ElementorBlock[] = [
  {
    id: 'hero-metric-split',
    title: 'Hero Split with Live KPI Dials',
    category: 'hero',
    categoryLabel: 'Hero Sections',
    description: 'Dual-column layout with magnetic CTA buttons, background glass container, and live animated KPI metric card.',
    previewImage: ASSETS.dashboardPreview,
    codeSnippet: `<!-- wp:apexbiz/hero-split {"heading":"Scale Your Business","highlight":"High-Performance"} -->\n<div class="apexbiz-hero-split">\n  <h1>Scale Your Business With High-Performance Web Architecture</h1>\n  <div class="apexbiz-cta-group">\n    <a href="#demos" class="btn-primary">Explore Demos</a>\n  </div>\n</div>\n<!-- /wp:apexbiz/hero-split -->`,
    shortcode: `[apexbiz_hero style="glass_split" cta_text="Explore Demos" speed_score="99.8%"]`,
    features: ['Responsive 1440px / Mobile', 'Zero runtime bloat', 'Custom color tokens']
  },
  {
    id: 'stats-proof-strip',
    title: 'Executive Proof Metrics Strip',
    category: 'stats',
    categoryLabel: 'Stats & KPIs',
    description: '3-card horizontal grid with ThemeForest rating, active installs counter, and guaranteed 24/7 SLA badge.',
    previewImage: ASSETS.dashboardPreview,
    codeSnippet: `<!-- wp:apexbiz/metrics-strip -->\n<div class="apexbiz-stats-grid">\n  <div class="stat-item"><span class="val">4.9/5</span><span class="lbl">ThemeForest</span></div>\n  <div class="stat-item"><span class="val">18.5k+</span><span class="lbl">Installs</span></div>\n  <div class="stat-item"><span class="val">24/7</span><span class="lbl">SLA</span></div>\n</div>\n<!-- /wp:apexbiz/metrics-strip -->`,
    shortcode: `[apexbiz_metrics rating="4.9" installs="18500" sla="24/7"]`,
    features: ['Tabular numerals font', 'Glass background', 'Subtle border styling']
  },
  {
    id: 'pricing-toggle-table',
    title: 'Annual / Lifetime Pricing Matrix',
    category: 'pricing',
    categoryLabel: 'Pricing Tables',
    description: '3-tier pricing comparison with interactive billing toggle, featured tier badge, and checked feature checklists.',
    codeSnippet: `<!-- wp:apexbiz/pricing-table {"billing":"annual"} -->\n<div class="apexbiz-pricing-table">\n  <!-- Starter, Agency Pro, Enterprise -->\n</div>\n<!-- /wp:apexbiz/pricing-table -->`,
    shortcode: `[apexbiz_pricing tiers="starter,agency,enterprise" toggle="annual,lifetime"]`,
    features: ['Discount calculation logic', 'Stripe & WooCommerce ready', 'Highlighted popular tier']
  },
  {
    id: 'case-study-showcase',
    title: 'Dynamic Portfolio & Filter Grid',
    category: 'services',
    categoryLabel: 'Portfolios',
    description: 'Category filter bar with instant client-side card filtering, high-contrast imagery, and impact metric tags.',
    previewImage: ASSETS.finflowMockup,
    codeSnippet: `<!-- wp:apexbiz/portfolio-grid {"categories":["fintech","saas","health"]} -->\n<div class="apexbiz-portfolio">...</div>\n<!-- /wp:apexbiz/portfolio-grid -->`,
    shortcode: `[apexbiz_portfolio limit="6" filter="true"]`,
    features: ['Instant category filter', 'Lightbox preview ready', 'Custom metadata tags']
  },
  {
    id: 'partner-quote-card',
    title: 'Leadership Quote & Credibility Card',
    category: 'testimonials',
    categoryLabel: 'Testimonials',
    description: 'Executive headshot avatar, italicized enterprise leadership quote, partner credentials, and verified badge.',
    previewImage: ASSETS.marcusVance,
    codeSnippet: `<!-- wp:apexbiz/quote-card author="Marcus Vance" -->\n<blockquote class="apexbiz-quote">...</blockquote>\n<!-- /wp:apexbiz/quote-card -->`,
    shortcode: `[apexbiz_quote name="Marcus Vance" title="Managing Partner" avatar="url"]`,
    features: ['ISO 27001 verified tag', 'High-res avatar clipping', 'Fluid editorial typography']
  },
  {
    id: 'footer-marketplace-banner',
    title: 'High-Conversion Marketplace Banner',
    category: 'cta',
    categoryLabel: 'Call To Actions',
    description: 'Dark blue primary container with animated glowing radial gradients, cart icon button, and guarantee footnote.',
    codeSnippet: `<!-- wp:apexbiz/cta-banner price="59" -->\n<div class="apexbiz-cta-banner">...</div>\n<!-- /wp:apexbiz/cta-banner -->`,
    shortcode: `[apexbiz_cta title="Ready to Build?" price="$59" button="Get ApexBiz Now"]`,
    features: ['Ambient glow background', 'Cart integration', 'Trust guarantee footnote']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'single',
    name: 'Single License',
    badge: 'Standard',
    tagline: 'Perfect for single business websites or founder portfolios.',
    annualPrice: 49,
    lifetimePrice: 99,
    features: [
      { name: '1 Production Domain', included: true },
      { name: 'All 90+ Business Layouts', included: true },
      { name: '6 Months Standard Support', included: true },
      { name: 'Elementor Pro Templates', included: false },
      { name: 'White-Label Branding Rights', included: false }
    ],
    buttonText: 'Get Starter Plan'
  },
  {
    id: 'agency',
    name: 'Agency & Pro',
    badge: 'Recommended',
    recommended: true,
    tagline: 'Unlimited scale for ambitious agencies, developers, and studios.',
    annualPrice: 89,
    lifetimePrice: 179,
    features: [
      { name: 'Unlimited Production Websites', included: true, bold: true },
      { name: 'Elementor Pro & Gutenberg Templates', included: true },
      { name: 'Lifetime Automatic Core Updates', included: true },
      { name: 'Priority 24/7 Slack & Ticket Desk', included: true },
      { name: 'Complete Child Theme Starter Pack', included: true }
    ],
    buttonText: 'Get Professional Access'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Elite',
    badge: 'Custom',
    tagline: 'Complete source repositories, white-label rights, and dedicated audit.',
    annualPrice: 199,
    lifetimePrice: 399,
    features: [
      { name: 'Everything in Professional Tier', included: true },
      { name: '1-on-1 WordPress Performance Audit', included: true },
      { name: 'White-Label Branding Rights', included: true },
      { name: 'Dedicated Solutions Engineer', included: true },
      { name: 'Custom SLA & Legal Review', included: true }
    ],
    buttonText: 'Contact Enterprise Team'
  }
];

export const FAQS = [
  {
    question: 'Is ApexBiz compatible with WordPress 6.7 and Gutenberg?',
    answer: 'Yes, absolutely. ApexBiz is engineered using 100% native WordPress Full Site Editing (FSE) block themes and modern block patterns. It has zero required external plugin dependencies to display pages exactly like the live demo.'
  },
  {
    question: 'Can I customize layouts without touching any code?',
    answer: 'Yes! With our integrated Global Style Manager, you can change brand color tokens, typography scales, spacing tokens, and header architectures via visual point-and-click panels in the Site Editor or Elementor panel.'
  },
  {
    question: 'What plugins are included and supported?',
    answer: 'The theme comes tested and bundled with certified integrations for WooCommerce, ACF Pro, Elementor & Elementor Pro, WP Rocket, RankMath SEO, and Contact Form 7.'
  },
  {
    question: 'How does theme support and update licensing work?',
    answer: 'Every purchase includes direct ThemeForest Envato token updates right inside your WordPress admin dashboard, plus direct ticket and forum support from our senior theme engineering staff.'
  },
  {
    question: 'Can I use ApexBiz for client projects?',
    answer: 'Yes! Our Agency & Pro license permits unlimited client production websites without additional license purchases. The Enterprise tier also grants full white-label distribution rights.'
  }
];
