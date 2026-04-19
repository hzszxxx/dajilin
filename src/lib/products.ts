// Real products for dajilin.net shop
// Compatible with ShopProduct interface in cart.ts

export interface Product {
  id: string;
  slug: string;
  category: 'food' | 'creative' | 'service';
  name: string;
  nameEn: string;
  nameJa: string;
  nameKo: string;
  price: number; // numeric for shop.astro compatibility
  priceUnit: string;
  tag: string;
  tagEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  imagePlaceholder?: string; // for shop.astro SVG placeholder fallback
  inStock: boolean;
}

export const products: Product[] = [
  // === 东北特产 food ===
  {
    id: 'changbai-wild-vegetables',
    slug: 'changbai-wild-vegetables',
    category: 'food',
    name: '长白山野生蕨菜干',
    nameEn: 'Changbai Wild Ferns Dried',
    nameJa: '長白山山菜わらび乾',
    nameKo: '장백산 야생 고사리 말린것',
    price: 68,
    priceUnit: '袋（200g）',
    tag: '长白山特产',
    tagEn: 'Changbai Specialty',
    description: '长白山原始森林野生蕨菜，自然晾晒，保留山野清香。适合炒制、凉拌，是东北餐桌上难得的山珍。',
    descriptionEn: 'Wild ferns from Changbai Mountain pristine forest, naturally sun-dried. Perfect for stir-frying or cold dishes.',
    imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c18?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
  {
    id: 'yanbian-rice-cake',
    slug: 'yanbian-rice-cake',
    category: 'food',
    name: '延边朝鲜族打糕',
    nameEn: 'Yanbian Korean Rice Cake',
    nameJa: '延辺朝鮮族タッギョ',
    nameKo: '연변 조선족 떠떡',
    price: 45,
    priceUnit: '份（500g）',
    tag: '朝鲜族传统',
    tagEn: 'Korean Ethnic Traditional',
    description: '延边朝鲜族传统手工打糕，糯米蒸熟后反复捶打，口感软糯筋道。节日必备，冷热皆可食用。',
    descriptionEn: 'Traditional hand-made rice cake from Yanbian Korean ethnic group. Essential for festivals, served hot or cold.',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
  {
    id: 'jilin-snow-pearl-millet',
    slug: 'jilin-snow-pearl-millet',
    category: 'food',
    name: '吉林小町小米',
    nameEn: 'Jilin Komachi Millet',
    nameJa: '吉林コマチ粟',
    nameKo: '지린 고마치 조',
    price: 38,
    priceUnit: '袋（1kg）',
    tag: '吉林特产',
    tagEn: 'Jilin Specialty',
    description: '吉林优质小米，颗粒均匀，色泽金黄。适合煮粥，米油丰富，营养价值高。',
    descriptionEn: 'Premium millet from Jilin, evenly grained with golden color. Perfect for congee, rich in rice oil with high nutritional value.',
    imageUrl: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
  {
    id: 'changbai-mountain-honey',
    slug: 'changbai-mountain-honey',
    category: 'food',
    name: '长白山天然椴树蜜',
    nameEn: 'Changbai Mountain Linden Honey',
    nameJa: '長白山天然菩提樹蜂蜜',
    nameKo: '장백산 천연피나무 꿀',
    price: 128,
    priceUnit: '瓶（500g）',
    tag: '天然蜂蜜',
    tagEn: 'Natural Honey',
    description: '长白山原始森林天然椴树蜜，波美度42度以上，花香浓郁，口感醇厚，有镇静安神功效。',
    descriptionEn: 'Natural linden honey from Changbai Mountain pristine forest, Baume degree 42+, rich floral aroma with calming properties.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
  {
    id: 'russian-dark-chocolate',
    slug: 'russian-dark-chocolate',
    category: 'food',
    name: '俄罗斯风味黑巧克力',
    nameEn: 'Russian Style Dark Chocolate',
    nameJa: 'ロシア風ダークチョコレート',
    nameKo: '러시아 풍맛 다크 초콜릿',
    price: 35,
    priceUnit: '盒（100g）',
    tag: '边境风味',
    tagEn: 'Border Specialty',
    description: '来自俄罗斯进口原料制作的黑巧克力，浓郁醇厚，甜度适中。珲春口岸原装进口，品质保证。',
    descriptionEn: 'Dark chocolate made from Russian imported raw materials. Rich and mellow with moderate sweetness, imported through Hunchun port.',
    imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
  {
    id: 'changbai-ginseng',
    slug: 'changbai-ginseng',
    category: 'food',
    name: '长白山五年老人参',
    nameEn: 'Changbai 5-Year Wild Ginseng',
    nameJa: '長白山五年根人参',
    nameKo: '장백산 5년산 인삼',
    price: 380,
    priceUnit: '根（10g±）',
    tag: '滋补品',
    tagEn: 'Wellness',
    description: '长白山自然保护区林下参，五年生长，自然环境培育。适合泡酒、炖汤，滋补养生。',
    descriptionEn: 'Forest-grown ginseng from Changbai Mountain Nature Reserve, 5 years growth. Perfect for wine infusion or soup.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=450&fit=crop',
    imagePlaceholder: 'specialty',
    inStock: false,
  },
  // === 地方文创 creative ===
  {
    id: 'manchu-embroidery-keychain',
    slug: 'manchu-embroidery-keychain',
    category: 'creative',
    name: '满族刺绣钥匙扣',
    nameEn: 'Manchu Embroidery Keychain',
    nameJa: '満族刺繍キーホルダー',
    nameKo: '만주 자수 키링',
    price: 58,
    priceUnit: '个',
    tag: '满族非遗',
    tagEn: 'Manchu Intangible Heritage',
    description: '满族非遗刺绣技艺手工制作，每一个图案均为绣娘亲手绣制。适合作为吉林旅行纪念或伴手礼。',
    descriptionEn: 'Hand-made with Manchu intangible cultural heritage embroidery. Perfect as a Jilin travel souvenir or gift.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop',
    imagePlaceholder: 'creative',
    inStock: true,
  },
  {
    id: 'yanbian-korean-paper-notebook',
    slug: 'yanbian-korean-paper-notebook',
    category: 'creative',
    name: '延边朝鲜族纹样笔记本',
    nameEn: 'Yanbian Korean Pattern Notebook',
    nameJa: '延辺朝鮮族模様のメモ帳',
    nameKo: '연변 조선족 무늬 노트',
    price: 32,
    priceUnit: '本',
    tag: '朝鲜族文创',
    tagEn: 'Korean Ethnic Creative',
    description: '以延边朝鲜族传统纹样为设计元素的笔记本，内页采用优质书写纸，适合日常记录与旅行手账。',
    descriptionEn: 'Notebook featuring traditional Yanbian Korean ethnic patterns. Premium writing paper, suitable for journaling and travel scrapbooking.',
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=450&fit=crop',
    imagePlaceholder: 'creative',
    inStock: true,
  },
  {
    id: 'changbai-mountain-tshirt',
    slug: 'changbai-mountain-tshirt',
    category: 'creative',
    name: '长白山风景棉质T恤',
    nameEn: 'Changbai Mountain Cotton T-Shirt',
    nameJa: '長白山風景コットンTシャツ',
    nameKo: '장백산 풍경 면 티셔츠',
    price: 88,
    priceUnit: '件',
    tag: '旅行纪念',
    tagEn: 'Travel Souvenir',
    description: '以长白山天池为图案的棉质T恤，舒适透气，图案采用数码印花工艺，色彩持久。',
    descriptionEn: 'Cotton T-shirt featuring Changbai Mountain Heaven Lake. Comfortable and breathable, digital print for lasting colors.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=450&fit=crop',
    imagePlaceholder: 'creative',
    inStock: true,
  },
  // === 文旅服务 service ===
  {
    id: '331-self-drive-guide',
    slug: '331-self-drive-guide',
    category: 'service',
    name: '331国道吉林段自驾攻略包',
    nameEn: 'Route 331 Jilin Self-Drive Guide Pack',
    nameJa: '331国道吉林セクション自驾ガイドパック',
    nameKo: '331국도 지린 구간 자가운전 가이드팩',
    price: 29.9,
    priceUnit: '份（电子版）',
    tag: '自驾服务',
    tagEn: 'Self-Drive Service',
    description: '包含331国道吉林段完整自驾路线图、节点停车指南、食宿推荐、注意事项。PDF电子版，下载后永久有效。',
    descriptionEn: 'Complete self-drive route map for Route 331 Jilin, including parking guide, dining and accommodation recommendations. PDF download, lifetime access.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=450&fit=crop',
    imagePlaceholder: 'travel',
    inStock: true,
  },
  {
    id: 'yanbian-study-tour-pack',
    slug: 'yanbian-study-tour-pack',
    category: 'service',
    name: '延边研学旅行资料包',
    nameEn: 'Yanbian Study Tour Pack',
    nameJa: '延辺研修旅行資料パック',
    nameKo: '연변 연구여행 자료팩',
    price: 49.9,
    priceUnit: '份（电子版）',
    tag: '研学服务',
    tagEn: 'Study Tour Service',
    description: '针对中小学研学团队设计，包含朝鲜族文化研学手册、边境地理研学笔记、活动任务卡等配套资料。',
    descriptionEn: 'Designed for school study tour groups. Includes Korean ethnic culture study manual, border geography notes, activity task cards.',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=450&fit=crop',
    imagePlaceholder: 'travel',
    inStock: true,
  },
  {
    id: 'customized-route-consultation',
    slug: 'customized-route-consultation',
    category: 'service',
    name: '331国道定制路线咨询',
    nameEn: 'Route 331 Customized Route Consultation',
    nameJa: '331国道カスタムルート相談',
    nameKo: '331국도 맞춤 노선 상담',
    price: 199,
    priceUnit: '次',
    tag: '咨询定制',
    tagEn: 'Consultation',
    description: '根据您的出行人数、时间、偏好，由旅游顾问为您量身定制331国道吉林段行程方案，包含详细时刻表和费用估算。',
    descriptionEn: 'Travel consultant customizes your Route 331 Jilin itinerary based on group size, time, and preferences, with detailed schedule and cost estimate.',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&h=450&fit=crop',
    imagePlaceholder: 'travel',
    inStock: true,
  },
];

// Map our Product to ShopProduct interface for shop.astro compatibility
export function toShopProduct(p: Product): {
  id: string;
  slug: string;
  category: 'tourism' | 'creative' | 'specialty';
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  unit: string;
  imageUrl: string;
  imagePlaceholder: string;
  inStock: boolean;
} {
  return {
    id: p.id,
    slug: p.slug,
    // Map food → specialty, service → tourism for shop.astro category system
    category: p.category === 'service' ? 'tourism' : (p.category as 'creative' | 'specialty'),
    name: p.name,
    nameEn: p.nameEn,
    description: p.description,
    descriptionEn: p.descriptionEn,
    price: p.price,
    unit: p.priceUnit,
    imageUrl: p.imageUrl,
    imagePlaceholder: p.imagePlaceholder ?? 'specialty',
    inStock: p.inStock,
  };
}

export function getProductsByCategory(category: 'food' | 'creative' | 'service'): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.inStock);
}
