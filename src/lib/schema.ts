import type { Locale } from '@/lib/i18n';

const SITE_URL = (import.meta.env.SITE || import.meta.env.SITE_URL || 'https://dajilin.net').replace(/\/$/, '');
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const languageTagMap: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
};

/** Social media profiles for sameAs */
const socialProfiles = [
  'https://weibo.com/dajilin',
  'https://www.xiaohongshu.com/dajilin',
  'https://www.douyin.com/dajilin',
];

const orgDescriptionMap: Record<Locale, string> = {
  zh: '吉林文旅资源整合与内容引流平台，聚焦目的地、工业研学、331国道与官方服务说明。',
  en: 'A Jilin travel portal focused on destinations, study tours, Route 331, official services, and AI guidance.',
  ja: '目的地・産業研修・331国道・公式サービス・AIガイドを中心とした吉林観光ポータル。',
  ko: '목적지, 산업 연수, 331 국도, 공식 서비스, AI 가이드를 중심으로 하는 지린 관광 포털입니다.',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'dajilin.net',
  url: SITE_URL,
  description: orgDescriptionMap.zh,
  areaServed: 'CN',
  logo: `${SITE_URL}/images/logo.svg`,
  telephone: process.env.CONTACT_PHONE || '+86-431-950-0000',
  email: 'info@dajilin.net',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressRegion: '吉林省',
    addressCity: '长春市',
    streetAddress: '人民大街若干号',
  },
  sameAs: socialProfiles,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@dajilin.net',
    telephone: process.env.CONTACT_PHONE || '+86-431-950-0000',
    contactType: 'customer service',
    availableLanguage: ['Chinese', 'English', 'Japanese', 'Korean'],
  },
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'dajilin.net',
  publisher: {
    '@id': ORG_ID,
  },
  inLanguage: languageTagMap.zh,
};

export const buildOrganizationSchema = (locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'dajilin.net',
  url: SITE_URL,
  description: orgDescriptionMap[locale],
  areaServed: 'CN',
});

export const buildWebSiteSchema = (locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'dajilin.net',
  publisher: {
    '@id': ORG_ID,
  },
  inLanguage: languageTagMap[locale],
});

export const buildWebPageSchema = (pathname: string, name: string, description: string, locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}${pathname}#webpage`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
  about: {
    '@id': ORG_ID,
  },
});

export const buildCollectionPageSchema = (pathname: string, name: string, description: string, locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${pathname}#collection`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
});

export type TouristDestinationOptions = {
  addressLocality?: string;
  addressRegion?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
};

export const buildTouristDestinationSchema = (
  pathname: string,
  name: string,
  description: string,
  locale: Locale = 'zh',
  options: TouristDestinationOptions = {}
) => {
  const { addressLocality = '吉林省', addressRegion = '吉林省', latitude, longitude, image, rating, reviewCount } = options;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${SITE_URL}${pathname}#destination`,
    url: `${SITE_URL}${pathname}`,
    name,
    description,
    inLanguage: languageTagMap[locale],
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality,
      addressRegion,
      addressCountry: 'CN',
    },
  };

  if (latitude !== undefined && longitude !== undefined) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    };
  }

  if (image) {
    schema.image = image;
  }

  if (rating !== undefined) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount ?? 1,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
};

export const buildTouristTripSchema = (pathname: string, name: string, description: string, locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  '@id': `${SITE_URL}${pathname}#trip`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
});

export type HowToStep = {
  name: string;
  text: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const buildHowToSchema = (
  pathname: string,
  name: string,
  description: string,
  steps: HowToStep[],
  locale: Locale = 'zh'
) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}${pathname}#howto`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
  about: {
    '@id': ORG_ID,
  },
  step: steps.map((step) => ({
    '@type': 'HowToStep',
    name: step.name,
    text: step.text,
  })),
});

export const buildFAQPageSchema = (
  pathname: string,
  name: string,
  faqs: FAQItem[],
  locale: Locale = 'zh'
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}${pathname}#faq`,
  url: `${SITE_URL}${pathname}`,
  name,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const buildArticleSchema = (
  pathname: string,
  name: string,
  description: string,
  authorName: string = 'dajilin.net',
  datePublished: string = new Date().toISOString().split('T')[0],
  locale: Locale = 'zh'
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${SITE_URL}${pathname}#article`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
  about: {
    '@id': ORG_ID,
  },
  author: {
    '@type': 'Organization',
    name: authorName,
    url: SITE_URL,
  },
  publisher: {
    '@id': ORG_ID,
  },
  datePublished,
  articleSection: 'Travel Guide',
  genre: 'Travel Guide',
});

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export const buildBreadcrumbListSchema = (pathname: string, items: BreadcrumbItem[], locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}${pathname}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
  })),
});

export const buildItemListSchema = (pathname: string, name: string, items: { url: string; name: string }[], locale: Locale = 'zh') => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}${pathname}#itemlist`,
  name,
  inLanguage: languageTagMap[locale],
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}${item.url}`,
    name: item.name,
  })),
});

export type LocalBusinessSchemaOptions = {
  category?: string;
  city?: string;
  region?: string;
  image?: string;
};

export const buildFoodBrandSchema = (
  pathname: string,
  name: string,
  description: string,
  locale: Locale = 'zh',
  options: LocalBusinessSchemaOptions = {}
) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}${pathname}#business`,
  url: `${SITE_URL}${pathname}`,
  name,
  description,
  inLanguage: languageTagMap[locale],
  isPartOf: {
    '@id': WEBSITE_ID,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: options.city ?? '吉林省',
    addressRegion: options.region ?? '吉林省',
    addressCountry: 'CN',
  },
  additionalType: options.category,
  image: options.image,
});
