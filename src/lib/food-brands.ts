export type FoodBrand = {
  slug: string;
  name: string;
  city: string;
  category: string;
  heritage: string;
  signature: string;
  summary: string;
  bestFor: string[];
  routePairing: string[];
  recommendedItems: string[];
  planningNote: string;
  sourceNote: string;
  verificationUrl: string;
  representativeStore?: string;
  address?: string;
  phone?: string;
  businessHours?: string;
  teamDiningCapacity?: string;
};

export const foodBrandSources = [
  {
    label: '商务部老字号数字博物馆吉林馆',
    href: 'https://lzhbwg.mofcom.gov.cn/edi_ecms_web_front/thb/thbarea/jl/220000',
  },
  {
    label: '中华老字号信息管理平台',
    href: 'https://zhlzh.mofcom.gov.cn/',
  },
];

export const jilinFoodBrands: FoodBrand[] = [
  {
    slug: 'dingfengzhen',
    name: '鼎丰真',
    city: '长春',
    category: '糕点 / 伴手礼',
    heritage: '吉林老字号代表品牌',
    signature: '传统糕点、节令点心、城市伴手礼',
    summary: '长春市民熟悉的糕点老字号，适合作为城市漫游后的伴手礼和节庆礼盒推荐。',
    bestFor: ['伴手礼', '家庭游客', '城市漫游'],
    routePairing: ['长春新民大街 Citywalk', '伪满皇宫与城市老街', '长春返程伴手礼'],
    recommendedItems: ['传统糕点', '节令点心', '礼盒伴手礼'],
    planningNote: '适合作为行程尾声采购节点；具体门店、库存和节令产品以品牌门店实时信息为准。',
    sourceNote: '老字号数字博物馆吉林馆列举的省内知名老字号品牌。',
    verificationUrl: 'https://lzhbwg.mofcom.gov.cn/edi_ecms_web_front/thb/thbarea/jl/220000',
    representativeStore: '大马路总店',
    address: '吉林省长春市南关区大马路40-1号',
    phone: '0431-88747088',
    businessHours: '09:00 - 20:00 (建议电话核实)',
    teamDiningCapacity: '适合伴手礼集采',
  },
  {
    slug: 'chunfahe',
    name: '春发合饭店',
    city: '长春',
    category: '老派饭店 / 吉林菜',
    heritage: '吉林老字号代表品牌',
    signature: '传统宴席、东北家常菜、城市老饭店体验',
    summary: '适合做长春城市人文路线中的正餐节点，用来承接“老长春味道”和城市记忆内容。',
    bestFor: ['城市宴请', '团体用餐', '长春老味道'],
    routePairing: ['长春新民大街 Citywalk', '长春老城与三道街', '长春团队城市游'],
    recommendedItems: ['东北家常菜', '传统宴席菜', '长春老饭店体验'],
    planningNote: '适合正餐和团队餐饮咨询；门店营业状态、包房和排队情况应提前核验。',
    sourceNote: '老字号数字博物馆吉林馆列举的省内知名老字号品牌。',
    verificationUrl: 'https://xxgk.jl.gov.cn/PDFfile/201812/5699190.pdf',
    representativeStore: '东三道街总店',
    address: '吉林省长春市南关区东三道街354号',
    phone: '0431-81289966',
    businessHours: '09:30 - 21:00 (建议致电确认)',
    teamDiningCapacity: '支持接团(有包房/散台)',
  },
  {
    slug: 'liliangui',
    name: '李连贵熏肉大饼',
    city: '四平',
    category: '地方小吃 / 熏肉大饼',
    heritage: '中华老字号',
    signature: '熏肉大饼、老汤熏肉、东北小吃',
    summary: '四平代表性小吃品牌，适合纳入吉林中部城市路线和自驾补给餐饮推荐。',
    bestFor: ['自驾补给', '地方小吃', '四平路线'],
    routePairing: ['长春-四平中部自驾', 'G331 前后补给线', '四平城市短停'],
    recommendedItems: ['熏肉大饼', '老汤熏肉', '东北传统小吃'],
    planningNote: '适合作为自驾或城市短停的地方小吃节点；连锁门店较多，优先核验当前所在城市门店。',
    sourceNote: '商务部中华老字号名录可核验品牌。',
    verificationUrl: 'https://jl.people.com.cn/n2/2024/0724/c349771-40921924.html',
    representativeStore: '中央路店(等连锁店)',
    address: '四平市铁东区中央路4-5马路(中央路店)',
    phone: '请通过地图应用查看具体门店',
    businessHours: '09:00 - 21:00 (建议致电核实)',
    teamDiningCapacity: '可接小型团餐',
  },
  {
    slug: 'yangmazi',
    name: '杨麻子',
    city: '长春',
    category: '面点 / 大饼',
    heritage: '中华老字号',
    signature: '杨麻子大饼、面点快餐',
    summary: '以大饼面点见长，适合做长春轻餐和东北面点体验推荐。',
    bestFor: ['轻餐', '面点体验', '家庭用餐'],
    routePairing: ['长春城市轻餐', '亲子家庭用餐', '长春商圈周边补给'],
    recommendedItems: ['杨麻子大饼', '东北面点', '轻餐快餐'],
    planningNote: '适合行程中间的轻餐补给；具体分店、营业时间和排队情况以实时门店信息为准。',
    sourceNote: '商务部中华老字号信息管理平台可核验品牌。',
    verificationUrl: 'https://zhlzh.mofcom.gov.cn/',
    representativeStore: '连锁经营，建议就近选择',
    address: '长春市内多家分店',
    phone: '请通过地图应用查看具体门店',
    businessHours: '09:00 - 21:00 (建议致电核实)',
    teamDiningCapacity: '适合家庭/轻餐',
  },
  {
    slug: 'xinxingyuan',
    name: '新兴园',
    city: '吉林市',
    category: '饭店 / 地方餐饮',
    heritage: '中华老字号',
    signature: '吉林市传统饭店、地方菜',
    summary: '吉林市代表性老字号餐饮，可与松花江、雾凇、城市老街路线组合推荐。',
    bestFor: ['吉林市旅行', '雾凇季用餐', '传统饭店'],
    routePairing: ['吉林市雾凇季', '松花江城市游', '吉林市老街区'],
    recommendedItems: ['吉林市传统饭店菜', '东北宴席菜', '雾凇季正餐'],
    planningNote: '适合吉林市正餐节点；冬季雾凇季游客集中，建议提前核验营业与预约信息。',
    sourceNote: '商务部中华老字号信息管理平台可核验品牌。',
    verificationUrl: 'https://zhlzh.mofcom.gov.cn/',
    representativeStore: '河南街总店',
    address: '吉林市船营区河南街中段115号',
    phone: '0432-62101111',
    businessHours: '08:30 - 20:30 (建议电话核实)',
    teamDiningCapacity: '4层老建筑，适合接团',
  },
  {
    slug: 'xichunfa',
    name: '西春发饭店',
    city: '吉林市',
    category: '饭店 / 地方餐饮',
    heritage: '中华老字号相关企业',
    signature: '吉林市老饭店、地方宴席',
    summary: '适合与吉林市城市游、雾凇季、团队餐饮服务内容联动。',
    bestFor: ['团队用餐', '吉林市老味道', '城市游'],
    routePairing: ['吉林市城市游', '雾凇岛前后用餐', '团队餐饮咨询'],
    recommendedItems: ['地方宴席', '吉林市传统餐饮', '团队正餐'],
    planningNote: '适合团队和城市游正餐候选；具体门店、菜单和接待能力需要提前确认。',
    sourceNote: '商务部中华老字号信息管理平台可核验企业信息。',
    verificationUrl: 'https://zhlzh.mofcom.gov.cn/',
    representativeStore: '西春发饭店',
    address: '建议通过地图应用搜索就近门店',
    phone: '建议在点评平台核实',
    businessHours: '建议电话核实',
    teamDiningCapacity: '可接团',
  },
];

export const foodFaqs = [
  {
    question: '吉林老字号餐饮适合游客怎么安排？',
    answer: '建议把老字号餐饮作为路线中的一餐或伴手礼节点，而不是单独为了打卡绕路。长春适合搭配城市漫游，吉林市适合搭配雾凇和松花江路线，四平适合自驾途中补给。',
  },
  {
    question: '大吉林是否直接销售餐饮套餐？',
    answer: '当前页面先做老字号餐饮推荐与内容索引，不直接售卖餐饮套餐。后续可接入门店预约、团餐咨询和本地合作资源。',
  },
  {
    question: '页面里的老字号信息如何核验？',
    answer: '优先参考商务部老字号数字博物馆、中华老字号信息管理平台和吉林省公开信息；具体门店营业状态、地址和菜单应以品牌官方或门店实时信息为准。',
  },
];
