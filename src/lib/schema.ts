import type { Locale } from '@/lib/i18n';

const SITE_URL = import.meta.env.SITE || 'https://dajilin.net';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const languageTagMap: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
};

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

export const buildTouristDestinationSchema = (pathname: string, name: string, description: string, locale: Locale = 'zh') => ({
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
});

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
