// 文旅产品馆 products
// 定位: 票务引流 + 咨询转化，非电商平台

export type ConversionType = 'consult' | 'form' | 'external';
// consult → 跳转 /cooperation 表单
// form → 本页填写需求
// external → 跳转官方外部链接

export interface Product {
  id: string;
  slug: string;
  // 产品分类
  category: 'ticket' | 'route' | 'card' | 'specialty' | 'creative';
  // 名称（多语言）
  name: string;
  nameEn: string;
  nameJa?: string;
  nameKo?: string;
  // 价格
  price: number;            // 0 = 待定
  priceType: 'exact' | 'from' | 'tbd' | 'free' | 'consultation';
  priceUnit: string;        // 如"人起""次""张"
  priceRange?: string;      // 参考价格区间，如"300-600"，ticket/route/card 用
  // 标签
  tag: string;
  tagEn: string;
  // 详情描述
  description: string;
  descriptionEn: string;
  // 主图
  imageUrl: string;
  imagePlaceholder?: string;
  // 上下架
  inStock: boolean;
  // 销售方式
  conversionType: ConversionType;
  // 跳转外部URL（仅 conversionType=external）
  externalUrl?: string;
  // 标签列表（详情页展示）
  features?: string[];
  // 适合人群
  suitableFor?: string[];
  // 预订说明
  bookingNotes?: string;
  // 高亮标记（NEW/HOT等）
  badge?: string;
  // 收款信息（研学/定制游等需要预付定金的产品）
  paymentInfo?: {
    method: 'wechat' | 'alipay' | 'bank' | 'both';
    account?: string;       // 账号/卡号
    name?: string;          // 开户名
    bank?: string;           // 开户行
    qrCodeUrl?: string;      // 收款二维码图片 URL（放在 /images/payment/）
    depositNote?: string;    // 定金说明
  };
  depositAmount?: number;   // 定金金额，如 200
}

