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
        title: '长春：新旧交织的北国春城',
        body: '长春不仅是吉林的政治文化中心，更是理解东北工业文明与现代生活的最佳切入点。',
        bullets: [
          '这有山 (The Hill)：长春必打卡的室内沉浸式商业山丘，集美食、文创与市井气息于一体。',
          '54路有轨电车：坐上复古的绿皮电车，穿梭在城市森林中，感受长春的慢时光。',
          '长影旧址博物馆：新中国电影摇篮，在这里可以看到中国电影工业的起步与辉煌。'
        ],
      },
      {
        title: '亲子与文化深度游',
        body: '对于家庭游客和文化爱好者，长春提供了极为丰富的场景：',
        bullets: [
          '长春冰雪新天地：冬季限定，拥有世界最长的冰滑梯 and 震撼的冰雕艺术。',
          '伪满皇宫博物院：在近代史的遗迹中，深度理解那段特殊的历史。',
          '长影世纪城：中国版的“环球影城”，适合全家参与的电影主题乐园。'
        ],
      },
    ],
    faqs: [
      { question: '54路有轨电车怎么坐最出片？', answer: '建议在黄昏时分乘坐。最推荐路段是红旗街附近。如果想拍电影感大片，可以等雪后，绿色的车身与洁白的积雪形成强烈视觉对比。' },
      { question: '长春冰雪新天地建议玩多久？', answer: '建议安排一个下午到晚上。下午3点左右入园看日落下的冰雕，傍晚灯光亮起后景观最美。一定要体验标志性的超级大滑梯。' },
      { question: '长春适合作为吉林中转站吗？', answer: '非常适合。长春龙嘉机场交通便利，动车1小时可达吉林市，2小时左右可达长白山或延边，是吉林全境游的最佳起点。' },
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
        title: '长白山选坡指南：北坡、西坡还是南坡？',
        body: '长白山分为三个主要景区，各有千秋，初次访问建议根据自身需求选择：',
        bullets: [
          '北坡 (二道白河)：开发最早、景点最丰富（瀑布、温泉、地下森林），虽然看天池视线稍受遮挡，但体验感最强。',
          '西坡 (松江河)：视野最开阔，1442级台阶拾级而上，能看到天池全貌，夏季高山花园极美。',
          '南坡 (鸭绿江)：最原始、离天池最近，每日限流且开放时间不固定，由于就在中朝边境线上，景观极为震撼。'
        ],
      },
      {
        title: '如何避开排队高峰（实操建议）',
        body: '长白山作为顶流景区，旺季排队时间可能长达3-5小时。',
        bullets: [
          '住二道白河镇：距离北坡最近，方便清晨出发。',
          '第一班车冲锋：旺季建议预约早上5:30-6:30的第一时段入园，避开10:00之后的团队大军。',
          '反向游览：到达北坡后，如果天气好，直接先冲主峰看天池，再回头玩瀑布和小天池，避免下午主峰云雾遮蔽。'
        ],
      },
    ],
    faqs: [
      { question: '天池真的能看到吗？有什么秘诀？', answer: '长白山天池一年中只有约100天能看全。秘诀是：看实时天气预报和官方监控！如果二道白河镇在下雨，山上可能正好在云海之上。建议在当地停留2天，增加“守到”天池的概率。' },
      { question: '长白山夏季去要带厚衣服吗？', answer: '必须带！即便山下30度，主峰山顶风大且气温可能只有10度左右。建议带一件轻便羽绒服或租一件大衣。' },
      { question: '景区门票需要提前多久抢？', answer: '务必提前3-7天在微信小程序“长白山”官方预约。热门时段（如暑期或春节）往往放票即秒空。' },
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
        title: '延吉：中国最有“韩剧感”的边境之城',
        body: '延吉不只是美食之都，更是一个充满浓郁民族风情和出片率极高的地方。',
        bullets: [
          '延边大学网红墙：就在延大对面，数百个韩文招牌背景，夜晚亮灯后秒变“小首尔”。',
          '中国朝鲜族民俗园：租一套精美的朝鲜族服饰（公主装或王妃装），在这里可以拍出极致的民族风旅拍。',
          '水上市场：延吉人的“深夜食堂”反向版，凌晨5点开始的早市，烟火气拉满。'
        ],
      },
      {
        title: '美食与边境游深度结合',
        body: '来到延边，胃和眼睛必须有一个在路上：',
        bullets: [
          '一眼望三国：去珲春防川景区，看中俄朝三国交界，感受界江的静谧与壮阔。',
          '正宗朝餐：除了冷面和烤肉，一定要试试拌饭、温面、石锅豆腐以及当地特色米酒。',
          '图们口岸：近距离接触国门，隔江对望异国风光，历史感扑面而来。'
        ],
      },
    ],
    faqs: [
      { question: '网红墙拍照位怎么选？', answer: '最经典的位子是在延边大学对面的弹幕墙。建议晚上7点后去，等霓虹灯全亮。如果人太多，可以退到马路斜对角用长焦拍摄，压缩感更强。' },
      { question: '朝鲜族民俗园需要预约吗？', answer: '建议提前在网上购票。如果想旅拍，民俗园周边有无数妆造店，建议提前1-2小时预约做头发和衣服，避开上午10点的排队高峰。' },
      { question: '延吉适合作为331自驾的起点吗？', answer: '非常推荐！从延吉出发，沿着G331开往珲春、图们，是一条风景极佳的边境自驾线路。' },
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
        title: '长春工业研学的核心主题与资源',
        body: '长春是中国老工业基地的核心城市，拥有极高的工业文明密度。主要研学资源涵盖：',
        bullets: [
          '汽车工业：以中国一汽（红旗、解放等）为代表的现代化汽车制造及品牌溯源。',
          '轨道交通：以中车长客为代表的中国高铁及城市轨道装备先进制造。',
          '电影工业：长春电影制片厂——新中国电影的摇篮，展示光影艺术的工业化生产流程。'
        ],
      },
      {
        title: '为什么长春是研学的绝佳目的地？',
        body: '长春不仅保留了伪满时期到建国初期的工业遗存，还展现了中国大国重器的现代制造实力。',
        bullets: [
          '知行合一：课本中的“汽车城”、“电影城”通过车间参观变得立体。',
          '工匠精神：一线劳模工作室展示与先进生产线交相辉映。',
          '场景稀缺：高铁总装与汽车涂装等场景在国内多数城市无法轻易接触。'
        ],
      },
      {
        title: '研学落地与行程安排',
        body: '大部分核心工厂如一汽、长客实行严格的预约和容量限制，主要针对学校和研学机构组织的大巴车团队开放，且名额随季节波动。建议优先通过具有资质的合作方或官方对接。',
      },
    ],
    faqs: [
      { question: '长春的工业研学适合哪个年龄段的学生？', answer: '涵盖面广。长影制片厂适合全学段；一汽红旗展馆适合小学高年级及以上；而中车长客等生产车间，因安全考量及认知深度，更建议初中及以上、乃至职业院校或高校学生参加。' },
      { question: '散客家庭如何带孩子体验长春工业游？', answer: '由于核心厂区通常不接待无预约散客，建议个人家庭关注本地官方发布的“工业旅游公众开放日”，或者参观不设门槛的长影旧址博物馆、长春拖拉机厂遗址文化园（长拖1958）等工业遗存改造项目。' },
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
        title: '一汽红旗研学核心看点与行程安排',
        body: '作为中国汽车工业的摇篮，一汽红旗研学重点围绕以下三大板块展开：',
        bullets: [
          '红旗文化展馆：了解从中国第一辆国产轿车到现代红旗H9的发展历程，理解“国车”的品牌基因。',
          '现代化生产线参访：深入总装车间，近距离观看工业4.0标准下的自动化生产线与AGV物流小车运作。',
          '汽车制造科普：了解冲压、焊装、涂装、总装四大工艺流程，适合中小学生与汽车爱好者。'
        ],
      },
      {
        title: '研学团队预约与官方服务说明',
        body: '长春一汽红旗厂区参访属于定制化工业游项目，日常对团队的安全与排期有规范管理。建议：',
        bullets: [
          '学校及研学机构请至少提前 2-4 周通过官方对口渠道或指定合作地接社提交参访申请。',
          '入厂参观需严格遵守安全规定，不得随意脱离队伍及在保密区域拍照。',
          '具体开放状态和接待能力以中国一汽官方公告为准。'
        ],
      },
      {
        title: '建议时长与最佳路线组合',
        body: '一汽红旗研学通常需要 2.5-3.5 小时。建议将其作为长春工业游的半日行程，另外半日可搭配长春电影制片厂或中车长客，形成“长春老字号工业文明一日游”。',
      },
    ],
    faqs: [
      { question: '一汽红旗可以个人散客去参观吗？', answer: '目前一汽红旗厂区主要面向学校、研学机构和企业组织的团队开放。个人散客如需参观，建议关注当地旅行社或研学机构发布的一汽参观拼团活动。' },
      { question: '一汽红旗研学需要多长时间？', answer: '一般完整的参观流程（含展馆讲解与车间走访）需要大约半天（约 3 小时）。' },
      { question: '厂区内允许拍照吗？', answer: '红旗文化展馆等对外展示区域允许拍照，但生产车间内部涉及商业机密及安全规定，通常严禁拍照和录像，请务必听从现场讲解员安排。' },
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
        title: '中车长客参访核心价值',
        body: '中车长春轨道客车股份有限公司是中国高速动车组和城市轨道车辆的重要研发与制造基地。参访重点包括：',
        bullets: [
          '复兴号中国标准动车组制造基地：近距离感受高铁列车从零部件到整车的总装过程。',
          '大国工匠与先进制造：了解轨道交通装备制造的精密切割、焊接工艺，体会工匠精神。',
          '轨道交通企业展厅：观看中国轨道交通从绿皮车到高铁的发展史及未来概念车型。'
        ],
      },
      {
        title: '定制参访与接待要求',
        body: '中车长客属于高端制造企业，日常生产任务繁重。其参访主要面向特定的企业交流、高规格政企考察及定向研学。',
        bullets: [
          '需提前以单位名义向中车长客官方公关部门或其授权机构发函申请。',
          '对团队规模、人员身份、安全防护（如须佩戴安全帽及护目镜）有严格要求。',
          '不接受临时上门散客，非开放日一律谢绝无预约参观。'
        ],
      },
      {
        title: '与长春工业游的结合',
        body: '中车长客厂区较大，参访通常需半天时间。作为长春高端制造业的代表，非常适合与一汽红旗组成“国车国铁”的两大名片式行业考察路线。',
      },
    ],
    faqs: [
      { question: '中车长客接受中小学生研学团吗？', answer: '中车长客对接待对象的年龄和安全管控有严格要求。部分定向公益研学或与学校有专属合作的科技夏令营可以获批，普通商业研学团申请难度较高，具体需依厂区当期排产和接待政策而定。' },
      { question: '去中车长客参观需要准备什么？', answer: '必须携带身份证原件以供安检核验；进入车间必须穿平底鞋，严禁高跟鞋、拖鞋；进入产线需全程听从指引佩戴安全帽及相关劳保用品。' },
      { question: '中车长客的参观路线可以拍照吗？', answer: '绝大部分生产车间严禁携带单反等相机，手机也需严格按车间规定在特定安全区域使用。违规拍照将被安保制止，事关企业保密规定。' },
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
        title: 'G331 国道吉林段自驾核心看点',
        body: '331国道吉林段（G331）被誉为“中国最美边境公路”之一，全长约1390公里。沿途汇聚了自然风光与边境风情：',
        bullets: [
          '图们江与鸭绿江：一路伴随中朝两国界江行驶，对岸异国风情尽收眼底。',
          '长白山林海：穿越长白山脉原始森林，秋季五花山色堪称摄影者的天堂。',
          '民族文化体验：途经中国最大的朝鲜族聚集地延边州，体验正宗的朝鲜族美食与民俗。'
        ],
      },
      {
        title: '经典路段推荐',
        body: '对于初次尝试或时间有限的游客，无需全程走完，强烈推荐走“延吉-图们-珲春”这段精华路线：',
        bullets: [
          '路况最好，补给最便利，非常适合家庭自驾或新手。',
          '涵盖了图们口岸（公路与铁路双口岸）和防川（一眼望三国）的核心景观。',
          '沿途网红驿站与打卡点集中，是 331 国道在吉林省内最具代表性的一段。'
        ],
      },
      {
        title: '季节与路况提示',
        body: 'G331 吉林段的体验极度依赖季节。5-10月是最佳自驾期，其中9月下旬至10月中旬秋景最美。冬季大雪封山、路面结冰，非专业冰雪穿越车队极不建议在冬季前往。',
      },
    ],
    faqs: [
      { question: 'G331 吉林段路况好吗？轿车能开吗？', answer: '绝大部分路段为铺装柏油路面，路况极好，普通家用轿车、SUV甚至房车均可轻松通行。但部分深入山林或靠近江边的支线可能路滑，雨季需注意落石。' },
      { question: '边境自驾需要办理通行证吗？', answer: '走G331国道主干线无需边境通行证，只需携带身份证件随时备查。但严禁在口岸、边防哨所及标有军事禁区字样的区域使用无人机或拍照。' },
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
        title: '331 自驾行程天数建议',
        body: '合理的天数规划是自驾 G331 的核心。平台基于用户真实出行数据推荐以下节奏：',
        bullets: [
          '2天1夜（精华周末版）：延吉出发 - 图们口岸 - 珲春防川风景区，适合周边城市周末微度假。',
          '4天3夜（延边深度游）：长春/延吉出发 - 和龙 - 龙井 - 图们 - 珲春，深度体验朝鲜族村落与边境风光。',
          '7天以上（大环线穿越）：集安出发 - 临江 - 长白山 - 延吉 - 珲春，适合有丰富长途自驾经验的资深车友。'
        ],
      },
      {
        title: '边境自驾避坑指南',
        body: '为了保证旅行体验，请避开以下常见的边境自驾误区：',
        bullets: [
          '不要盲目赶路：国道限速严格，村庄较多，切勿疲劳驾驶。',
          '网络信号盲区：部分抵边路段可能会漂移到他国信号或完全无网，务必提前下载离线地图。',
          '警惕导航抄近路：不要盲信导航走非铺装的捷径，尤其是雨季和夜间。'
        ],
      },
      {
        title: '如何预订服务',
        body: '沿线驿站、民宿及租车服务具有极强的季节性。暑假及“十一”黄金周期间，务必提前半个月以上确认住宿，避免“一房难求”。',
      },
    ],
    faqs: [
      { question: 'G331 吉林段限速严格吗？', answer: '非常严格。国道多为双向单车道，途径村庄、学校、路口均有监控与限速牌（通常在40-70公里/小时）。请严格遵守交通规则，安全第一。' },
      { question: '一路上手机信号怎么样？', answer: '在城镇和主要景区内三大运营商信号良好。但在穿越长白山林区或紧贴国界的峡谷地带，信号可能微弱甚至短暂消失，建议离线地图与少量现金必不可少。' },
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
        title: 'G331 吉林段沿途驿站分布与功能',
        body: '驿站是 331 沿线最关键的服务枢纽，主要分为三类：',
        bullets: [
          '观景打卡型驿站：如琵岩山驿站、防川驿站，主要提供停车休息、绝佳的观景平台和特色饮品。',
          '综合服务型驿站：位于主要节点城镇周边，提供餐饮住宿、车辆快修、房车水电补给。',
          '主题文化驿站：结合当地村落（如朝鲜族民宿），提供深度的民俗文化和篝火体验。'
        ],
      },
      {
        title: '自驾车队与房车服务',
        body: '大型自驾游车队与房车用户对场地的要求更高：',
        bullets: [
          '部分大型驿站提供专用房车营位、充电桩与加水排污设施。',
          '车队组织者可提前通过官方或合作渠道预定团餐、领航服务及专场篝火晚会。'
        ],
      },
      {
        title: '平台驿站预约说明',
        body: '目前多数驿站属于沿途分散经营，平台正逐步整合优质驿站资源。如果您是车队或研学机构，建议通过平台提交需求，我们将协助对接具备团队承接能力的优质驿站。',
      },
    ],
    faqs: [
      { question: 'G331 沿线的驿站可以露营或停房车吗？', answer: '并非所有驿站都具备露营和房车条件。具备营地资质的综合型驿站通常提供水电接口，但车位有限，旺季必须提前预约。' },
      { question: '驿站餐饮消费高吗？', answer: '沿线驿站餐饮以当地特色农家菜、朝鲜族美食为主，整体消费水平公开透明。正规驿站均有明码标价，遇到节假日建议提前沟通预留食材。' },
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
        title: '出发前必做的车辆与物资补给',
        body: 'G331 虽路况良好，但属于偏远边境游，出发前的准备工作决定了旅途的下限：',
        bullets: [
          '车辆检查：全车油水检查、备胎气压、刹车片厚度。',
          '必备物资：车载充气泵、拖车绳、强光手电、急救包及防蚊虫喷雾。',
          '证件备齐：驾驶证、行驶证、全员身份证，若有无人机需了解当地限飞政策。'
        ],
      },
      {
        title: '加油与新能源车充电策略',
        body: '动力补给是自驾者最关心的问题：',
        bullets: [
          '燃油车：沿途县城及较大镇区均有中石油/中石化，建议油表低于半箱遇加油站即加，不要赌下一个加油站。',
          '新能源车：目前纯电车型走 G331 存在续航焦虑，充电桩主要集中在市区和重点县城，乡镇及驿站充电设施尚未完全普及，建议插混或增程车型出行。'
        ],
      },
      {
        title: '住宿选择与安全防范',
        body: '住宿可选择沿途县城连锁酒店或特色边境民宿。切勿在非正规营地或荒郊野外夜宿车内，以防野生动物侵扰及气温骤降。',
      },
    ],
    faqs: [
      { question: '纯电动汽车适合自驾 G331 吉林段吗？', answer: '目前不太建议纯电动车深入偏远路段。虽然吉林省在加快沿途充电桩建设，但长距离山路爬坡耗电快，且充电设施仍集中在县市级中心，极易产生里程焦虑。' },
      { question: '路上吃饭方便吗？需要带很多干粮吗？', answer: '沿途村镇均有特色餐馆，吃饭非常方便。但考虑到部分山路较长且遇到绝美风景时会停留较久，车内仍需备足饮用水和1-2顿的充饥干粮（如饼干、巧克力、自热火锅）。' },
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
        title: '为什么吉林冰雪被称为“世界三大粉雪基地”之一',
        body: '吉林与欧洲阿尔卑斯山、北美落基山同处“世界冰雪黄金纬度带”。粉雪（Powder Snow）具有含水量低、松软干爽的特质，是滑雪爱好者梦寐以求的雪质。',
        bullets: [
          '长白山滑雪区：以万达、鲁能为代表的度假区，主打高端家庭度假与专业级雪道。',
          '吉林市雪场：以北大湖、万科松花湖为代表，北大湖拥有亚洲最大滑雪山体落差，是专业发烧友首选。',
          '长春冰雪：冰雪新天地（全国最大冰雪主题乐园之一）与净月潭林海雪原。'
        ],
      },
      {
        title: '除了滑雪还能玩什么？',
        body: '吉林冰雪不仅是运动，更是极致的视觉与生活体验：',
        bullets: [
          '雾凇奇观：吉林雾凇被誉为中国四大自然奇观之一，以吉林市雾凇岛、长白山魔界最为典型。',
          '雪地温泉：在零下20度的室外体验长白山火山温泉，感受冰火两重天。',
          '冰雪民俗：体验查干湖冬捕的震撼，或在延边品尝热气腾腾的朝鲜族温面。'
        ],
      },
    ],
    faqs: [
      { question: '不会滑雪去吉林好玩吗？', answer: '绝对好玩。除了滑雪，您可以去长春冰雪新天地看大型冰雕雪建，去吉林市看雾凇，去长白山泡雪地温泉、赏天池冰雪风光，或是去延吉吃美食，都是不滑雪的绝佳选择。' },
      { question: '吉林冰雪游最冷是什么时候？需要怎么穿？', answer: '12月下旬到1月是最冷时期，室外温度可达-20℃到-30℃。建议采用“洋葱穿衣法”：内层排汗速干，中层抓绒保暖，外层防风防水（冲锋衣或长款羽绒服），并务必准备帽子、围巾和加厚保暖鞋。' },
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
        title: '延边为什么是吉林最具辨识度的目的地',
        body: '延边朝鲜族自治州是东北地区唯一、也是中国最大的朝鲜族聚集地，这里融合了边境风光与浓郁的民族风情：',
        bullets: [
          '延吉：作为首府，被誉为“小首尔”，大学城网红墙、水上市场和延吉冷面、烤肉是必打卡体验。',
          '珲春：位于中俄朝三国交界，在防川风景区可“一眼望三国”，体验独特的口岸城市风貌。',
          '图们：中朝边境的重要口岸城市，可近距离观赏国门与界江风光。'
        ],
      },
      {
        title: '边境游与民族风情结合怎么玩',
        body: '建议将延吉作为大本营和美食中心，向四周辐射：',
        bullets: [
          '文化体验：去中国朝鲜族民俗园租一套传统服饰旅拍，感受非遗文化。',
          '边境自驾：沿着 G331 国道从图们开往珲春，一路欣赏界江美景。',
          '自然风光：秋季的长白山南坡或东坡（延边境内）五花山色极具视觉冲击力。'
        ],
      },
    ],
    faqs: [
      { question: '去延边旅游需要护照吗？', answer: '去延边州内的大部分地区（包括延吉、珲春防川、图们国门）都属于中国境内，持本人身份证即可游览，不需要护照。但如果您想参加从珲春出境去俄罗斯海参崴的跨境游，则需要准备护照。' },
      { question: '延吉除了拍照还有什么好吃的推荐？', answer: '延吉是名副其实的美食之城，推荐打卡：正宗延吉冷面（加锅包肉）、韩式烤肉、温面、石锅拌饭、米酒、参鸡汤，以及水上市场（早市）的各种特色小吃。' },
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
        title: '为什么强调使用官方入口？',
        body: '吉林省部分核心景区（如长白山、伪满皇宫博物院等）实行严格的分时段预约和实名制购票政策：',
        bullets: [
          '防骗防黄牛：避免通过非正规渠道购买无效票或高价票。',
          '退改签保障：官方渠道退票退款最迅速、规则最清晰，不收取隐形手续费。',
          '实时公告：遇暴雪、大风等极端天气导致景区临时封闭，官方小程序会第一时间发布通知并全额退款。'
        ],
      },
      {
        title: '长白山景区官方预约避坑指南',
        body: '长白山是吉林最热门的景区，实行全网实名制预约：',
        bullets: [
          '旺季必须提前约：暑期、冰雪旺季及法定节假日，强烈建议提前至少3-5天在官方小程序（如“长白山”）预约购票。',
          '北坡 vs 西坡：官方入口购票时需明确选择北景区或西景区，两地相隔较远，切勿买错入口。',
          '天池开放状态：天池主峰受天气影响极大，购票不代表一定能上主峰，需当天关注官方实时开放状态。'
        ],
      },
    ],
    faqs: [
      { question: '长白山天池因为天气原因没看上，可以退票吗？', answer: '如果因为官方原因导致主峰关闭，主峰车票（倒站车票）可通过原官方购买渠道全额退款，但景区大门票和环保车票一般不予退还（因仍可游览瀑布、地下森林等其他景点）。具体以长白山官方最新政策为准。' },
      { question: '在第三方平台买的票和官方有什么区别？', answer: '正规授权的第三方平台（如携程、美团）票源一般无区别。但若遇到不可抗力需要紧急退改签，官方直销渠道（微信小程序等）的处理速度通常最快，且客服对接更直接。' },
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
