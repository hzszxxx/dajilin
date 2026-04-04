export type Locale = 'zh' | 'en' | 'ja' | 'ko';

export const defaultLocale: Locale = 'zh';
export const supportedLocales: Locale[] = ['zh', 'en', 'ja', 'ko'];

const localeLabelsByViewer: Record<Locale, Record<Locale, string>> = {
  zh: { zh: '中文', en: '英文', ja: '日文', ko: '韩文' },
  en: { zh: 'Chinese', en: 'English', ja: 'Japanese', ko: 'Korean' },
  ja: { zh: '中国語', en: '英語', ja: '日本語', ko: '韓国語' },
  ko: { zh: '중국어', en: '영어', ja: '일본어', ko: '한국어' },
};

const htmlLangMap: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
};

export const isSupportedLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale);

export const getLocaleFromPathname = (pathname: string): Locale => {
  const first = pathname.split('/').filter(Boolean)[0] || '';
  return isSupportedLocale(first) ? first : defaultLocale;
};

export const stripLocalePrefix = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLocale(segments[0])) {
    const next = `/${segments.slice(1).join('/')}`;
    return next === '/' ? '/' : next.replace(/\/$/, '') || '/';
  }
  return pathname === '' ? '/' : pathname;
};

export const localizePath = (pathname: string, locale: Locale): string => {
  const clean = stripLocalePrefix(pathname);
  if (locale === defaultLocale) {
    return clean;
  }
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
};

export const getLocaleLabel = (locale: Locale, viewerLocale: Locale = defaultLocale): string =>
  localeLabelsByViewer[viewerLocale][locale];

export const getHtmlLang = (locale: Locale): string => htmlLangMap[locale];

const headerTextMap: Record<Locale, { subtitle: string; badge: string }> = {
  zh: {
    subtitle: '吉林文旅资源入口',
    badge: 'GEO 优先 · AI 导览 · 内容引流',
  },
  en: {
    subtitle: 'Jilin Travel Portal',
    badge: 'GEO-first · AI Guide · Content Growth',
  },
  ja: {
    subtitle: '吉林観光ポータル',
    badge: 'GEO優先 · AIガイド · コンテンツ導線',
  },
  ko: {
    subtitle: '지린 관광 포털',
    badge: 'GEO 우선 · AI 가이드 · 콘텐츠 유입',
  },
};

const footerTextMap: Record<
  Locale,
  {
    brandSubtitle: string;
    tagline: string;
    destinationsTitle: string;
    destinationChangchun: string;
    destinationChangbaishan: string;
    destinationYanbian: string;
    servicesTitle: string;
    serviceStudyTours: string;
    serviceRoute331: string;
    serviceOfficial: string;
    aboutTitle: string;
    aboutCooperation: string;
    aboutAI: string;
    aboutUs: string;
    contactTitle: string;
    contactPhone: string;
    contactEmail: string;
    socialWechat: string;
    socialWeibo: string;
    socialXiaohongshu: string;
    copyright: string;
    privacy: string;
    terms: string;
  }
