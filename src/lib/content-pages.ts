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
    description: '从城市文旅、工业文明、亲子与团体体验角度理解长春，帮助用户找到适合自己的吉林入口城市。',
    eyebrow: 'Changchun',
    intro: '长春适合做吉林旅行的第一站。这里既有城市文旅和生活体验，也能延展到工业研学、企业参访和亲子路线。',
    audience: ['第一次来吉林的城市游客', '想了解工业文明与城市体验的团队', '亲子、研学、政企活动用户'],
    highlights: ['吉林省会与城市型旅游入口', '工业文明与品牌文化资源集中', '可延展到一汽、红旗、中车长客等专题'],
    sections: [
      {
        title: '长春适合什么类型游客',
        body: '如果用户希望先理解吉林的城市气质、工业文明和区域交通枢纽，长春是最容易进入的城市型目的地。',
        bullets: ['城市观光与在地生活体验', '工业研学与企业参访', '亲子与团体活动组织'],
      },
      {
        title: '城市核心看点',
        body: '长春的特色不只是城市景点，而是工业文明、品牌记忆、城市街区与区域资源的组合。',
      },
      {
        title: '推荐玩法组合',
        body: '可把城市游、工业研学和主题路线结合成半日、一日或多日安排，前期平台以介绍说明为主，帮助用户先看懂再咨询。',
      },
    ],
    notes: ['适合与工业研学专题联动浏览', '团体与机构更适合先做定制咨询', '正式接待方式以合作与资源安排为准'],
    faqs: [
      { question: '长春更适合自由行还是团体活动？', answer: '两类都适合，但如果涉及工业研学与企业参访，建议优先按团体或机构场景理解和安排。' },
      { question: '长春与吉林其他目的地如何衔接？', answer: '长春适合作为理解吉林的入口城市，后续可继续延展到长白山、延边和 自驾攻略等专题。' },
    ],
    ctas: [
      { label: '查看工业研学专题', href: '/study-tours' },
      { label: '查看城市路线建议', href: '/study-tours/changchun-industrial-route' },
      { label: '咨询团体参访', href: '/cooperation' },
    ],
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
        body: '平台前期只做官方入口说明和理解指引，不替代官方预约与票务渠道。',
      },
    ],
    notes: ['正式预约与购票以官方平台为准', '高峰期更需要提前理解规则', '适合与延边、自驾路线内容联动浏览'],
    faqs: [
      { question: '长白山适合玩几天？', answer: '通常需要根据季节、出行方式和周边联动线路决定，平台更适合先帮助用户理解玩法差异。' },
      { question: '平台能直接代替官方预约吗？', answer: '当前不替代官方入口，主要提供说明、引导和问题梳理。' },
    ],
    ctas: [
      { label: '查看官方服务入口', href: '/official-services/jilin' },
      { label: '查看吉林目的地', href: '/destinations' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
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
    description: '围绕延边的边境文化、美食体验和路线延展能力，建立更适合内容引流与主题玩法的区域入口。',
    eyebrow: 'Yanbian',
    intro: '延边适合做边境文化、美食与线路体验的专题型目的地。它不是单点游览，更适合和主题玩法、自驾路线一起理解。',
    audience: ['对边境文化感兴趣的游客', '喜欢美食与区域体验的用户', '想延展到自驾与线路玩法的内容型用户'],
    highlights: ['边境文化与地域体验鲜明', '适合与 自驾攻略、自驾和主题玩法联动', '美食、生活方式和路线感都很强'],
    sections: [
      {
        title: '延边的核心体验',
        body: '延边的吸引力来自区域文化、美食、边境感和连续线路体验，而不只是单一景点。',
      },
      {
        title: '适合哪些用户',
        body: '适合偏内容型、体验型和线路型用户，也适合把美食、文化和区域路线结合起来理解。',
      },
      {
        title: '边境线路与主题玩法',
        body: '在平台的内容结构里，延边更适合和边境、自驾、自驾攻略等主题一起被组织。',
      },
    ],
    notes: ['更适合线路和主题型内容组织', '适合和 331 及边境内容互相导流', '平台前期以介绍说明和咨询为主'],
    faqs: [
      { question: '延边更适合什么样的旅行者？', answer: '更适合希望体验区域文化、美食、边境氛围和线路感的用户。' },
      { question: '延边和 自驾攻略有什么关系？', answer: '两者在边境体验和自驾主题上有较强联动，适合放在同一内容链路中理解。' },
    ],
    ctas: [
      { label: '查看边境与自驾主题', href: '/themes' },
      { label: '查看 自驾攻略', href: '/self-drive' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
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
    description: '把长春工业文明、一汽红旗、中车长客和企业参访资源整理成一个工业研学总入口。',
    eyebrow: 'Industrial Study Tours',
    intro: '这不是单一产品页，而是工业研学总入口，帮助学校、机构和团队先理解长春为什么适合做工业研学。',
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
        body: '平台前期不做直接售卖，而是通过说明、梳理和咨询来承接定制需求。',
      },
    ],
    notes: ['以介绍说明与咨询引导为主', '资源开放方式以合作安排为准', '适合作为一汽与中车等页面的上位入口'],
    faqs: [
      { question: '工业研学适合哪些对象？', answer: '学校、机构、企业和政企考察都可以根据不同目标来安排。' },
      { question: '平台当前能提供什么？', answer: '前期重点提供资源说明、线路理解和咨询承接，不直接承诺统一售卖。' },
    ],
    ctas: [
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '查看中车长客参访', href: '/study-tours/crrc-changchun' },
      { label: '咨询定制线路', href: '/cooperation' },
    ],
  },
  {
    section: 'study-tours',
    slug: 'faw-hongqi',
    pathname: '/study-tours/faw-hongqi',
    title: '一汽红旗工业研学介绍页',
    shortTitle: '一汽红旗研学',
    description: '围绕一汽与红旗的工业文明、品牌文化和研学价值，建立当前最适合公开主推的工业研学内容页。',
    eyebrow: 'FAW Hongqi',
    intro: '一汽与红旗是当前最适合公开主推的工业研学资源。页面重点是说明看点、适合人群、内容边界和咨询方式。',
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
    notes: ['不默认写立即预订', '以官方或合作接待安排为准', '适合作为工业研学主推页'],
    faqs: [
      { question: '一汽红旗研学更适合什么人群？', answer: '适合学校研学、企业参访和对工业文明、品牌文化感兴趣的用户。' },
      { question: '平台能直接安排所有接待细节吗？', answer: '当前以说明和咨询为主，具体安排需要结合官方或合作方规则。' },
    ],
    ctas: [
      { label: '咨询研学安排', href: '/cooperation' },
      { label: '查看长春工业研学', href: '/study-tours/changchun-industrial' },
      { label: '查看企业参访说明', href: '/study-tours/crrc-changchun' },
    ],
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
        body: '页面重点是说明边界和引导定制咨询，不做过度承诺。',
      },
    ],
    notes: ['明确是定制说明页', '不公开承诺固定散客产品', '更适合高价值咨询转化'],
    faqs: [
      { question: '中车长客是否适合散客报名？', answer: '当前更适合作为企业、机构和定制型需求的说明页，不建议当作标准散客产品理解。' },
      { question: '平台当前可以提供什么帮助？', answer: '主要是资源说明、适配判断和定制咨询入口。' },
    ],
    ctas: [
      { label: '提交企业参访咨询', href: '/cooperation' },
      { label: '查看工业研学专题', href: '/study-tours' },
    ],
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
    intro: '这条页面不是卖路线，而是帮助用户理解长春工业文明线路可以如何组织、适合什么对象、可结合哪些资源。',
    audience: ['学校与机构路线组织者', '企业和政企考察用户', '想理解长春工业文明体验的内容型用户'],
    highlights: ['给工业研学和城市体验搭桥', '适合做半日与一日结构说明', '可与一汽、红旗和城市玩法联动'],
    sections: [
      {
        title: '线路适合什么用户',
        body: '适合对工业文明有兴趣、需要团体组织或希望把城市体验与研学结合起来的用户。',
      },
      {
        title: '半日 / 一日建议',
        body: '页面重点是建立理解框架，而不是直接给出强销售型产品承诺。',
      },
      {
        title: '可结合哪些资源',
        body: '可以结合一汽红旗、城市玩法、工业研学总入口等内容继续浏览和咨询。',
      },
    ],
    notes: ['不直接承诺固定产品', '更适合做线路说明和咨询入口', '适合作为专题联动页'],
    faqs: [
      { question: '这条线路是标准产品吗？', answer: '当前更适合作为线路说明页，用于帮助用户理解资源组合和咨询方向。' },
      { question: '能和城市观光一起安排吗？', answer: '可以，长春工业文明线路本身就适合与城市体验结合理解。' },
    ],
    ctas: [
      { label: '咨询线路定制', href: '/cooperation' },
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '查看长春城市玩法', href: '/destinations/changchun' },
    ],
  },
  {
    section: 'self-drive',
    slug: 'overview',
    pathname: '/self-drive/overview',
    title: '吉林 自驾攻略路线概览',
    shortTitle: '自驾攻略 概览',
    description: '建立 331 吉林段作为重要线路资源的总入口，帮助用户先理解线路逻辑，再继续看驿站、自驾与补给内容。',
    eyebrow: '自驾攻略 Overview',
    intro: '这是一张总入口页面，用于解释 331 吉林段是什么、适合谁、应该怎么继续浏览和理解。',
    audience: ['第一次接触 331 的用户', '自驾与内容型游客', '想进一步了解驿站和补给的人群'],
    highlights: ['建立线路总入口认知', '给后续驿站与补给页分流', '适合作为主题专题线的起点'],
    sections: [
      {
        title: '自驾攻略 吉林段是什么',
        body: '页面重点不是做详细攻略，而是先让用户理解它是吉林重要的线路资源入口。',
      },
      {
        title: '推荐浏览与体验方式',
        body: '先看概览，再看驿站服务、自驾补给和具体玩法页，形成有顺序的理解路径。',
      },
      {
        title: '季节建议',
        body: '自驾攻略 的体验高度依赖季节，平台前期会重点从内容说明和路线理解入手。',
      },
    ],
    notes: ['适合作为 331 专题的总入口', '更适合内容引流与咨询承接', '后续可接入路线型服务产品'],
    faqs: [
      { question: '自驾攻略 吉林段适合什么类型游客？', answer: '更适合自驾、摄影、线路型和主题体验型用户。' },
      { question: '先看哪一页最合适？', answer: '建议先看路线概览，再看怎么玩、驿站服务和补给建议。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
      { label: '提交路线咨询', href: '/cooperation' },
    ],
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
    intro: '对于多数用户来说，真正的问题不是 331 是什么，而是它适不适合自己、应该怎么玩、需要几天。',
    audience: ['自驾游客', '摄影和线路型用户', '准备做多日行程规划的人群'],
    highlights: ['建立路线感和主题感', '提供玩法方式而非直接售卖', '适合作为自驾专题核心页'],
    sections: [
      {
        title: '为什么 331 值得走',
        body: '自驾攻略 的价值在于连续线路、边境文化、景观变化和服务节点组织，而不是单一景点。',
      },
      {
        title: '适合几天',
        body: '页面前期主要给出理解框架和判断逻辑，帮助用户先知道自己应该如何安排。',
      },
      {
        title: '不同季节建议',
        body: '不同季节在路况、景观、补给和停留方式上会有明显差异。',
      },
    ],
    notes: ['更适合作为自驾说明页', '可与驿站和补给页形成闭环', '后续适合承接路线定制咨询'],
    faqs: [
      { question: '自驾攻略 更适合几天自驾？', answer: '通常需要根据季节、停留节奏和关注的主题来判断，平台当前先帮助用户建立理解框架。' },
      { question: '自驾攻略 适合什么样的游客？', answer: '更适合喜欢自驾、线路、摄影和边境体验的用户。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
      { label: '咨询路线安排', href: '/cooperation' },
    ],
  },
  {
    section: 'self-drive',
    slug: 'station-services',
    pathname: '/self-drive/station-services',
    title: '自驾攻略 驿站服务说明',
    shortTitle: '驿站服务',
    description: '把 331 驿站资源整理成平台差异化能力说明页，为后续合作、线路服务和咨询转化打基础。',
    eyebrow: 'Station Services',
    intro: '驿站服务是 331 线路内容里最有服务延展价值的一环。页面重点是说明它能提供什么，而不是直接销售。',
    audience: ['自驾用户', '车队与团队组织者', '驿站合作方与沿线商家'],
    highlights: ['形成平台差异化能力说明', '兼顾用户与合作方两类视角', '后续可延展到合作入驻和服务转化'],
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
        body: '平台前期先做说明和合作线索收集，为后续资源接入做准备。',
      },
    ],
    notes: ['前期先做说明与合作引导', '适合与 331 概览和补给页联动', '后续可接入驿站合作模块'],
    faqs: [
      { question: '驿站服务主要覆盖哪些需求？', answer: '主要覆盖停车、休整、补给、住宿、餐饮和团队停留等需求。' },
      { question: '现在能直接预订驿站服务吗？', answer: '可以通过合作咨询提交需求，平台会协助您对接合适的驿站资源方。' },
    ],
    ctas: [
      { label: '咨询驿站合作', href: '/cooperation' },
      { label: '查看 331 路线', href: '/self-drive/how-to-travel' },
      { label: '查看补给与住宿建议', href: '/self-drive/supplies-and-stays' },
    ],
  },
  {
    section: 'self-drive',
    slug: 'supplies-and-stays',
    pathname: '/self-drive/supplies-and-stays',
    title: '自驾攻略 自驾补给与住宿建议',
    shortTitle: '补给与住宿',
    description: '面向真实出行用户，围绕出发准备、沿线补给、住宿判断和团队注意事项提供说明型信息。',
    eyebrow: 'Supplies and Stays',
    intro: '这页更偏实用信息。它的作用是帮助用户把路线理解延伸到出发准备、补给和住宿判断。',
    audience: ['准备自驾出行的游客', '团队与车队组织者', '希望降低准备成本的实用型用户'],
    highlights: ['更接近真实出行问题', '适合提高保存与咨询意愿', '与驿站服务形成互补'],
    sections: [
      {
        title: '出发前建议准备什么',
        body: '用户最先需要的不是购买，而是明确出发前应该从哪些方面做准备。',
      },
      {
        title: '沿线补给如何考虑',
        body: '补给应结合路线、季节和停留节奏一起判断，而不是把它理解成单一购买问题。',
      },
      {
        title: '团队与车队需要注意什么',
        body: '团队用户在补给、停留、住宿和沟通方式上有不同于散客的关注点。',
      },
    ],
    notes: ['更偏实用型说明页', '适合和驿站服务页联动', '后续可延展为路线服务产品说明'],
    faqs: [
      { question: '自驾攻略 自驾需要重点准备哪些方面？', answer: '建议优先理解路线、季节、停留节奏、补给方式和住宿安排。' },
      { question: '团队出行和个人自驾有什么不同？', answer: '团队更需要关注停留节点、统一补给、住宿组织和连续服务。' },
    ],
    ctas: [
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '查看 331 怎么玩', href: '/self-drive/how-to-travel' },
      { label: '提交路线咨询', href: '/cooperation' },
    ],
  },
  {
    section: 'themes',
    slug: 'ice-snow',
    pathname: '/themes/ice-snow',
    title: '冰雪吉林主题玩法说明',
    shortTitle: '冰雪吉林',
    description: '围绕长白山、冬季线路、城市冰雪体验和季节玩法，建立吉林冰雪内容的主题入口。',
    eyebrow: 'Ice & Snow',
    intro: '冰雪吉林不是单一景点主题，而是一套围绕季节体验、目的地组合和内容理解展开的主题入口。',
    audience: ['冬季旅游用户', '亲子和线路型游客', '想理解吉林冬季特色的人群'],
    highlights: ['季节辨识度高', '可联动长白山与城市体验', '适合做高传播主题入口'],
    sections: [
      {
        title: '为什么先看冰雪主题',
        body: '对于很多用户来说，先理解季节玩法比先决定具体地点更容易进入吉林旅游。',
      },
      {
        title: '适合搭配哪些目的地',
        body: '长白山、长春以及后续延展的城市冰雪和线路内容都适合纳入这个主题链路。',
      },
      {
        title: '平台当前提供什么',
        body: '平台提供玩法说明、内容聚合和咨询引导服务，帮助用户更好地规划行程。',
      },
    ],
    notes: ['适合作为冬季主打主题', '适合与长白山页面互相导流', '后续可接季节攻略内容'],
    faqs: [
      { question: '冰雪吉林适合先看哪些页面？', answer: '建议先看主题说明，再结合长白山和吉林目的地页继续浏览。' },
      { question: '平台会直接售卖冰雪产品吗？', answer: '前期以说明、引导和咨询为主，后续再逐步接入轻量销售。' },
    ],
    ctas: [
      { label: '查看长白山玩法', href: '/destinations/changbai-mountain' },
      { label: '查看主题玩法', href: '/themes' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
  },
  {
    section: 'themes',
    slug: 'industrial-civilization',
    pathname: '/themes/industrial-civilization',
    title: '工业文明主题玩法说明',
    shortTitle: '工业文明',
    description: '把长春城市体验、一汽红旗、中车长客和工业文明线路组织成吉林文旅的差异化主题线。',
    eyebrow: 'Industrial Civilization',
    intro: '工业文明主题不是传统景点玩法，而是围绕城市制造、品牌文化和企业参访形成的特色专题线。',
    audience: ['学校与研学机构', '企业与商协会', '对工业文明有兴趣的内容型游客'],
    highlights: ['差异化强', '长春资源集中', '适合内容与咨询双驱动'],
    sections: [
      {
        title: '这个主题的独特价值',
        body: '工业文明主题能把长春从普通城市旅游中区分出来，形成高辨识度内容主线。',
      },
      {
        title: '适合怎么组织阅读路径',
        body: '建议先看工业文明主题，再进入一汽红旗、中车长客和长春工业线路等具体页面。',
      },
      {
        title: '转化方式',
        body: '前期通过说明、FAQ 和咨询入口承接意向，后续再根据资源成熟度接入服务产品。',
      },
    ],
    notes: ['适合作为主打差异化主题', '适合与合作咨询页配合', '后续可连接研学与企业参访线索'],
    faqs: [
      { question: '工业文明主题更适合游客还是团体？', answer: '两者都适合，但当前更适合团体、机构和内容型用户先理解和咨询。' },
      { question: '主题页和工业研学页有什么区别？', answer: '主题页是上位入口，工业研学页则更聚焦具体资源和场景。' },
    ],
    ctas: [
      { label: '查看工业研学', href: '/study-tours' },
      { label: '查看长春城市页', href: '/destinations/changchun' },
      { label: '咨询合作', href: '/cooperation' },
    ],
  },
  {
    section: 'themes',
    slug: 'border-and-yanbian',
    pathname: '/themes/border-and-yanbian',
    title: '边境与延边体验主题说明',
    shortTitle: '边境与延边',
    description: '围绕延边、边境文化、美食体验和线路延展能力，建立吉林差异化的区域主题入口。',
    eyebrow: 'Border & Yanbian',
    intro: '边境与延边更适合用主题方式理解，因为用户往往同时关心文化、美食、路线和区域体验。',
    audience: ['内容型游客', '美食和区域文化兴趣用户', '自驾与线路型用户'],
    highlights: ['地域文化辨识度强', '适合与 自驾攻略联动', '能承接内容和路线双重需求'],
    sections: [
      {
        title: '为什么先用主题理解',
        body: '相比先看单一景点，边境与延边更适合通过区域主题来建立整体印象。',
      },
      {
        title: '适合搭配哪些内容',
        body: '延边目的地页、331 路线页和后续美食攻略都适合纳入同一主题链路。',
      },
      {
        title: '平台服务说明',
        body: '提供说明和玩法引导，帮助用户更好地规划延边区域行程。',
      },
    ],
    notes: ['适合作为区域主题入口', '适合和 331 形成内容联动', '后续可接美食与线路攻略'],
    faqs: [
      { question: '边境与延边适合几天安排？', answer: '通常更适合按线路和主题理解，具体天数应结合路线和季节来判断。' },
      { question: '应该先看延边还是 331？', answer: '如果更关心区域体验先看延边，如果更关心自驾路线先看 331。' },
    ],
    ctas: [
      { label: '查看延边目的地', href: '/destinations/yanbian' },
      { label: '查看 自驾攻略', href: '/self-drive/overview' },
      { label: '查看主题玩法', href: '/themes' },
    ],
  },
  {
    section: 'themes',
    slug: 'roadtrip-331',
    pathname: '/themes/roadtrip-331',
    title: '自驾攻略 自驾与驿站主题说明',
    shortTitle: '自驾攻略 自驾',
    description: '把路线概览、怎么玩、驿站服务和补给建议组织成连续自驾主题，为平台建立服务型内容主线。',
    eyebrow: 'Roadtrip 331',
    intro: '自驾攻略 自驾主题是平台的重要服务型主线，它能把路线内容、驿站服务和后续咨询转化串起来。',
    audience: ['自驾游客', '车队和团队组织者', '摄影和边境线路用户'],
    highlights: ['服务延展空间大', '可接驿站合作', '适合形成内容到咨询闭环'],
    sections: [
      {
        title: '为什么 331 是平台重点',
        body: '自驾攻略 不只是内容主题，更是后续可扩展成线路服务和合作资源的核心能力线。',
      },
      {
        title: '阅读顺序建议',
        body: '建议从主题说明进入，再去看路线概览、怎么玩、驿站服务和补给建议。',
      },
      {
        title: '当前转化方式',
        body: '先通过说明型页面建立理解，再承接路线咨询和资源合作。',
      },
    ],
    notes: ['适合作为平台重点专题', '与合作咨询页关联度高', '后续可接入路线与驿站服务产品'],
    faqs: [
      { question: '自驾攻略 自驾主题和路线概览有什么不同？', answer: '主题页是上位入口，路线概览则更聚焦线路理解。' },
      { question: '现在能直接买线路产品吗？', answer: '当前以说明和咨询为主，后续再逐步接入服务产品。' },
    ],
    ctas: [
      { label: '查看 331 路线概览', href: '/self-drive/overview' },
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '咨询路线安排', href: '/cooperation' },
    ],
  },
  {
    section: 'guides',
    slug: 'changchun-industrial-content-line',
    pathname: '/guides/changchun-industrial-content-line',
    title: '长春工业研学内容线说明',
    shortTitle: '工业研学内容线',
    description: '说明如何把长春城市入口、一汽红旗和工业文明线路组织成一条持续更新的内容线。',
    eyebrow: 'Guide',
    intro: '这是一条内容线说明页，帮助理解平台后续如何围绕长春工业研学持续组织专题与攻略。',
    audience: ['内容运营人员', '研学咨询用户', '想系统理解工业研学资源的人群'],
    highlights: ['适合做专题持续更新', '能承接高价值咨询', '与长春城市页形成互补'],
    sections: [
      {
        title: '内容线的核心结构',
        body: '长春城市页作为入口，一汽红旗和中车长客作为资源页，工业文明线路作为串联页，形成稳定的专题结构。',
      },
      {
        title: '为什么要用内容线组织',
        body: '相比零散资讯，内容线更适合做 GEO、AI 导览和咨询承接。',
      },
      {
        title: '后续更新方向',
        body: '可逐步增加活动快讯、FAQ、案例说明和合作咨询信息。',
      },
    ],
    notes: ['更适合专题化更新', '适合作为后台运营参考', '也能给用户形成更清晰的阅读路径'],
    faqs: [
      { question: '为什么不是直接堆资讯？', answer: '因为专题内容线更利于理解、搜索表现和咨询转化。' },
      { question: '内容线和单页资源页如何配合？', answer: '内容线负责组织，单页资源负责解释具体资源和问题。' },
    ],
    ctas: [
      { label: '查看长春工业研学', href: '/study-tours/changchun-industrial' },
      { label: '查看一汽红旗研学', href: '/study-tours/faw-hongqi' },
      { label: '咨询合作', href: '/cooperation' },
    ],
  },
  {
    section: 'guides',
    slug: 'self-drive-content-line',
    pathname: '/guides/self-drive-content-line',
    title: '自驾攻略 自驾玩法内容线说明',
    shortTitle: '自驾攻略 内容线',
    description: '围绕 331 路线概览、怎么玩、驿站服务和补给建议，建立连续型内容组织方式。',
    eyebrow: 'Guide',
    intro: '自驾攻略 内容线不是一篇攻略，而是一种稳定的内容组织方式，用来持续承接自驾和路线类用户。',
    audience: ['自驾用户', '路线型内容运营者', '合作与咨询线索用户'],
    highlights: ['连续型内容结构清晰', '适合和驿站服务联动', '可沉淀高频 FAQ'],
    sections: [
      {
        title: '内容线由哪些页面组成',
        body: '由概览、玩法、驿站和补给等页面组成，形成从理解到咨询的连续链路。',
      },
      {
        title: '为什么适合做平台主线',
        body: '因为它天然具备路线、服务和合作三类扩展空间。',
      },
      {
        title: '后续可增加什么',
        body: '可增加季节攻略、摄影建议、团队路线和合作资源更新。',
      },
    ],
    notes: ['适合作为 331 专题上位说明', '方便 AI 客服理解页面关系', '利于后续自动生成资讯内容'],
    faqs: [
      { question: '自驾攻略 内容线先看哪一页？', answer: '建议先看路线概览，再根据需求看玩法、驿站和补给页。' },
      { question: '这类内容后续会更新吗？', answer: '会，后续会逐步增加季节与线路相关内容。' },
    ],
    ctas: [
      { label: '查看 331 路线概览', href: '/self-drive/overview' },
      { label: '查看驿站服务', href: '/self-drive/station-services' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
  },
  {
    section: 'guides',
    slug: 'official-service-content-line',
    pathname: '/guides/official-service-content-line',
    title: '官方说明内容线说明',
    shortTitle: '官方说明内容线',
    description: '说明平台如何围绕官方入口、预约规则和票务理解成本，建立可信说明型内容体系。',
    eyebrow: 'Guide',
    intro: '官方说明内容线的目标不是替代官方，而是帮用户减少理解成本，并提高平台可信度。',
    audience: ['首次使用官方入口的游客', '对规则不熟悉的用户', '需要建立平台信任感的内容链路'],
    highlights: ['建立平台边界感', '提升可信度', '适合沉淀 FAQ 和 AI 知识域'],
    sections: [
      {
        title: '为什么这条内容线重要',
        body: '因为官方入口类问题高频且敏感，平台需要明确边界和说明价值。',
      },
      {
        title: '如何组织说明内容',
        body: '优先做入口说明、常见问题和注意事项，不做超出确认范围的承诺。',
      },
      {
        title: '和 AI 客服的关系',
        body: '这是 AI 回答官方入口类问题的重要可信知识域来源。',
      },
    ],
    notes: ['适合做 FAQ 聚合', '要始终强调以官方为准', '是平台信任基础之一'],
    faqs: [
      { question: '为什么官方说明也要单独做内容线？', answer: '因为它能降低用户理解成本，也能显著提升平台可信度。' },
      { question: '平台会直接替代官方吗？', answer: '不会，平台前期只做说明、引导和咨询。' },
    ],
    ctas: [
      { label: '查看官方服务说明', href: '/official-services/jilin' },
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
  },
  {
    section: 'guides',
    slug: 'signal-scout-and-faq',
    pathname: '/guides/signal-scout-and-faq',
    title: '趋势选题与 FAQ 更新说明',
    shortTitle: '趋势与 FAQ',
    description: '说明平台如何用趋势发现、FAQ 沉淀和 AI 问题回流，持续更新吉林文旅内容。',
    eyebrow: 'Signals & FAQ',
    intro: '平台后续内容不靠堆量，而是依靠趋势发现、高频问题和专题线来决定更新方向。',
    audience: ['内容运营人员', '项目管理者', '希望理解平台更新逻辑的合作方'],
    highlights: ['内容更新有方法论', 'FAQ 能直接服务 AI 助手', '利于 GEO 和长期内容沉淀'],
    sections: [
      {
        title: '更新来源是什么',
        body: '主要来自多平台趋势发现、高频咨询问题和已有内容线的扩展。',
      },
      {
        title: '为什么 FAQ 很重要',
        body: 'FAQ 既能服务搜索和 GEO，也能成为 AI 助手的稳定知识基础。',
      },
      {
        title: '如何形成持续更新',
        body: '通过前哨雷达、咨询问题和专题内容联动，形成稳定迭代节奏。',
      },
    ],
    notes: ['偏方法说明页', '适合作为内容策略文档公开版', '可连接 Signal Scout 能力'],
    faqs: [
      { question: '内容更新靠什么驱动？', answer: '主要靠趋势发现、高频问题和专题内容组织，而不是纯粹堆量。' },
      { question: 'FAQ 为什么放在这么核心的位置？', answer: '因为 FAQ 同时服务用户、GEO 和 AI 助手。' },
    ],
    ctas: [
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '查看 AI 助手说明', href: '/ai-assistant' },
      { label: '查看合作咨询', href: '/cooperation' },
    ],
  },
  {
    section: 'shop',
    slug: 'tourism-service-pack',
    pathname: '/shop/tourism-service-pack',
    title: '文旅服务类产品说明',
    shortTitle: '文旅服务',
    description: '商城展示文旅服务类产品，包括研学资料包、路线服务包和咨询型服务产品。',
    eyebrow: 'Travel Services',
    intro: '商城展示适合平台承接的服务类产品，帮助用户了解文旅服务方向。',
    audience: ['团体与机构用户', '路线和研学咨询用户', '希望了解服务产品的潜在客户'],
    highlights: ['服务类产品展示', '便于与咨询链路结合', '帮助用户了解文旅服务方向'],
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
        body: '商城服务类产品可通过合作咨询了解详情和预约方式。',
      },
    ],
    notes: ['适合先做说明页', '可与合作咨询页深度联动'],
    faqs: [
      { question: '现在可以直接购买吗？', answer: '可通过合作咨询了解详情，平台会协助对接服务提供方。' },
      { question: '为什么服务类产品优先？', answer: '因为它更贴近平台的资源组织和咨询承接能力。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '提交咨询', href: '/cooperation' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
  },
  {
    section: 'shop',
    slug: 'creative-products',
    pathname: '/shop/creative-products',
    title: '吉林地方文创说明',
    shortTitle: '地方文创',
    description: '围绕吉林地方文创和城市文化衍生方向做展示预备，前期先说明商品方向与边界。',
    eyebrow: 'Creative Products',
    intro: '地方文创更适合先做展示和内容预热，等供给、授权和履约条件更清晰后再接正式销售。',
    audience: ['文旅内容用户', '地方文化兴趣用户', '后续潜在购买用户'],
    highlights: ['适合做内容展示', '能增强平台文化感', '授权与供给边界必须提前说明'],
    sections: [
      {
        title: '文创方向可以怎么理解',
        body: '重点是围绕地方文化、城市记忆和文旅场景延展，而不是盲目做品牌周边销售。',
      },
      {
        title: '为什么先展示后销售',
        body: '因为文创类商品涉及供给、授权和履约，前期更适合先把方向和边界说清楚。',
      },
      {
        title: '后续适合接什么',
        body: '优先接可控、标准化、合规的地方文创产品，而不是高风险品牌周边。',
      },
    ],
    notes: ['品牌授权必须谨慎', '前期适合展示型内容', '后续可作为商城文化层补充'],
    faqs: [
      { question: '现在已经能买文创了吗？', answer: '当前仍是展示与说明阶段，后续才会逐步开放销售。' },
      { question: '会卖品牌授权周边吗？', answer: '只有在授权和合规条件明确后才考虑。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '查看攻略与资讯', href: '/guides' },
      { label: '咨询合作', href: '/cooperation' },
    ],
  },
  {
    section: 'shop',
    slug: 'northeast-specialties',
    pathname: '/shop/northeast-specialties',
    title: '东北特产商品方向说明',
    shortTitle: '东北特产',
    description: '面向未来商城模块，先说明适合平台承接的东北特产方向和轻量销售路径。',
    eyebrow: 'Northeast Specialties',
    intro: '东北特产更适合从标准化、易展示、易履约的商品方向开始，先做内容说明和类目预热。',
    audience: ['对吉林伴手礼和特产感兴趣的用户', '后续潜在购买用户', '供应链与合作资源方'],
    highlights: ['适合轻量电商起步', '内容展示空间大', '更容易形成标准化类目'],
    sections: [
      {
        title: '为什么东北特产适合商城预备阶段',
        body: '相比复杂旅游产品，特产更容易标准化、履约和做轻量转化。',
      },
      {
        title: '适合先做哪些方向',
        body: '适合从伴手礼、礼盒和容易内容化展示的产品方向开始。',
      },
      {
        title: '特产类目说明',
        body: '展示东北特产类商品方向，包括伴手礼、礼盒等适合标准化展示的产品。',
      },
    ],
    notes: ['适合展示类商品', '可作为商城起步类目'],
    faqs: [
      { question: '东北特产会最先开放销售吗？', answer: '特产是较适合优先展示的方向，具体销售方式可通过咨询了解。' },
      { question: '现在能直接购买吗？', answer: '可通过合作咨询了解购买方式和预约流程。' },
    ],
    ctas: [
      { label: '查看商城', href: '/shop' },
      { label: '查看合作咨询', href: '/cooperation' },
      { label: '询问 AI 助手', href: '/ai-assistant' },
    ],
  },
  {
    section: 'official-services',
    slug: 'jilin',
    pathname: '/official-services/jilin',
    title: '吉林官方文旅与票务入口说明',
    shortTitle: '官方入口说明',
    description: '建立平台可信度，明确 dajilin.net 当前不替代官方平台，而是做说明、梳理和引导。',
    eyebrow: 'Official Services',
    intro: '这页的作用是把平台和官方入口的边界说清楚，让用户理解应该先看什么、怎么判断用哪个入口。',
    audience: ['首次使用吉林文旅服务的游客', '对预约和购票规则不熟悉的用户', '需要一个可信说明入口的人群'],
    highlights: ['平台不冒充官方', '平台不替代官方售卖与预约', '平台提供说明、梳理和咨询帮助'],
    sections: [
      {
        title: '为什么要先看官方入口说明',
        body: '很多用户真正需要的是先判断规则和入口，而不是直接进入操作页面。',
      },
      {
        title: '当前可参考的官方服务类型',
        body: '页面重点围绕官方说明、理解指引和注意事项展开，帮助用户理解如何使用官方服务。',
      },
      {
        title: '平台能提供什么帮助',
        body: '平台能帮助用户降低信息查找成本，并把复杂问题转成更可理解的说明和咨询。',
      },
    ],
    notes: ['不冒充官方', '帮助用户理解官方入口'],
    faqs: [
      { question: '平台能直接帮我买票吗？', answer: '平台主要提供官方入口说明和预约引导，帮助用户更好地使用官方渠道。' },
      { question: '为什么有些服务必须以官方入口为准？', answer: '因为很多票务和预约规则需要以官方实时发布信息为准，平台更适合做梳理和理解支持。' },
    ],
    ctas: [
      { label: '询问 AI 助手', href: '/ai-assistant' },
      { label: '查看吉林目的地', href: '/destinations' },
      { label: '查看攻略与资讯', href: '/guides' },
    ],
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