export const products: Product[] = [
  // ══════════════════════════════════════════════
  // 票务预约 TICKET
  // ══════════════════════════════════════════════
  {
    id: 'changbai-mountain-ticket',
    slug: 'changbai-mountain-ticket',
    category: 'ticket',
    name: '长白山景区门票套餐',
    nameEn: 'Changbai Mountain Scenic Ticket Package',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '长白山',
    tagEn: 'Changbai',
    description: '长白山北坡/西坡/南坡门票任选，组合套餐含景区巴士、倒站车票。官方实名预约，提前下单确保入园名额。',
    descriptionEn: 'Choose from Changbai North/West/South slope tickets. Packages include scenic bus and transfer vehicle. Official real-name booking.',
    imageUrl: '/images/home/changbai-mountain-ticket.jpg',
    imagePlaceholder: 'ticket',
    inStock: true,
    conversionType: 'external',
    externalUrl: 'https://www.ly.com/scenery/scenery-104241.html',
    features: ['北坡·天池主景观', '西坡·高山花园', '南坡·生态探索', '官方实名预约'],
    suitableFor: ['自由行游客', '家庭出游', '摄影爱好者'],
    bookingNotes: '需提前2天预约，旺季建议提前1周。景区实行最大承载量管理，名额有限。',
    badge: 'HOT',
  },
  {
    id: 'yanbian-scenic-pass',
    slug: 'yanbian-scenic-pass',
    category: 'ticket',
    name: '延边景区联票套餐',
    nameEn: 'Yanbian Scenic Area Pass',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '延边',
    tagEn: 'Yanbian',
    description: '图们口岸、珲春防川一眼望三国、龙井秘境等延边核心景区组合购票，享联票优惠。',
    descriptionEn: 'Combined tickets for Tumen Port, Hunchun Fangchuan, Longjing and more Yanbian highlights with discounted bundle pricing.',
    imageUrl: '/images/home/yanbian-scenic-pass.jpg',
    imagePlaceholder: 'ticket',
    inStock: true,
    conversionType: 'external',
    externalUrl: 'https://www.ly.com/scenery/scenery-104241.html',
    features: ['图们口岸边境线', '珲春防川风景区', '龙井秘境', '联票优惠组合'],
    suitableFor: ['边境文化爱好者', '深度游旅客', '摄影发烧友'],
    bookingNotes: '联票有效期至当年12月31日，部分景区有淡旺季差异。',
    badge: 'NEW',
  },
  {
    id: 'jilin-city-tour-ticket',
    slug: 'jilin-city-tour-ticket',
    category: 'ticket',
    name: '吉林市一日游通票',
    nameEn: 'Jilin City Day Tour Pass',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '吉林市',
    tagEn: 'Jilin City',
    description: '包含松花湖、北山公园、陨石博物馆等吉林市核心景点，含全程交通和景区联接。',
    descriptionEn: 'Covers Songhua Lake, Beishan Park, Meteorite Museum and more Jilin City highlights with transport between sites.',
    imageUrl: '/images/home/jilin-city-tour-ticket.jpg',
    imagePlaceholder: 'ticket',
    inStock: true,
    conversionType: 'external',
    externalUrl: 'https://www.ly.com/scenery/scenery-104241.html',
    features: ['松花湖游船', '北山公园', '吉林陨石博物馆', '全程交通'],
    suitableFor: ['城市漫游者', '历史文化爱好者', '周末短途游'],
  },

  // ══════════════════════════════════════════════
  // 线路定制 ROUTE
  // ══════════════════════════════════════════════
  {
    id: 'changbai-5d-route',
    slug: 'changbai-5d-route',
    category: 'route',
    name: '长白山深度5日游',
    nameEn: 'Changbai Mountain 5-Day Deep Tour',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '深度游',
    tagEn: 'Deep Tour',
    description: '5天4晚长白山全景深度体验：北坡天池+西坡高山花园+南坡生态探索+特色温泉体验，完整覆盖三坡精华。',
    descriptionEn: '5-day/4-night comprehensive Changbai experience: North slope Tianchi, West slope alpine garden, South slope ecology, hot springs.',
    imageUrl: '/images/home/changbai-5d-route.jpg',
    imagePlaceholder: 'route',
    inStock: true,
    conversionType: 'form',
    features: ['三坡全景观', '特色温泉体验', '朝鲜族美食', '专业导游服务'],
    suitableFor: ['深度游爱好者', '家庭出游', '摄影发烧友', '自然探索型游客'],
    bookingNotes: '4人成团，天天发班。旺季价格有波动，以最终确认价格为准。',
    badge: 'HOT',
  },
  {
    id: 'yanbian-border-3d-route',
    slug: 'yanbian-border-3d-route',
    category: 'route',
    name: '延边边境风情3日游',
    nameEn: 'Yanbian Border Culture 3-Day Tour',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '边境游',
    tagEn: 'Border Tour',
    description: '延吉市区+图们口岸+珲春防川+延边大学，深度体验朝鲜族文化和边境风光，适合周末或小长假出行。',
    descriptionEn: 'Yanji city + Tumen border + Hunchun Fangchuan + Yanbian University. Perfect for weekend or short holiday trips.',
    imageUrl: '/images/home/yanbian-border-3d-route.jpg',
    imagePlaceholder: 'route',
    inStock: true,
    conversionType: 'form',
    features: ['朝鲜族文化体验', '边境风光', '特色美食', '城市漫游'],
    suitableFor: ['文化体验爱好者', '美食游旅客', '周末出行'],
    badge: 'NEW',
  },
  {
    id: 'industrial-study-tour-route',
    slug: 'industrial-study-tour-route',
    category: 'route',
    name: '长春工业研学1日营',
    nameEn: 'Changchun Industrial Study Tour Day Camp',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '研学',
    tagEn: 'Study Tour',
    description: '走进一汽红旗博物馆、中车长客生产线，近距离接触中国汽车工业与轨道交通装备，了解大国制造的力量。',
    descriptionEn: 'Visit FAW Hongqi Museum and CRRC Changchun production line. Get up close with China\'s automotive and rail transit manufacturing.',
    imageUrl: '/images/home/industrial-study-tour-route.jpg',
    imagePlaceholder: 'route',
    inStock: true,
    conversionType: 'form',
    features: ['一汽红旗博物馆', '中车长客生产线', '品牌文化解读', '研学手册配套'],
    suitableFor: ['中小学生', '学校及培训机构', '企业参访', '政企考察'],
    bookingNotes: '仅接待团体预约，20人起成团。需提前7天确认档期。',
    paymentInfo: {
      method: 'both',
      name: '大吉林文旅',
      depositNote: '预付 ¥200/人锁定名额，尾款出发前3天结清。如取消，提前5天告知可全额退款。',
    },
    depositAmount: 200,
  },
  {
    id: '331-self-drive-custom-route',
    slug: '331-self-drive-custom-route',
    category: 'route',
    name: '331国道吉林段自驾定制',
    nameEn: 'Route 331 Jilin Self-Drive Custom Tour',
    price: 0,
    priceType: 'from',
    priceUnit: '人起',
    priceRange: '300-800',
    tag: '自驾',
    tagEn: 'Self-Drive',
    description: '根据您的出行时间、人数和偏好，由旅游顾问为您量身定制331国道吉林段的自驾行程方案。',
    descriptionEn: 'Customized Route 331 Jilin self-drive itinerary based on your schedule, group size, and preferences by travel consultant.',
    imageUrl: '/images/home/331-self-drive-custom-route.jpg',
    imagePlaceholder: 'route',
    inStock: true,
    conversionType: 'consult',
    features: ['路线量身定制', '驿站服务安排', '食宿推荐', '应急支援信息'],
    suitableFor: ['自驾爱好者', '摄影发烧友', '深度游旅客', '家庭/朋友结伴'],
    bookingNotes: '可提供领航车服务，需额外预约。',
    badge: 'HOT',
  },
  {
    id: 'customized-route-consultation',
    slug: 'customized-route-consultation',
    category: 'route',
    name: '吉林全境定制游咨询',
    nameEn: 'Jilin Full Region Custom Tour Consultation',
    price: 199,
    priceType: 'consultation',
    priceUnit: '次',
    tag: '定制游',
    tagEn: 'Custom Tour',
    description: '专业旅游顾问一对一定制咨询，根据您的出行天数、人数、预算和偏好，生成完整吉林旅行方案，并提供全程跟进服务。',
    descriptionEn: 'One-on-one custom tour consultation with professional travel consultant. Full Jilin travel plan with follow-up service.',
    imageUrl: '/images/home/customized-route-consultation.jpg',
    imagePlaceholder: 'route',
    inStock: true,
    conversionType: 'consult',
    features: ['一对一顾问服务', '个性化行程方案', '全程跟进支持', '实时行程调整'],
    suitableFor: ['追求品质游旅客', '家庭定制游', '商务/企业出行', '特殊需求（亲子/银发等）'],
    bookingNotes: '咨询费用可抵扣后续订单，实际行程费用另计。',
  },

  // ══════════════════════════════════════════════
  // 文旅年卡 CARD
  // ══════════════════════════════════════════════
  {
    id: 'jilin-culture-card',
    slug: 'jilin-culture-card',
    category: 'card',
    name: '吉林文旅一卡通',
    nameEn: 'Jilin Culture & Tourism Card',
    price: 0,
    priceType: 'from',
    priceUnit: '张/年',
    priceRange: '500-1200',
    tag: '年卡',
    tagEn: 'Annual Pass',
    description: '一张卡玩转吉林：长白山、净月潭、伪满皇宫等20+核心景区，年内无限次进入，享合作商户折扣。',
    descriptionEn: 'One card for 20+ Jilin attractions: Changbai Mountain, Jingyuetan, Puppet Palace and more. Unlimited visits within the year.',
    imageUrl: '/images/home/jilin-culture-card.jpg',
    imagePlaceholder: 'card',
    inStock: true,
    conversionType: 'consult',
    features: ['20+景区通用', '年内无限次', '合作商户折扣', '专属客服服务'],
    suitableFor: ['吉林省内居民', '频繁出行用户', '高复访率旅客'],
    bookingNotes: '年卡实名制，激活后有效期1年。儿童/老人有专属优惠价格。',
    badge: 'HOT',
  },
  {
    id: 'border-tourism-card',
    slug: 'border-tourism-card',
    category: 'card',
    name: '边境旅游一卡通',
    nameEn: 'Border Tourism Card',
    price: 0,
    priceType: 'from',
    priceUnit: '张/年',
    priceRange: '500-1200',
    tag: '年卡',
    tagEn: 'Annual Pass',
    description: '专为边境游爱好者设计，图们、珲春、延吉等边境城市核心景区一卡通行，适合多次往返深度体验。',
    descriptionEn: 'Designed for border tourism enthusiasts. Access core attractions in Tumen, Hunchun, and Yanji with one card.',
    imageUrl: '/images/home/border-tourism-card.jpg',
    imagePlaceholder: 'card',
    inStock: true,
    conversionType: 'consult',
    features: ['边境景区通用', '延吉/图们/珲春全覆盖', '年内多次进入', '特色商户折扣'],
    suitableFor: ['边境文化爱好者', '多次往返旅客', '深度体验型游客'],
  },

  // ══════════════════════════════════════════════
  // 精选好物 LEGACY（保留原有特产/文创）
  // ══════════════════════════════════════════════
  {
    id: 'changbai-wild-vegetables',
    slug: 'changbai-wild-vegetables',
    category: 'specialty',
    name: '长白山野生蕨菜干',
    nameEn: 'Changbai Wild Ferns Dried',
    price: 68,
    priceType: 'exact',
    priceUnit: '袋（200g）',
    tag: '长白山特产',
    tagEn: 'Changbai Specialty',
    description: '长白山原始森林野生蕨菜，自然晾晒，保留山野清香。适合炒制、凉拌，是东北餐桌上难得的山珍。',
    descriptionEn: 'Wild ferns from Changbai Mountain pristine forest, naturally sun-dried. Perfect for stir-frying or cold dishes.',
    imageUrl: '/images/home/changbai-wild-vegetables.jpg',
    imagePlaceholder: 'specialty',
    inStock: true,
    conversionType: 'consult',
    features: ['产地直发', '自然晾晒', '东北特产'],
  },
  {
    id: 'yanbian-rice-cake',
    slug: 'yanbian-rice-cake',
    category: 'specialty',
    name: '延边朝鲜族打糕',
    nameEn: 'Yanbian Korean Rice Cake',
    price: 45,
    priceType: 'exact',
    priceUnit: '份（500g）',
    tag: '朝鲜族传统',
    tagEn: 'Korean Ethnic Traditional',
    description: '延边朝鲜族传统手工打糕，糯米蒸熟后反复捶打，口感软糯筋道。节日必备，冷热皆可食用。',
    descriptionEn: 'Traditional hand-made rice cake from Yanbian Korean ethnic group. Essential for festivals, served hot or cold.',
    imageUrl: '/images/home/yanbian-rice-cake.jpg',
    imagePlaceholder: 'specialty',
    inStock: true,
    conversionType: 'consult',
    features: ['手工制作', '朝鲜族传统', '节日必备'],
  },
  {
    id: 'changbai-mountain-honey',
    slug: 'changbai-mountain-honey',
    category: 'specialty',
    name: '长白山天然椴树蜜',
    nameEn: 'Changbai Mountain Linden Honey',
    price: 128,
    priceType: 'exact',
    priceUnit: '瓶（500g）',
    tag: '天然蜂蜜',
    tagEn: 'Natural Honey',
    description: '长白山原始森林天然椴树蜜，波美度42度以上，花香浓郁，口感醇厚，有镇静安神功效。',
    descriptionEn: 'Natural linden honey from Changbai Mountain pristine forest, Baume degree 42+, rich floral aroma with calming properties.',
    imageUrl: '/images/home/changbai-mountain-honey.jpg',
    imagePlaceholder: 'specialty',
    inStock: true,
    conversionType: 'consult',
    features: ['波美度42°+', '产地直发', '天然无添加'],
  },
  {
    id: 'manchu-embroidery-keychain',
    slug: 'manchu-embroidery-keychain',
    category: 'creative',
    name: '满族刺绣钥匙扣',
    nameEn: 'Manchu Embroidery Keychain',
    price: 58,
    priceType: 'exact',
    priceUnit: '个',
    tag: '满族非遗',
    tagEn: 'Manchu Intangible Heritage',
    description: '满族非遗刺绣技艺手工制作，每一个图案均为绣娘亲手绣制。适合作为吉林旅行纪念或伴手礼。',
    descriptionEn: 'Hand-made with Manchu intangible cultural heritage embroidery. Perfect as a Jilin travel souvenir or gift.',
    imageUrl: '/images/home/manchu-embroidery-keychain.jpg',
    imagePlaceholder: 'creative',
    inStock: true,
    conversionType: 'consult',
    features: ['非遗手作', '满族文化', '旅行纪念'],
  },
  {
    id: 'yanbian-korean-paper-notebook',
    slug: 'yanbian-korean-paper-notebook',
    category: 'creative',
    name: '延边朝鲜族纹样笔记本',
    nameEn: 'Yanbian Korean Pattern Notebook',
    price: 32,
    priceType: 'exact',
    priceUnit: '本',
    tag: '朝鲜族文创',
    tagEn: 'Korean Ethnic Creative',
    description: '以延边朝鲜族传统纹样为设计元素的笔记本，内页采用优质书写纸，适合日常记录与旅行手账。',
    descriptionEn: 'Notebook featuring traditional Yanbian Korean ethnic patterns. Premium writing paper, suitable for journaling and travel scrapbooking.',
    imageUrl: '/images/home/yanbian-korean-paper-notebook.jpg',
    imagePlaceholder: 'creative',
    inStock: true,
    conversionType: 'consult',
    features: ['朝鲜族纹样', '旅行手账', '文创伴手礼'],
  },
  {
    id: 'changbai-mountain-tshirt',
    slug: 'changbai-mountain-tshirt',
    category: 'creative',
    name: '长白山风景棉质T恤',
    nameEn: 'Changbai Mountain Cotton T-Shirt',
    price: 88,
    priceType: 'exact',
    priceUnit: '件',
    tag: '旅行纪念',
    tagEn: 'Travel Souvenir',
    description: '以长白山天池为图案的棉质T恤，舒适透气，图案采用数码印花工艺，色彩持久。',
    descriptionEn: 'Cotton T-shirt featuring Changbai Mountain Heaven Lake. Comfortable and breathable, digital print for lasting colors.',
    imageUrl: '/images/home/changbai-mountain-tshirt.jpg',
    imagePlaceholder: 'creative',
    inStock: true,
    conversionType: 'consult',
    features: ['数码印花', '100%棉', '旅行纪念'],
  },
];

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