> = {
  zh: {
    brandSubtitle: '吉林文旅资源入口',
    tagline: '整合吉林目的地、工业研学、自驾攻略与官方服务说明的吉林文旅资源入口平台。',
    destinationsTitle: '目的地',
    destinationChangchun: '长春',
    destinationChangbaishan: '长白山',
    destinationYanbian: '延边',
    servicesTitle: '服务',
    serviceStudyTours: '工业研学',
    serviceRoute331: '自驾攻略',
    serviceOfficial: '官方服务',
    aboutTitle: '关于',
    aboutCooperation: '合作咨询',
    aboutAI: 'AI助手',
    aboutUs: '关于我们',
    contactTitle: '联系我们',
    contactPhone: '电话: 待提供',
    contactEmail: '邮箱: info@dajilin.net',
    socialWechat: '微信',
    socialWeibo: '微博',
    socialXiaohongshu: '小红书',
    copyright: '© {year} dajilin.net. All rights reserved.',
    privacy: '隐私政策',
    terms: '使用条款',
  },
  en: {
    brandSubtitle: 'Jilin Travel Resource Portal',
    tagline: 'Your gateway to Jilin travel resources: destinations, study tours, Route 331, and official services.',
    destinationsTitle: 'Destinations',
    destinationChangchun: 'Changchun',
    destinationChangbaishan: 'Changbaishan',
    destinationYanbian: 'Yanbian',
    servicesTitle: 'Services',
    serviceStudyTours: 'Study Tours',
    serviceRoute331: 'Route 331',
    serviceOfficial: 'Official Services',
    aboutTitle: 'About',
    aboutCooperation: 'Cooperation',
    aboutAI: 'AI Assistant',
    aboutUs: 'About Us',
    contactTitle: 'Contact Us',
    contactPhone: 'Tel: To be provided',
    contactEmail: 'Email: info@dajilin.net',
    socialWechat: 'WeChat',
    socialWeibo: 'Weibo',
    socialXiaohongshu: 'Xiaohongshu',
    copyright: '© {year} dajilin.net. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },
  ja: {
    brandSubtitle: '吉林文旅リソースポータル',
    tagline: '吉林の目的地、産業研修、自驾攻略、公式サービスの情報入口プラットフォーム。',
    destinationsTitle: '目的地',
    destinationChangchun: '長春',
    destinationChangbaishan: '長白山',
    destinationYanbian: '延辺',
    servicesTitle: 'サービス',
    serviceStudyTours: '産業研修',
    serviceRoute331: '自驾攻略',
    serviceOfficial: '公式サービス',
    aboutTitle: '概要',
    aboutCooperation: '協力相談',
    aboutAI: 'AIアシスタント',
    aboutUs: '私たちについて',
    contactTitle: 'お問い合わせ',
    contactPhone: '電話: 未定',
    contactEmail: 'メール: info@dajilin.net',
    socialWechat: '微信',
    socialWeibo: '微博',
    socialXiaohongshu: '小红書',
    copyright: '© {year} dajilin.net. All rights reserved.',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
  },
  ko: {
    brandSubtitle: '지린 관광 자원 포털',
    tagline: '지린 목적지, 산업 연수, 331 국도 및 공식 서비스 정보 입구 플랫폼입니다.',
    destinationsTitle: '목적지',
    destinationChangchun: '장춘',
    destinationChangbaishan: '장백산',
    destinationYanbian: '연변',
    servicesTitle: '서비스',
    serviceStudyTours: '산업 연수',
    serviceRoute331: '331국도',
    serviceOfficial: '공식 서비스',
    aboutTitle: '정보',
    aboutCooperation: '협력 상담',
    aboutAI: 'AI 도우미',
    aboutUs: '회사 소개',
    contactTitle: '연락처',
    contactPhone: '전화: 미정',
    contactEmail: '이메일: info@dajilin.net',
    socialWechat: '위챗',
    socialWeibo: '웨이보',
    socialXiaohongshu: '샤오홍슈',
    copyright: '© {year} dajilin.net. All rights reserved.',
    privacy: '개인정보처리방침',
    terms: '이용약관',
  },
};

const navLabelMap: Record<
  Locale,
  {
    home: string;
    destinations: string;
    themes: string;
    studyTours: string;
    route331: string;
    services: string;
    guides: string;
    cooperation: string;
    ai: string;
    shop: string;
  }
> = {
  zh: {
    home: '首页',
    destinations: '吉林目的地',
    themes: '主题玩法',
    studyTours: '工业研学',
    route331: '自驾攻略',
    services: '官方服务入口',
    guides: '攻略与资讯',
    cooperation: '合作咨询',
    ai: 'AI助手',
    shop: '商城',
  },
  en: {
    home: 'Home',
    destinations: 'Destinations',
    themes: 'Themes',
    studyTours: 'Study Tours',
    route331: 'Route 331',
    services: 'Official Services',
    guides: 'Guides & News',
    cooperation: 'Cooperation',
    ai: 'AI Assistant',
    shop: 'Shop',
  },
  ja: {
    home: 'ホーム',
    destinations: '目的地',
    themes: 'テーマ',
    studyTours: '産業研修',
    route331: '自驾攻略',
    services: '公式サービス',
    guides: 'ガイド情報',
    cooperation: '協業相談',
    ai: 'AIアシスタント',
    shop: 'ショップ',
  },
  ko: {
    home: '홈',
    destinations: '목적지',
    themes: '테마',
    studyTours: '산업 연수',
    route331: '331 국도',
    services: '공식 서비스',
    guides: '가이드 & 소식',
    cooperation: '협업 문의',
    ai: 'AI 도우미',
    shop: '샵',
  },
};

export const getHeaderText = (locale: Locale) => headerTextMap[locale];
export const getFooterText = (locale: Locale) => footerTextMap[locale];

export const getNavItems = (locale: Locale) => {
  const labels = navLabelMap[locale];
  return [
    { href: localizePath('/', locale), label: labels.home },
    { href: localizePath('/destinations', locale), label: labels.destinations },
    { href: localizePath('/themes', locale), label: labels.themes },
    { href: localizePath('/study-tours', locale), label: labels.studyTours },
    { href: localizePath('/self-drive', locale), label: labels.route331 },
    { href: localizePath('/ai-assistant', locale), label: labels.ai },
  ];
};

export const getLanguageSwitcherItems = (pathname: string) => {
  const basePath = stripLocalePrefix(pathname) || '/';
  const viewerLocale = getLocaleFromPathname(pathname);

  return supportedLocales.map((item) => ({
    locale: item,
    label: getLocaleLabel(item, viewerLocale),
    href: localizePath(basePath, item),
    active: item === viewerLocale,
  }));
};
