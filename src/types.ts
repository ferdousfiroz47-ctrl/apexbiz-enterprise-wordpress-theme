export type TabType = 'overview' | 'starter-templates' | 'theme-features' | 'elementor-blocks' | 'pricing-license';

export interface CaseStudy {
  id: string;
  category: 'fintech' | 'saas' | 'health';
  categoryLabel: string;
  badgeLabel: string;
  title: string;
  impactMetric: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  client: string;
  timeline: string;
}

export interface StarterTemplate {
  id: string;
  title: string;
  category: 'corporate' | 'saas' | 'consulting' | 'fintech' | 'health' | 'agency';
  categoryLabel: string;
  description: string;
  image: string;
  pagesCount: number;
  rating: number;
  downloads: string;
  compatibility: string;
  featured?: boolean;
}

export interface ElementorBlock {
  id: string;
  title: string;
  category: 'hero' | 'stats' | 'pricing' | 'testimonials' | 'services' | 'cta';
  categoryLabel: string;
  description: string;
  previewImage?: string;
  codeSnippet: string;
  shortcode: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  recommended?: boolean;
  tagline: string;
  annualPrice: number;
  lifetimePrice: number;
  features: { name: string; included: boolean; bold?: boolean }[];
  buttonText: string;
}
