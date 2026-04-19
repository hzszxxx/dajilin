export type Locale = 'zh' | 'en' | 'ja' | 'ko';

export type DetailSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type DetailFaq = {
  question: string;
  answer: string;
};

export type MediaRef = {
  id: string;
  alt: string;
  altEn: string;
};

export type PageLocalization = {
  title: string;
  description: string;
  intro: string;
};

export type DetailPage = {
  section:
    | 'destinations'
    | 'study-tours'
    | 'self-drive'
    | 'official-services'
    | 'themes'
    | 'guides'
    | 'shop';
  slug: string;
  pathname: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  audience: string[];
  highlights: string[];
  sections: DetailSection[];
  notes: string[];
  faqs: DetailFaq[];
  ctas: { label: string; href: string }[];
  mediaRequirements?: MediaRef[];
  localizations?: Partial<Record<Locale, PageLocalization>>;
};

export const getPageLocalization = (page: DetailPage, locale: Locale): { title: string; description: string; intro: string } => {
  if (locale === 'zh' || !page.localizations) {
    return { title: page.title, description: page.description, intro: page.intro };
  }
  const loc = page.localizations[locale];
  if (!loc) {
    return { title: page.title, description: page.description, intro: page.intro };
  }
  return {
    title: loc.title || page.title,
    description: loc.description || page.description,
    intro: loc.intro || page.intro,
  };
};