export function getCategoryLabel(category: Product['category'], locale: string = 'zh'): string {
  const labels: Record<string, Record<string, string>> = {
    ticket: { zh: '票务预约', en: 'Tickets', ja: 'チケット', ko: '티켓' },
    route: { zh: '线路定制', en: 'Custom Routes', ja: 'ルート定制', ko: '노선定制' },
    card: { zh: '文旅年卡', en: 'Tourism Cards', ja: '観光年卡', ko: '관광 연간卡' },
    specialty: { zh: '精选好物', en: 'Specialties', ja: '精选、特産', ko: '특산품' },
    creative: { zh: '地方文创', en: 'Local Creative', ja: '地域文創', ko: '지역 창작' },
  };
  return labels[category]?.[locale] ?? labels[category]?.['zh'] ?? category;
}

export function getConversionLabel(type: ConversionType, locale: string = 'zh'): string {
  const labels: Record<string, Record<string, string>> = {
    consult: { zh: '咨询详情', en: 'Inquire', ja: '詳細を相談', ko: '상담하기' },
    form: { zh: '填写需求', en: 'Fill Form', ja: '必要情報を記入', ko: '요구사항 기입' },
    external: { zh: '立即预订', en: 'Book Now', ja: '今すぐ予約', ko: '즉시 예약' },
  };
  return labels[type]?.[locale] ?? labels[type]?.['zh'] ?? '咨询详情';
}

export function getPriceDisplay(product: Product, locale: string = 'zh'): string {
  if (product.priceType === 'free') return locale === 'zh' ? '免费' : 'Free';
  if (product.priceType === 'tbd') return locale === 'zh' ? '价格待定' : 'TBD';
  if (product.priceType === 'consultation') return locale === 'zh' ? '¥199/次' : '¥199/session';
  if (product.priceType === 'from' && product.priceRange) {
    return locale === 'zh'
      ? `¥${product.priceRange}/${product.priceUnit}`
      : `¥${product.priceRange}/${product.priceUnit}`;
  }
  if (product.price === 0 || product.priceType === 'from') return locale === 'zh' ? '¥?/人起' : 'From ¥?/person';
  return `¥${product.price.toFixed(0)}${product.priceUnit ? '/' + product.priceUnit : ''}`;
}