const detailPages: DetailPage[] = [
  {
    section: 'destinations',
    slug: 'changchun',
    pathname: '/destinations/changchun',
    title: '长春旅游与城市玩法指南',
    shortTitle: '长春',
    description: '从城市文旅、工业文明、亲子与团体体验角度介绍长春，帮助游客找到适合自己的吉林入口城市。',
    eyebrow: 'Changchun',
    intro: '长春是吉林旅行的重要入口城市。这里既有城市文旅和生活体验，也能延伸到工业研学、企业参访和亲子路线。',
    audience: ['第一次来吉林的城市游客', '想了解工业文明与城市体验的团队', '亲子、研学、政企活动用户'],
    highlights: ['吉林省会与城市型旅游入口', '工业文明与品牌文化资源集中', '可延伸到一汽、红旗、中车长客等专题'],
    sections: [
      {
        title: '长春适合什么类型游客',
        body: '长春是吉林省会城市，也是中国重要的工业基地。从城市气质到工业文明，长春为游客提供了独特的城市体验。',
        bullets: ['城市观光与在地生活体验', '工业研学与企业参访', '亲子与团体活动组织'],
      },
      {
        title: '城市核心看点',
        body: '长春的特色不只是城市景点，而是工业文明、品牌记忆、城市街区与区域资源的组合。',
      },
      {
        title: '推荐玩法组合',
        body: '可以把城市游、工业研学和主题路线结合成半日、一日或多日安排，体验丰富且节奏灵活。',
      },
    ],
    notes: [],
    faqs: [
      { question: '长春更适合自由行还是团体活动？', answer: '两类都适合，但如果涉及工业研学与企业参访，建议优先按团体或机构场景理解和安排。' },
      { question: '长春与吉林其他目的地如何衔接？', answer: '长春适合作为理解吉林的入口城市，后续可继续延展到长白山、延边和 自驾攻略等专题。' },
    ],
    ctas: [
      { label: '查看工业研学专题', href: '/study-tours' },
      { label: '查看城市路线建议', href: '/study-tours/changchun-industrial-route' },
      { label: '咨询团体参访', href: '/cooperation' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'changchun-aerial', alt: '长春市区航拍全景', altEn: 'Changchun aerial panorama' },
      { id: 'changchun-puppet-palace', alt: '伪满皇宫建筑群', altEn: 'Puppet Emperor Palace complex' },
      { id: 'changchun-chiyou', alt: '这有山室内商业综合体', altEn: 'Chi You Mountain indoor mall' },
      { id: 'changchun-tram', alt: '54路有轨电车', altEn: 'Route 54 heritage tram' },
    ],
    localizations: {
      en: {
        title: 'Changchun Travel & City Guide',
        description: 'Understanding Changchun from urban culture, industrial heritage, family and group experiences, helping users find their ideal entry point to Jilin.',
        intro: 'Changchun is an ideal first stop for Jilin travel. It offers urban cultural experiences and can extend to industrial study tours, corporate visits, and family routes.',
      },
      ja: {
        title: '長春旅游と都市遊びガイド',
        description: '都市文旅、工業文明、親子と団体体験の視点から長春を理解し、ユーザーに合った吉林の入口都市を見つけてもらうためのガイド。',
        intro: '長春は吉林旅行の第一拠点に最適です。都市文旅と生活体験があり、工業研修や企業訪問、親子ルートにも延伸できます。',
      },
      ko: {
        title: '창춘 여행 및 도시 가이드',
        description: '도시 문화 관광, 산업 문명, 가족 및 단체 체험 관점에서 창춘을 이해하고 사용자가 자신의 입구에 적합한 지린 진입 도시를 찾도록 돕습니다.',
        intro: '창춘은 지린 여행의 첫 번째 거점으로 적합합니다. 도시文旅과 생활 체험이 있으며, 산업 연수, 기업 방문, 가족 루트으로도 확장할 수 있습니다.',
      },
    },
  },
  {
    section: 'destinations',
    slug: 'changbai-mountain',
    pathname: '/destinations/changbai-mountain',
    title: '长白山旅游与四季玩法指南',
    shortTitle: '长白山',
    description: '围绕长白山的四季差异、适合人群、官方预约说明和行程时长，建立吉林代表性目的地的说明入口。',
    eyebrow: 'Changbai Mountain',
    intro: '长白山是吉林最具代表性的自然型目的地之一，用户更关心的是四季差异、预约规则和适合安排几天。',
    audience: ['自然景观爱好者', '冰雪与避暑游客', '自驾与线路型用户'],
    highlights: ['四季体验差异明显', '适合与自驾及区域路线联动', '官方预约与服务说明非常重要'],
    sections: [
      {
        title: '为什么长白山值得去',
        body: '长白山的核心不是单一景点，而是季节变化、自然景观和整体出行安排的组合体验。',
      },
      {
        title: '四季玩法差异',
        body: '冬季偏冰雪和特色季节体验，夏季偏避暑和自然景观，春秋则更适合路线型与摄影型用户。',
      },
      {
        title: '官方服务与预约说明',
        body: '长白山景区实行预约制，游客需提前在官方平台预约方可入园，合理安排时间是出行关键。',
      },
    ],
    notes: [],
    faqs: [
      { question: '长白山适合玩几天？', answer: '长白山四季皆宜游玩，时间长短取决于季节和想体验的内容，通常2-4天较为常见。' },
      { question: '平台能直接代替官方预约吗？', answer: '当前不替代官方入口，主要提供说明、引导和问题梳理。' },
    ],
    ctas: [
      { label: '查看官方服务入口', href: '/official-services/jilin' },
      { label: '查看吉林目的地', href: '/destinations' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'changbai-tianchi-summer', alt: '长白山天池夏季全景', altEn: 'Changbai Mountain Tianchi summer panorama' },
      { id: 'changbai-tianchi-winter', alt: '天池冬季冰封景观', altEn: 'Tianchi winter frozen landscape' },
      { id: 'changbai-snow', alt: '滑雪场全貌', altEn: 'Ski resort overview' },
      { id: 'changbai-hot-spring', alt: '长白山温泉雾气', altEn: 'Changbai hot spring mist' },
      { id: 'changbai-fall', alt: '秋季五花山色', altEn: 'Autumn mountain colors' },
      { id: 'changbai-mist', alt: '雾凇奇观', altEn: 'Rime ice formations' },
    ],
    localizations: {
      en: {
        title: 'Changbai Mountain Travel & Four Seasons Guide',
        description: 'Building an information gateway for Jilins most representative destination, covering seasonal differences, suitable visitors, official booking instructions, and trip duration planning.',
        intro: 'Changbai Mountain is one of Jilins most representative natural destinations. Visitors are most concerned about seasonal differences, booking rules, and how many days to plan.',
      },
      ja: {
        title: '長白山旅游と四季過ごしガイド',
        description: '長白山の四季の違い、適合人群、公式予約説明、旅程日数をめぐくり、吉林の代表的目的地の入り口を構築します。',
        intro: '長白山は吉林最具代表性のある自然目的地のひとつです。訪問者が最も関心を持つのは四季の違い、予約規則、そして何日間過ごすべきかということです。',
      },
      ko: {
        title: '장백산 여행 및 사계절 가이드',
        description: '장백산의 사계절 차이, 적합한 인원, 공식 예약 설명, 일정 기간을 중심으로 지린 대표 목적지의 설명 입구를 구축합니다.',
        intro: '장백산은 지린最具대표적인 자연 목적지입니다. 방문객들이 가장 관심 있는 것은 사계절 차이, 예약 규칙, 며칠을安排하는 것이 좋습니다.',
      },
    },
  },
  {
    section: 'destinations',
    slug: 'yanbian',
    pathname: '/destinations/yanbian',
    title: '延边旅游与边境文化体验指南',
    shortTitle: '延边',
    description: '围绕延边的边境文化、美食体验和路线延展能力，建立更适合内容与主题玩法的区域入口。',
    eyebrow: 'Yanbian',
    intro: '延边是吉林最具特色的边境地区，以朝鲜族文化、边境风光和特色美食著称，适合深度体验。',
    audience: ['对边境文化感兴趣的游客', '喜欢美食与区域体验的用户', '想延展到自驾与线路玩法的内容型用户'],
    highlights: ['边境文化与地域体验鲜明', '适合与 自驾攻略、自驾和主题玩法联动', '美食、生活方式和路线感都很强'],
    sections: [
      {
        title: '延边的核心体验',
        body: '延边的吸引力来自朝鲜族文化、边境风光、特色美食和连贯的线路体验，而非单一景点。',
      },
      {
        title: '适合哪些用户',
        body: '延边适合喜欢边境文化、美食体验和线路探索的游客，也适合把文化、美食和路线结合理解。',
      },
      {
        title: '边境线路与主题玩法',
        body: '在平台的内容结构里，延边更适合和边境、自驾、自驾攻略等主题一起被组织。',
      },
    ],
    notes: [],
    faqs: [
      { question: '延边更适合什么样的旅行者？', answer: '更适合希望体验区域文化、美食、边境氛围和线路感的用户。' },
      { question: '延边和 自驾攻略有什么关系？', answer: '两者在边境体验和自驾主题上有较强联动，适合放在同一内容链路中理解。' },
    ],
    ctas: [
      { label: '查看边境与自驾主题', href: '/themes' },
      { label: '查看 自驾攻略', href: '/self-drive' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'yanbian-tumen', alt: '图们口岸边境线', altEn: 'Tumen border crossing' },
      { id: 'yanbian-city', alt: '延吉市城市风貌', altEn: 'Yanji cityscape' },
      { id: 'yanbian-food', alt: '延边美食组合', altEn: 'Yanbian food combination' },
      { id: 'yanbian-costume', alt: '朝鲜族传统服饰', altEn: 'Korean traditional costumes' },
      { id: 'yanbian-kidalce', alt: '春季金达莱花海', altEn: 'Korean rhododendron in spring' },
    ],
    localizations: {
      en: {
        title: 'Yanbian Travel & Border Culture Experience Guide',
        description: 'Building a regional gateway for content-driven tourism and themed experiences around Yanbians border culture, culinary delights, and route extensions.',
        intro: 'Yanbian is ideal for themed destination experiences focused on border culture, cuisine, and route-based activities. Its not a single attraction but works best combined with themed activities and self-driving routes.',
      },
      ja: {
        title: '延辺旅游と国境文化体験ガイド',
        description: '延辺の边境文化、グルメ体験、ルート延展能力を中心に、コンテンツ引流とテーマ玩法のための地域入口を構築します。',
        intro: '延辺は边境文化、グルメ、ルート体験为主题とした目的地に最適です。单一景点ではなく、テーマ玩法や自驾ルートと一緒に理解するのがおすすめです。',
      },
      ko: {
        title: '연변 여행 및 국경 문화 체험 가이드',
        description: '연변의 국경 문화, 미식 체험, 노선 확장 능력을 중심으로 콘텐츠 유도 및 테마玩法을 위한 지역 입구를 구축합니다.',
        intro: '연변은 국경 문화, 미식, 노선 체험을 위한 주제형 목적지에 적합합니다. 단일 관광지가 아니라 테마玩法이나自驾 노线和 함께 이해하는 것이 좋습니다.',
      },
    },
  },
  {
    section: 'study-tours',
    slug: 'changchun-industrial',
    pathname: '/study-tours/changchun-industrial',
    title: '长春工业研学介绍页',
    shortTitle: '长春工业研学',
    description: '把长春工业文明、一汽红旗、中车长客和企业参访资源整理成一个工业研学入口。',
    eyebrow: 'Industrial Study Tours',
    intro: '长春是中国汽车工业和轨道交通的重要基地，工业研学资源丰富，非常适合学校、机构和团队参访体验。',
    audience: ['学校和研学机构', '企业与商协会参访', '政企考察与城市工业体验用户'],
    highlights: ['工业文明与品牌资源集中', '适合学生、企业和政企多种对象', '可拆成公开说明页与定制咨询页'],
    sections: [
      {
        title: '为什么长春适合工业研学',
        body: '长春具备工业文明、品牌文化和高辨识度资源，适合做说明型、路线型和定制型内容。',
      },
      {
        title: '可覆盖的主题方向',
        body: '包括学生研学、企业参访、政企考察和城市工业文明体验等不同方向。',
      },
      {
        title: '线路组织方式',
        body: '长春工业研学提供多种定制化参访方案，适合不同规模和需求的团队。',
      },
    ],
    notes: [],
    faqs: [
      { question: '工业研学适合哪些对象？', answer: '学校、机构、企业和政企考察都可以根据不同目标来安排。' },
      { question: '平台当前能提供什么？', answer: '前期重点提供资源说明、线路理解和咨询，不直接承诺统一售卖。' },
    ],
    ctas: [
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '查看中车长客参访', href: '/study-tours/crrc-changchun' },
      { label: '咨询定制线路', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'study-tours',
    slug: 'faw-hongqi',
    pathname: '/study-tours/faw-hongqi',
    title: '一汽红旗工业研学介绍页',
    shortTitle: '一汽红旗研学',
    description: '围绕一汽与红旗的工业文明、品牌文化和研学价值，建立当前最适合公开主推的工业研学内容页。',
    eyebrow: 'FAW Hongqi',
    intro: '一汽红旗是中国汽车工业的代表品牌，集汽车制造、企业文化和品牌展示于一体，是难得的工业研学资源。',
    audience: ['学生研学团体', '品牌与工业文明兴趣用户', '企业与机构参访用户'],
    highlights: ['品牌辨识度强', '工业文明与城市名片结合紧密', '更适合做说明与咨询，而非先做强销售'],
    sections: [
      {
        title: '一汽 / 红旗研学看什么',
        body: '核心是工业文明、品牌文化、制造认知和城市名片的组合体验。',
      },
      {
        title: '建议时长与线路组织',
        body: '更适合按半日或一日内容理解，实际参访方式以官方与合作安排为准。',
      },
      {
        title: '官方信息与说明',
        body: '页面强调说明和引导，不对未确认规则做过度承诺。',
      },
    ],
    notes: [],
    faqs: [
      { question: '一汽红旗研学更适合什么人群？', answer: '适合学校研学、企业参访和对工业文明、品牌文化感兴趣的用户。' },
      { question: '平台能直接安排所有接待细节吗？', answer: '当前以说明和咨询为主，具体安排需要结合官方或合作方规则。' },
    ],
    ctas: [
      { label: '咨询研学安排', href: '/cooperation' },
      { label: '查看长春工业研学', href: '/study-tours/changchun-industrial' },
      { label: '查看企业参访说明', href: '/study-tours/crrc-changchun' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'faw-hongqi-history', alt: '红旗历史车型展列', altEn: 'Hongqi historical vehicles exhibition' },
      { id: 'faw-hongqi-factory', alt: '红旗现代化生产车间', altEn: 'Hongqi modern production line' },
      { id: 'faw-hongqi-h9', alt: '红旗H9外观', altEn: 'Hongqi H9 exterior' },
      { id: 'faw-hongqi-brand', alt: '红旗品牌文化墙', altEn: 'Hongqi brand culture wall' },
    ],
  },
  {
    section: 'study-tours',
    slug: 'crrc-changchun',
    pathname: '/study-tours/crrc-changchun',
    title: '中车长客企业参访说明页',
    shortTitle: '中车长客参访',
    description: '把中车长客定位成高价值定制资源，为企业、机构和定制研学场景提供说明与咨询入口。',
    eyebrow: 'CRRC Changchun',
    intro: '中车长客更适合做高价值定制说明页，而不是面向散客的标准化公开产品页。',
    audience: ['企业与商协会', '机构定制参访', '高价值研学与行业交流用户'],
    highlights: ['更适合定制型需求', '高端制造与行业认知价值强', '应避免公开承诺散客标准产品'],
    sections: [
      {
        title: '中车长客参访的价值',
        body: '重点在于先进制造、行业认知、组织型参访和高质量沟通场景。',
      },
      {
        title: '更适合什么类型参访',
        body: '更适合企业、机构、学校或政企团队按目标做定制沟通，而不是标准化散客产品。',
      },
      {
        title: '当前服务方式说明',
        body: '是说明边界和引导定制咨询，不做过度承诺。',
      },
    ],
    notes: [],
    faqs: [
      { question: '中车长客是否适合散客报名？', answer: '当前更适合作为企业、机构和定制型需求的说明页，不建议当作标准散客产品理解。' },
      { question: '平台当前可以提供什么帮助？', answer: '主要是资源说明、适配判断和定制咨询入口。' },
    ],
    ctas: [
      { label: '提交企业参访咨询', href: '/cooperation' },
      { label: '查看工业研学专题', href: '/study-tours' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'crrc-production', alt: '中车长客高速列车生产线', altEn: 'CRRC high-speed train production line' },
      { id: 'crrc-fuxing', alt: '复兴号标准动车组', altEn: 'Fuxing EMU' },
      { id: 'crrc-exhibition', alt: '中车长客企业展厅', altEn: 'CRRC exhibition hall' },
      { id: 'industrial-route-map', alt: '工业文明线路示意图', altEn: 'Industrial route map' },
    ],
  },
  {
    section: 'study-tours',
    slug: 'changchun-industrial-route',
    pathname: '/study-tours/changchun-industrial-route',
    title: '长春工业文明线路说明页',
    shortTitle: '工业文明线路',
    description: '把长春工业研学和城市体验之间搭桥，形成可阅读、可理解、可咨询的线路型内容页。',
    eyebrow: 'Industrial Route',
    intro: '长春工业文明线路将一汽、红旗、中车长客等核心工业资源串联起来，适合希望系统了解工业文明的游客。',
    audience: ['学校与机构路线组织者', '企业和政企考察用户', '想理解长春工业文明体验的内容型用户'],
    highlights: ['给工业研学和城市体验搭桥', '适合做半日与一日结构说明', '可与一汽、红旗和城市玩法联动'],
    sections: [
      {
        title: '线路适合什么用户',
        body: '适合对工业文明有兴趣、需要团体组织或希望把城市体验与研学结合起来的用户。',
      },
      {
        title: '半日 / 一日建议',
        body: '线路涵盖工业历史、品牌文化、生产制造等维度，信息丰富且动线清晰。',
      },
      {
        title: '可结合哪些资源',
        body: '可以结合一汽红旗参访和城市文化体验一起规划，时间充裕的团队可将多条线路组合安排。',
      },
    ],
    notes: [],
    faqs: [
      { question: '这条线路是标准产品吗？', answer: '建议提前咨询了解具体参访流程和预约方式，以便合理安排时间。' },
      { question: '能和城市观光一起安排吗？', answer: '可以，长春工业文明线路本身就适合与城市体验结合理解。' },
    ],
    ctas: [
      { label: '咨询线路定制', href: '/cooperation' },
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '查看长春城市玩法', href: '/destinations/changchun' },
    ],
    notes: [],
  },
  {
    section: 'self-drive',
    slug: 'overview',
    pathname: '/self-drive/overview',
    title: '吉林 自驾攻略路线概览',
    shortTitle: '自驾攻略 概览',
    description: '331国道吉林段全长约1390公里，途经延边、珲春、图们等重要节点，是自驾吉林东部边境的经典路线。',
    eyebrow: '自驾攻略 Overview',
    intro: '331国道吉林段是中国最长的边境公路，沿途风光壮阔，是自驾游和摄影爱好者的热门目的地。',
    audience: ['第一次接触 331 的用户', '自驾与内容型游客', '想进一步了解驿站和补给的人群'],
    highlights: ['建立线路入口认知', '给后续驿站与补给页分流', '适合作为主题专题线的起点'],
    sections: [
      {
        title: '自驾攻略 吉林段是什么',
        body: '331国道吉林段途经森林、湖泊、边境村落和特色城镇，是吉林省重要的旅游资源带。',
      },
      {
        title: '推荐浏览与体验方式',
        body: '建议根据时间安排选择不同路段和节奏，延吉至珲春、图们段最为经典。',
      },
      {
        title: '季节建议',
        body: '自驾攻略 的体验高度依赖季节，当前会重点从内容说明和路线理解入手。',
      },
    ],
    notes: [],
    faqs: [
      { question: '自驾攻略 吉林段适合什么类型游客？', answer: '更适合自驾、摄影、线路型和主题体验型用户。' },
      { question: '先看哪一页最合适？', answer: '建议先看路线概览，再看怎么玩、驿站服务和补给建议。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
      { label: '提交路线咨询', href: '/cooperation' },
    ],
    notes: [],
    mediaRequirements: [
      { id: 'g331-signage', alt: 'G331标识牌与起点', altEn: 'G331 signage and starting point' },
      { id: 'g331-aerial', alt: '边境公路蜿蜒航拍', altEn: 'Border highway aerial view' },
      { id: 'g331-border', alt: '中朝边境界河', altEn: 'China-North Korea border river' },
      { id: 'g331-station', alt: '典型驿站外观', altEn: 'Highway station exterior' },
      { id: 'g331-accommodation', alt: '特色边境住宿', altEn: 'Border homestay' },
      { id: 'g331-vehicle', alt: '自驾车辆与公路', altEn: 'Road trip vehicle on highway' },
    ],
  },
  {
    section: 'self-drive',
    slug: 'how-to-travel',
    pathname: '/self-drive/how-to-travel',
    title: '吉林 自驾攻略怎么玩',
    shortTitle: '自驾攻略 怎么玩',
    description: '围绕 331 吉林段的玩法逻辑、适合人群、时长建议和季节差异，形成更接近真实出行决策的说明页。',
    eyebrow: 'How to Travel',
    intro: '331国道吉林段适合自驾、摄影和深度游爱好者，可以根据时间灵活安排行程。',
    audience: ['自驾游客', '摄影和线路型用户', '准备做多日行程规划的人群'],
    highlights: ['建立路线感和主题感', '提供玩法方式而非直接售卖', '适合作为自驾专题核心页'],
    sections: [
      {
        title: '为什么 331 值得走',
        body: '331国道的价值在于连贯的边境风光、多元的文化体验和丰富的景观变化，而非单一景点。',
      },
      {
        title: '适合几天',
        body: '自驾331国道的行程安排应综合考虑路线长度、季节、停留节点和个人偏好，建议提前规划节奏。',
      },
      {
        title: '不同季节建议',
        body: '不同季节在路况、景观、补给和停留方式上会有明显差异。',
      },
    ],
    notes: [],
    faqs: [
      { question: '自驾攻略 更适合几天自驾？', answer: '通常需要根据季节、停留节奏和个人兴趣来安排，建议多日行程能更好体验路线特色。' },
      { question: '自驾攻略 适合什么样的游客？', answer: '更适合喜欢自驾、线路、摄影和边境体验的用户。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
      { label: '咨询路线安排', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'self-drive',
    slug: 'station-services',
    pathname: '/self-drive/station-services',
    title: '自驾攻略 驿站服务说明',
    shortTitle: '驿站服务',
    description: '331国道吉林段设有多个综合服务驿站，提供停车、休整、餐饮、住宿、补给和旅游咨询等服务。',
    eyebrow: 'Station Services',
    intro: '331国道沿线的驿站是自驾途中的重要补给站，设施日趋完善，可满足各类出行需求。',
    audience: ['自驾用户', '车队与团队组织者', '驿站合作方与沿线商家'],
    highlights: ['驿站设施完善，可满足各类自驾出行需求', '兼顾用户与合作方两类视角', '后续可延伸到合作入驻和服务转化'],
    sections: [
      {
        title: '驿站能提供什么',
        body: '可围绕停车、休整、餐饮、住宿、补给和团队服务来理解驿站价值。',
      },
      {
        title: '常见停留场景',
        body: '对自驾用户、摄影用户和团队组织者来说，驿站更像连续线路中的服务节点。',
      },
      {
        title: '合作与接入说明',
        body: '部分驿站已具备团队接待和定制服务能力，可通过合作咨询提前预约。',
      },
    ],
    notes: [],
    faqs: [
      { question: '驿站服务主要覆盖哪些需求？', answer: '主要覆盖停车、休整、补给、住宿、餐饮和团队停留等需求。' },
      { question: '现在能直接预订驿站服务吗？', answer: '可以通过合作咨询提交需求，平台将协助对接合适的驿站资源方。' },
    ],
    ctas: [
      { label: '咨询驿站合作', href: '/cooperation' },
      { label: '查看 331 路线', href: '/self-drive/how-to-travel' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
    ],
    notes: [],
  },
  {
    section: 'self-drive',
    slug: 'supplies-and-stays',
    pathname: '/self-drive/supplies-and-stays',
    title: '自驾攻略 自驾补给与住宿建议',
    shortTitle: '补给与住宿',
    description: '面向真实出行用户，围绕出发准备、沿线补给、住宿判断和团队注意事项提供说明型信息。',
    eyebrow: 'Supplies and Stays',
    intro: '自驾331国道需要提前做好出发准备，沿线补给和住宿安排是顺畅出行的关键。',
    audience: ['准备自驾出行的游客', '团队与车队组织者', '希望降低准备成本的实用型用户'],
    highlights: ['更接近真实出行问题', '适合提高保存与咨询意愿', '与驿站服务形成互补'],
    sections: [
      {
        title: '出发前建议准备什么',
        body: '用户最先需要的不是购买，而是明确出发前应做哪些准备。',
      },
      {
        title: '沿线补给如何考虑',
        body: '补给应根据路线特点、季节条件和停留节奏综合安排，合理规划能提升自驾体验。',
      },
      {
        title: '团队与车队需要注意什么',
        body: '团队用户在补给、停留、住宿和沟通方式上有不同于散客的关注点。',
      },
    ],
    notes: [],
    faqs: [
      { question: '自驾攻略 自驾需要重点准备哪些方面？', answer: '建议优先理解路线、季节、停留节奏、补给方式和住宿安排。' },
      { question: '团队出行和个人自驾有什么不同？', answer: '团队更需要关注停留节点、统一补给、住宿组织和连续服务。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看 331 怎么玩', href: '/self-drive/how-to-travel' },
      { label: '提交路线咨询', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'themes',
    slug: 'ice-snow',
    pathname: '/themes/ice-snow',
    title: '冰雪吉林主题玩法说明',
    shortTitle: '冰雪吉林',
    description: '围绕长白山、冬季线路、城市冰雪体验和季节玩法，建立吉林冰雪内容的主题入口。',
    eyebrow: 'Ice & Snow',
    intro: '吉林冬季冰雪资源丰富，长白山、雾凇、滑雪场等构成独特的冰雪体验体系。',
    audience: ['冬季旅游用户', '亲子和线路型游客', '想理解吉林冬季特色的人群'],
    highlights: ['季节辨识度高', '可联动长白山与城市体验', '适合做高传播主题入口'],
    sections: [
      {
        title: '为什么先看冰雪主题',
        body: '吉林冰雪游的核心在于理解冬季特色和不同区域的冰雪体验差异，再选择合适的目的地。',
      },
      {
        title: '适合搭配哪些目的地',
        body: '长白山、长春的滑雪场和雾凇景观等都是吉林冰雪游的重要组成部分。',
      },
      {
        title: '平台当前提供什么',
        body: '冰雪游需要提前了解各目的地的冬季特色和开放情况，合理规划能获得更好的体验。',
      },
    ],
    notes: [],
    faqs: [
      { question: '冰雪吉林从哪里先开始玩？', answer: '建议先了解长白山冬季玩法和目的地特色，再结合路线和攻略深入规划。' },
      { question: '冰雪产品怎么购买？', answer: '冰雪产品预约和购买以官方渠道为准，可通过平台了解玩法差异和推荐组合。' },
    ],
    ctas: [
      { label: '查看长白山玩法', href: '/destinations/changbai-mountain' },
      { label: '查看主题玩法', href: '/themes' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
  },
  {
    section: 'themes',
    slug: 'industrial-civilization',
    pathname: '/themes/industrial-civilization',
    title: '工业文明主题玩法说明',
    shortTitle: '工业文明',
    description: '把长春城市体验、一汽红旗、中车长客和工业文明线路组织成吉林文旅的差异化主题线。',
    eyebrow: 'Industrial Civilization',
    intro: '长春的工业文明独树一帜，从一汽到中车长客，工业遗存与现代化生产交织成独特的城市景观。',
    audience: ['学校与研学机构', '企业与商协会', '对工业文明有兴趣的内容型游客'],
    highlights: ['差异化强', '长春资源集中', '适合内容与咨询双驱动'],
    sections: [
      {
        title: '这个主题的独特价值',
        body: '工业文明主题把长春与其他城市旅游区分开来，形成高辨识度的旅行主题。',
      },
      {
        title: '适合怎么组织阅读路径',
        body: '建议先了解工业文明主题，再进入一汽红旗、中车长客和工业文明线路等具体页面深入了解。',
      },
      {
        title: '转化方式',
        body: '工业研学资源成熟，可以通过咨询预约获取定制化参访体验。',
      },
    ],
    notes: [],
    faqs: [
      { question: '工业文明主题更适合游客还是团体？', answer: '团体可获得更完整的定制体验，个人游客也能深度了解工业文化。' },
      { question: '主题页和工业研学页有什么区别？', answer: '主题页侧重于文化理解和路线规划，工业研学页则聚焦具体参访资源和场景体验。' },
    ],
    ctas: [
      { label: '查看工业研学', href: '/study-tours' },
      { label: '查看长春城市页', href: '/destinations/changchun' },
      { label: '咨询合作', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'themes',
    slug: 'border-and-yanbian',
    pathname: '/themes/border-and-yanbian',
    title: '边境与延边体验主题说明',
    shortTitle: '边境与延边',
    description: '围绕延边、边境文化、美食体验和线路延展能力，建立吉林差异化的区域主题入口。',
    eyebrow: 'Border & Yanbian',
    intro: '延边地区融合了朝鲜族文化、边境风光和特色美食，是吉林最具地域特色的旅行目的地。',
    audience: ['内容型游客', '美食和区域文化兴趣用户', '自驾与线路型用户'],
    highlights: ['地域文化辨识度强', '适合与 自驾攻略联动', '能承接内容和路线双重需求'],
    sections: [
      {
        title: '为什么先用主题理解',
        body: '延边不是单一景点，而是融合了文化、美食、边境风光和线路体验的综合目的地。',
      },
      {
        title: '适合搭配哪些内容',
        body: '延边目的地、331路线和美食体验可以组合成一条完整的边境文化旅行路线。',
      },
      {
        title: '平台服务说明',
        body: '延边区域玩好吃好需要提前了解文化背景和出行节奏，合理规划能获得更深度的体验。',
      },
    ],
    notes: [],
    faqs: [
      { question: '边境与延边适合几天安排？', answer: '通常更适合按线路和主题理解，具体天数应结合路线和季节来判断。' },
      { question: '应该先看延边还是 331？', answer: '如果更关心区域体验先看延边，如果更关心自驾路线先看 331。' },
    ],
    ctas: [
      { label: '查看延边目的地', href: '/destinations/yanbian' },
      { label: '查看 自驾攻略', href: '/self-drive/overview' },
      { label: '查看主题玩法', href: '/themes' },
    ],
    notes: [],
  },
  {
    section: 'themes',
    slug: 'roadtrip-331',
    pathname: '/themes/roadtrip-331',
    title: '自驾攻略 自驾与驿站主题说明',
    shortTitle: '自驾攻略 自驾',
    description: '331国道自驾将路线概览、玩法推荐、驿站服务和补给住宿串联起来，为自驾游客提供完整参考。',
    eyebrow: 'Roadtrip 331',
    intro: '331国道自驾是吉林东部最具吸引力的旅行方式之一，沿途景观丰富、服务配套日趋完善。',
    audience: ['自驾游客', '车队和团队组织者', '摄影和边境线路用户'],
    highlights: ['服务延展空间大', '可接驿站合作', '适合形成内容到咨询闭环'],
    sections: [
      {
        title: '为什么 331 是平台重点',
        body: '331国道不只是风景路线，更是串联沿途驿站、服务和文化的综合体验线。',
      },
      {
        title: '阅读顺序建议',
        body: '建议从路线概览开始，再了解玩法、驿站服务和补给住宿，形成完整的自驾规划。',
      },
      {
        title: '当前转化方式',
        body: '自驾331国道可以先了解路线和玩法，再通过咨询获取定制化建议和资源对接。',
      },
    ],
    notes: [],
    faqs: [
      { question: '自驾攻略 自驾主题和路线概览有什么不同？', answer: '主题页是上位入口，路线概览则更聚焦线路理解。' },
      { question: '能直接购买331自驾线路产品吗？', answer: '331自驾目前以路线咨询和资源对接为主，定制服务可通过合作咨询了解。' },
    ],
    ctas: [
      { label: '查看 331 路线概览', href: '/self-drive/overview' },
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '咨询路线安排', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'guides',
    slug: 'changchun-industrial-content-line',
    pathname: '/guides/changchun-industrial-content-line',
    title: '长春工业研学内容线说明',
    shortTitle: '工业研学内容线',
    description: '说明如何把长春城市入口、一汽红旗和工业文明线路组织成一条持续更新的内容线。',
    eyebrow: 'Guide',
    intro: '长春工业研学内容线整合了一汽、红旗、中车长客等核心资源，为游客和研学团队提供系统化参考。',
    audience: ['内容运营人员', '研学咨询用户', '想系统理解工业研学资源的人群'],
    highlights: ['适合做专题持续更新', '能承接高价值咨询', '与长春城市页形成互补'],
    sections: [
      {
        title: '内容线的核心结构',
        body: '长春城市页作为入口，一汽红旗和中车长客作为核心资源，工业文明线路作为体验串联，共同构成完整的研学体系。',
      },
      {
        title: '为什么要用内容线组织',
        body: '系统化的内容组织有助于游客更好地理解和规划研学行程。',
      },
      {
        title: '后续更新方向',
        body: '内容线持续更新，欢迎关注最新动态和研学资源。',
      },
    ],
    notes: [],
    faqs: [
      { question: '为什么要系统化组织研学内容？', answer: '系统化的内容组织比零散资讯更利于游客理解、搜索查找和深度咨询。' },
      { question: '内容线和单页资源页如何配合？', answer: '内容线负责整体组织和引导，单页负责具体资源和场景说明。' },
    ],
    ctas: [
      { label: '查看长春工业研学', href: '/study-tours/changchun-industrial' },
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '咨询合作', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'guides',
    slug: 'self-drive-content-line',
    pathname: '/guides/self-drive-content-line',
    title: '自驾攻略 自驾玩法内容线说明',
    shortTitle: '自驾攻略 内容线',
    description: '围绕 331 路线概览、怎么玩、驿站服务和补给建议，建立连续型内容组织方式。',
    eyebrow: 'Guide',
    intro: '331国道自驾内容线整合了路线概览、玩法推荐、驿站服务和补给住宿，为自驾游客提供系统参考。',
    audience: ['自驾用户', '路线型内容运营者', '合作与咨询线索用户'],
    highlights: ['连续型内容结构清晰', '适合和驿站服务联动', '可沉淀高频 FAQ'],
    sections: [
      {
        title: '内容线由哪些页面组成',
        body: '由路线概览、玩法、驿站和补给等页面组成，形成完整的自驾参考链路。',
      },
      {
        title: '为什么适合做平台主线',
        body: '因为它天然涵盖路线、服务和延伸体验三类内容。',
      },
      {
        title: '后续可增加什么',
        body: '可增加季节攻略、摄影路线和特色体验更新。',
      },
    ],
    notes: [],
    faqs: [
      { question: '331自驾内容线应该先看哪一页？', answer: '建议先看路线概览，再根据需求选择玩法、驿站和补给页深入了解。' },
      { question: '331自驾内容后续会更新吗？', answer: '会持续更新季节攻略、路线信息和实用建议。' },
    ],
    ctas: [
      { label: '查看 331 路线概览', href: '/self-drive/overview' },
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
  },
  {
    section: 'guides',
    slug: 'official-service-content-line',
    pathname: '/guides/official-service-content-line',
    title: '官方说明内容线说明',
    shortTitle: '官方说明内容线',
    description: '吉林文旅官方入口说明帮助游客了解景区预约规则和官方购票渠道，避免因信息不对称带来不便。',
    eyebrow: 'Guide',
    intro: '吉林主要景区的官方预约和购票规则有明确渠道，本页面帮助游客快速找到正确的官方入口。',
    audience: ['首次使用官方入口的游客', '对规则不熟悉的用户', '需要建立平台信任感的内容链路'],
    highlights: ['建立平台边界感', '提升可信度', '适合沉淀 FAQ 和 AI 知识域'],
    sections: [
      {
        title: '为什么这条内容线重要',
        body: '官方入口类问题关系出行安排，提前了解规则能让行程更顺畅。',
      },
      {
        title: '如何组织说明内容',
        body: '优先提供入口说明、常见问题和注意事项，帮助游客顺利使用官方服务。',
      },
      {
        title: '和 AI 客服的关系',
        body: '本页面内容是官方服务相关问题的重要参考。',
      },
    ],
    notes: [],
    faqs: [
      { question: '为什么官方说明需要专门整理？', answer: '因为它能帮助游客降低理解成本，避免因信息不对称导致出行受阻。' },
      { question: '平台会直接替代官方吗？', answer: '平台不替代官方服务，而是提供说明、引导和咨询支持。' },
    ],
    ctas: [
      { label: '查看官方服务说明', href: '/official-services/jilin' },
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
  },
  {
    section: 'guides',
    slug: 'signal-scout-and-faq',
    pathname: '/guides/signal-scout-and-faq',
    title: '趋势选题与 FAQ 更新说明',
    shortTitle: '趋势与 FAQ',
    description: '说明平台如何用趋势发现、FAQ 沉淀和 AI 问题回流，持续更新吉林文旅内容。',
    eyebrow: 'Signals & FAQ',
    intro: '本页面内容基于实际旅行需求和游客反馈整理，持续更新以保持参考价值。',
    audience: ['内容运营人员', '项目管理者', '希望理解平台更新逻辑的合作方'],
    highlights: ['内容基于需求和反馈持续更新', 'FAQ 同时服务游客和 AI 助手', '有利于搜索索引和长期内容积累'],
    sections: [
      {
        title: '更新来源是什么',
        body: '主要来自多平台趋势发现、高频咨询问题和已有内容线的扩展。',
      },
      {
        title: '为什么 FAQ 很重要',
        body: 'FAQ 整理自真实旅行需求，既能帮助游客解答常见问题，也能作为出行参考。',
      },
      {
        title: '如何形成持续更新',
        body: '通过需求收集、问题整理和内容更新联动，保持页面参考价值。',
      },
    ],
    notes: [],
    faqs: [
      { question: '内容更新的依据是什么？', answer: '主要基于实际旅行需求、高频问题和内容优化，而不是随意堆砌。' },
      { question: 'FAQ 有什么特殊价值？', answer: '因为 FAQ 能同时解答游客疑问、帮助搜索索引和支持 AI 助手。' },
    ],
    ctas: [
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '查看 AI 助手说明', href: '/ai-assistant' },
      { label: '查看合作咨询', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'shop',
    slug: 'tourism-service-pack',
    pathname: '/shop/tourism-service-pack',
    title: '文旅服务类产品说明',
    shortTitle: '文旅服务',
    description: '商城展示文旅服务类产品，包括研学资料包、路线服务包和咨询型服务产品。',
    eyebrow: 'Travel Services',
    intro: '文旅服务类产品涵盖研学包、路线定制和咨询型服务，可满足不同团队和个人的出行需求。',
    audience: ['团体与机构用户', '路线和研学咨询用户', '希望了解服务产品的潜在客户'],
    highlights: ['提供多种文旅服务类产品', '可与咨询链路灵活结合', '帮助用户了解文旅服务方向'],
    sections: [
      {
        title: '服务类产品包括什么',
        body: '可包括研学资料包、路线服务包、说明型服务和咨询型文旅产品。',
      },
      {
        title: '为什么先做服务类说明',
        body: '因为它更接近平台已有能力，也更适合通过咨询和人工接管逐步转化。',
      },
      {
        title: '服务说明',
        body: '文旅服务类产品可通过合作咨询了解详情和预约方式。',
      },
    ],
    notes: [],
    faqs: [
      { question: '现在可以直接购买吗？', answer: '可通过合作咨询了解详情，平台将协助对接服务提供方。' },
      { question: '为什么文旅服务类产品更适合优先发展？', answer: '因为它更贴近现有的资源组织和咨询服务能力。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '提交咨询', href: '/cooperation' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
  },
  {
    section: 'shop',
    slug: 'creative-products',
    pathname: '/shop/creative-products',
    title: '吉林地方文创说明',
    shortTitle: '地方文创',
    description: '围绕吉林地方文创和城市文化衍生方向做展示预备，先说明商品方向与边界。',
    eyebrow: 'Creative Products',
    intro: '吉林地方文创围绕城市文化、历史记忆和文旅场景进行创意开发，涵盖多种特色产品。',
    audience: ['文旅内容用户', '地方文化兴趣用户', '后续潜在购买用户'],
    highlights: ['提供地方文创产品展示和介绍', '展示吉林地方文化特色', '授权与供给边界必须提前说明'],
    sections: [
      {
        title: '文创方向可以怎么理解',
        body: '重点围绕地方文化、城市记忆和文旅场景延展，展现吉林独特的文化创意产品。',
      },
      {
        title: '为什么先展示后销售',
        body: '地方文创涉及供给、授权和品质把控，本页面展示产品方向和特色。',
      },
      {
        title: '后续适合接什么',
        body: '优先接可控、标准化、合规的地方文创产品，而不是高风险品牌周边。',
      },
    ],
    notes: [],
    faqs: [
      { question: '现在能购买吉林文创产品吗？', answer: '目前以产品展示和方向说明为主，销售通道正在筹备中。' },
      { question: '会有品牌授权周边产品吗？', answer: '只有在授权和合规条件明确后才会考虑引入。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '咨询合作', href: '/cooperation' },
    ],
    notes: [],
  },
  {
    section: 'shop',
    slug: 'northeast-specialties',
    pathname: '/shop/northeast-specialties',
    title: '东北特产商品方向说明',
    shortTitle: '东北特产',
    description: '面向未来商城模块，先说明适合平台承接的东北特产方向和轻量销售路径。',
    eyebrow: 'Northeast Specialties',
    intro: '东北特产涵盖食品、农产品、手工艺品等多个品类，是吉林旅行伴手礼的重要选择。',
    audience: ['对吉林伴手礼和特产感兴趣的用户', '后续潜在购买用户', '供应链与合作资源方'],
    highlights: ['适合作为轻量电商起步类目', '特产具有丰富的展示和内容空间', '更容易形成标准化的商品类目'],
    sections: [
      {
        title: '为什么东北特产适合商城预备阶段',
        body: '相比复杂旅游产品，东北特产更容易标准化、展示和做轻量电商尝试。',
      },
      {
        title: '适合先做哪些方向',
        body: '适合从伴手礼、礼盒和内容化展示的产品方向开始规划。',
      },
      {
        title: '特产类目说明',
        body: '展示东北特产类商品方向，包括伴手礼、礼盒等适合标准化展示的产品。',
      },
    ],
    notes: [],
    faqs: [
      { question: '东北特产会最先开放购买吗？', answer: '特产是较适合优先展示的方向，具体购买方式可通过合作咨询了解。' },
      { question: '现在能直接购买吗？', answer: '可通过合作咨询了解购买方式和预约流程。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '查看合作咨询', href: '/cooperation' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
    notes: [],
  },
  {
    section: 'official-services',
    slug: 'jilin',
    pathname: '/official-services/jilin',
    title: '吉林官方文旅与票务入口说明',
    shortTitle: '官方入口说明',
    description: '本页面整理吉林主要文旅景区的官方入口、预约方式和购票规则，帮助游客高效获取权威信息。',
    eyebrow: 'Official Services',
    intro: '游客在规划吉林行程时，了解官方渠道和预约规则非常重要，能避免因信息不对称耽误出行。',
    audience: ['首次使用吉林文旅服务的游客', '对预约和购票规则不熟悉的用户', '需要一个可信说明入口的人群'],
    highlights: ['平台不替代官方服务', '官方售卖和预约以官方渠道为准', '平台提供说明、梳理和咨询帮助'],
    sections: [
      {
        title: '为什么要先看官方入口说明',
        body: '很多游客首先需要了解规则和入口，再进入具体预约操作。',
      },
      {
        title: '当前可参考的官方服务类型',
        body: '围绕官方说明、理解指引和注意事项展开，帮助游客正确使用官方文旅服务。',
      },
      {
        title: '平台能提供什么帮助',
        body: '平台帮助游客降低信息查找成本，把复杂问题转成易于理解的说明和咨询。',
      },
    ],
    notes: [],
    faqs: [
      { question: '平台能直接帮我买票吗？', answer: '平台提供官方入口说明和预约引导，帮助游客更好地使用官方渠道。' },
      { question: '为什么有些服务必须以官方入口为准？', answer: '因为票务和预约规则以官方实时发布信息为准，平台提供梳理和理解支持。' },
    ],
    ctas: [
      { label: '询问 AI 助手', href: '/ai-assistant' },
      { label: '查看吉林目的地', href: '/destinations' },
      { label: '查看攻略与资讯', href: '/guides' },
    ],
    notes: [],
  },
];

export const allDetailPages = detailPages;

export const destinationPages = detailPages.filter((page) => page.section === 'destinations');
export const studyTourPages = detailPages.filter((page) => page.section === 'study-tours');
export const selfDrivePages = detailPages.filter((page) => page.section === 'self-drive');
export const officialServicePages = detailPages.filter((page) => page.section === 'official-services');
export const themePages = detailPages.filter((page) => page.section === 'themes');
export const guidePages = detailPages.filter((page) => page.section === 'guides');
export const shopPages = detailPages.filter((page) => page.section === 'shop');

export const findDetailPage = (section: DetailPage['section'], slug: string) =>
  detailPages.find((page) => page.section === section && page.slug === slug);
