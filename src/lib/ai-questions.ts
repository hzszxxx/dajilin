/**
 * AI Assistant Recommended Questions Configuration
 *
 * Defines recommended questions for each module/section of the AI assistant.
 * These questions are shown as quick-start chips in the chat widget.
 */

export type QuestionCategory =
  | 'destinations'
  | 'study-tours'
  | 'self-drive'
  | 'official-services'
  | 'cooperation';

export type RecommendedQuestion = {
  id: string;
  category: QuestionCategory;
  question: string;
  questionEn: string;
  questionJa: string;
  questionKo: string;
};

// ---------------------------------------------------------------------------
// Knowledge Domain Configuration
// ---------------------------------------------------------------------------

export type KnowledgeDomain = {
  id: QuestionCategory;
  label: string;
  labelEn: string;
  labelJa: string;
  labelKo: string;
  description: string;
  descriptionEn: string;
  /** Questions the AI can confidently answer */
  answerable: string[];
  /** Questions that should trigger human handoff */
  handoffTriggers: string[];
  /** Questions that are out of scope — AI should not answer */
  outOfScope: string[];
  /** Which module key in AIWidget triggers this domain */
  moduleKey: string;
};

export const knowledgeDomains: KnowledgeDomain[] = [
  {
    id: 'destinations',
    label: '吉林文旅导览',
    labelEn: 'Jilin Travel Guide',
    labelJa: '吉林文旅ガイド',
    labelKo: '지린 관광 가이드',
    description: '覆盖吉林目的地导览、季节建议、行程规划基础问题',
    descriptionEn: 'Covers Jilin destination guidance, seasonal advice, and itinerary planning basics',
    answerable: [
      '吉林旅游先从哪里看起',
      '长白山适合几天',
      '延边有什么特色',
      '冬天去吉林玩什么',
      '吉林有哪些目的地',
      '长春除了城市观光还有什么',
      '吉林市和延边是什么关系',
      '哪个目的地适合亲子',
      '哪个目的地适合自驾',
      '最佳旅行季节',
      '长白山北坡和西坡有什么区别',
      '雾凇什么时候去看最好',
      '吉林的美食有哪些推荐',
      '长春一日游怎么安排',
      '去延边需要办理通行证吗',
    ],
    handoffTriggers: [
      '定制行程',
      '安排多天行程',
      '预约门票',
      '预订酒店',
      '团体出行',
      '商务合作',
      '具体报价',
      '实时房态',
      '包车服务',
      '导游预约',
    ],
    outOfScope: [
      '门票价格',
      '酒店预订',
      '机票火车票',
      '具体排期',
      '实时库存',
      '未确认开放的政策',
      '实时天气预报',
      '实时路况信息',
    ],
    moduleKey: 'destinations',
  },
  {
    id: 'study-tours',
    label: '工业研学咨询',
    labelEn: 'Industrial Study Tour Consultation',
    labelJa: '産業研修相談',
    labelKo: '산업 연수 상담',
    description: '覆盖一汽红旗、中车长客、长春工业文明线路等工业研学资源说明',
    descriptionEn: 'Covers FAW Hongqi, CRRC Changchun, Changchun industrial route study resources',
    answerable: [
      '一汽红旗研学适合什么人群',
      '中车长客参访适合什么对象',
      '工业研学有年龄限制吗',
      '长春工业研学有哪些线路',
      '红旗和一汽是什么关系',
      '研学一般安排多长时间',
      '工业文明线路包含哪些参访点',
      '研学需要提前多久预约',
      '企业参访和个人参访有什么区别',
      '研学中有讲解吗',
    ],
    handoffTriggers: [
      '报价',
      '档期',
      '接待条件',
      '定制研学路线',
      '学校团体报名',
      '多人团体预约',
      '确认预约',
      '支付定金',
      '特定日期预约',
      '需要合同',
    ],
    outOfScope: [
      '具体价格',
      '实时档期',
      '未确认开放的参访日期',
      '已满额的预约',
      '跨城市交通安排',
      '食宿安排细节',
      '商城下单与履约',
    ],
    moduleKey: 'industrial_study_tours',
  },
  {
    id: 'self-drive',
    label: '自驾攻略咨询',
    labelEn: 'Self-Drive Guide Consultation',
    labelJa: '自驾攻略相談',
    labelKo: '자가운전 가이드 상담',
    description: '覆盖自驾攻略吉林段路线理解、驿站服务、自驾补给、季节建议',
    descriptionEn: 'Covers Jilin self-drive routes, station services, supplies, seasonal advice',
    answerable: [
      '吉林段自驾攻略适合几天',
      '自驾攻略什么季节去最好',
      '自驾沿途有驿站服务吗',
      '驿站服务通常提供什么',
      '自驾需要准备什么',
      '自驾攻略更适合什么出行方式',
      '沿途补给和住宿怎么安排',
      '吉林段自驾攻略有多长',
      '哪些路段需要特别注意',
      '有推荐的自驾路线吗',
    ],
    handoffTriggers: [
      '预约驿站',
      '预订沿线住宿',
      '安排车队',
      '摄影团',
      '团建活动',
      '定制路线',
      '合作驿站',
      '媒体合作',
    ],
    outOfScope: [
      '实时路况',
      '天气预报',
      '具体住宿预订',
      '加油站在哪里',
      '门票代订',
      '导航服务',
      '救援服务',
    ],
    moduleKey: 'self_drive',
  },
  {
    id: 'official-services',
    label: '官方服务入口说明',
    labelEn: 'Official Service Entry Guidance',
    labelJa: '公式サービス入口の説明',
    labelKo: '공식 서비스 입구 설명',
    description: '覆盖吉林官方文旅票务预约入口、一机游吉林等官方服务说明',
    descriptionEn: 'Covers Jilin official cultural tourism ticket booking entrance, official service descriptions like Jilin One Machine Tour',
    answerable: [
      '吉林官方票务和预约入口怎么看',
      '长白山门票怎么预约',
      '平台能帮买票吗',
      '为什么要用官方入口',
      '一机游吉林是什么',
      '哪些服务必须走官方入口',
      '官方入口和平台有什么区别',
      '如何找到官方预约页面',
      '哪些事项可以平台协助',
    ],
    handoffTriggers: [
      '协助预约',
      '加急预约',
      '团体预约',
      '特殊预约需求',
      '预约被拒绝怎么办',
      '官方系统故障',
      '合作接入官方系统',
    ],
    outOfScope: [
      '直接帮买票',
      '实时票务库存',
      '退票改签',
      '支付失败',
      '官方未开放的预约',
      '报销问题',
    ],
    moduleKey: 'official_services',
  },
  {
    id: 'cooperation',
    label: '合作咨询引导',
    labelEn: 'Cooperation Inquiry Guidance',
    labelJa: '協業相談の案内',
    labelKo: '협업 문의 안내',
    description: '覆盖工业研学合作、驿站合作、团体定制、资源合作等合作咨询引导',
    descriptionEn: 'Covers Jilin industrial study tour cooperation, rest stop cooperation, group customization, resource cooperation',
    answerable: [
      '如何联系合作咨询',
      '我们学校想做研学应该怎么咨询',
      '我有驿站资源怎么合作',
      '我们想做企业参访下一步怎么办',
      '可以合作哪些类型',
      '合作对象需要什么资质',
      '目前接受哪类合作',
      '怎么提交合作咨询',
      '合作流程是什么',
      '有联系方式吗',
    ],
    handoffTriggers: [
      '提交具体需求',
      '报价谈判',
      '合同细节',
      '付款方式',
      '交付标准',
      '排他条款',
      '长期战略合作',
    ],
    outOfScope: [
      '即时报价',
      '在线签约',
      '实时客服对话',
      '已提交线索的状态查询',
      '支付与结算',
      '法律咨询',
    ],
    moduleKey: 'cooperation',
  },
];

// ---------------------------------------------------------------------------
// Recommended Questions
// ---------------------------------------------------------------------------

export const recommendedQuestions: RecommendedQuestion[] = [
  // 吉林文旅导览 (destinations)
  {
    id: 'where-to-start',
    category: 'destinations',
    question: '吉林旅游先从哪里看起？',
    questionEn: 'Where should I start planning a Jilin trip?',
    questionJa: '吉林旅行はどこから見始めればよいですか？',
    questionKo: '지린 여행은 어디서부터 보면 좋나요?',
  },
  // CONVERSION: 定制行程
  {
    id: 'dest-customize',
    category: 'destinations',
    question: '我想定制一个吉林行程，应该找谁？',
    questionEn: 'I want to customize a Jilin itinerary — who should I contact?',
    questionJa: '吉林のカスタム旅程を作成したいですが、誰に連絡すればよいですか？',
    questionKo: '지린 커스텀 여정을 원하는데 누구에게 문의해야 하나요?',
  },
  // CONVERSION: 多人出行
  {
    id: 'dest-group',
    category: 'destinations',
    question: '多人出行定制怎么联系？',
    questionEn: 'How do I arrange a group customized trip?',
    questionJa: '団体旅行のカスタマイズはどのように連絡すればいいですか？',
    questionKo: '단체 맞춤 여행은 어떻게 문의하나요?',
  },
  // CONVERSION: 商务合作
  {
    id: 'dest-biz',
    category: 'destinations',
    question: '我们公司想合作吉林文旅项目，怎么谈？',
    questionEn: 'Our company wants to cooperate on Jilin tourism projects — how do we start?',
    questionJa: 'わが社は吉林文旅プロジェクトで協力したいですが、どう始めればよいですか？',
    questionKo: '우리 회사는 지린 관광 프로젝트를 협력하고 싶은데 어떻게 시작하나요?',
  },
  {
    id: 'changbai-days',
    category: 'destinations',
    question: '长白山适合安排几天？',
    questionEn: 'How many days should I plan for Changbai Mountain?',
    questionJa: '長白山は几日が空好呢？',
    questionKo: '장백산은 며칠이 적절한가요?',
  },
  {
    id: 'changbai-winter',
    category: 'destinations',
    question: '冬季去长白山怎么玩？',
    questionEn: 'How to visit Changbai Mountain in winter?',
    questionJa: '冬の長白山はどう游玩すればいいですか？',
    questionKo: '겨울에 장백산을 어떻게 즐기나요?',
  },
  {
    id: 'yanbian-food',
    category: 'destinations',
    question: '延边有什么必吃的美食？',
    questionEn: 'What food should I try in Yanbian?',
    questionJa: '延辺で必ず食べるべき美食は何ですか？',
    questionKo: '연변에서 꼭 먹어야 할 미식은 뭐가 있나요?',
  },
  {
    id: 'yanbian-border',
    category: 'destinations',
    question: '延边和331国道有什么关系？',
    questionEn: 'What is the connection between Yanbian and Route 331?',
    questionJa: '延辺と331国道の関係は何ですか？',
    questionKo: '연변과 331 국도의 관계는 뭐예요?',
  },
  {
    id: 'changchun-beyond',
    category: 'destinations',
    question: '长春除了城市观光还有什么特色？',
    questionEn: 'What else is special about Changchun besides city sightseeing?',
    questionJa: '長春は都市観光以外にどんな特色がありますか？',
    questionKo: '창춘은 도시 관광 외에 어떤 특색이 있나요?',
  },
  {
    id: 'jilin-city-identity',
    category: 'destinations',
    question: '吉林市和延边分别是什么定位？',
    questionEn: 'What are the different positioning of Jilin City and Yanbian?',
    questionJa: '吉林市と延辺はそれぞれどう位置づけられていますか？',
    questionKo: '지린 시와 연변은 각각 어떻게 위치づけて 있나요?',
  },
  {
    id: 'destinations-family',
    category: 'destinations',
    question: '哪个目的地最适合亲子游？',
    questionEn: 'Which destination is best for family travel?',
    questionJa: 'どの目的地が家族旅行に最適ですか？',
    questionKo: '어떤 목적지가 가족 여행에 가장 적합한가요?',
  },
  {
    id: 'destinations-roadtrip',
    category: 'destinations',
    question: '哪个目的地最适合自驾？',
    questionEn: 'Which destination is best for self-driving?',
    questionJa: 'どの目的地がレンタカー旅行に最適ですか？',
    questionKo: '어떤 목적지가 자가운전에 가장 적합한가요?',
  },
  {
    id: 'best-season',
    category: 'destinations',
    question: '吉林最佳旅行季节是什么时候？',
    questionEn: 'What is the best season to visit Jilin?',
    questionJa: '吉林への最佳の旅行季節是什么时候ですか？',
    questionKo: '지린 모범 여행 계절은 언제인가요?',
  },
  {
    id: 'itinerary-3days',
    category: 'destinations',
    question: '吉林3天2夜怎么安排？',
    questionEn: 'How to plan a 3-day 2-night Jilin itinerary?',
    questionJa: '吉林3泊4日をどう安排了らいいですか？',
    questionKo: '지린 3박 4일 어떻게 계획하나요?',
  },
  {
    id: 'winter-jilin',
    category: 'destinations',
    question: '冬天去吉林玩什么？',
    questionEn: 'What can I do in Jilin during winter?',
    questionJa: '冬に吉林で何を遊びますか？',
    questionKo: '겨울에 지린에서 뭘 할 수 있나요?',
  },
  // 工业研学咨询 (study-tours)
  {
    id: 'faw-hongqi-who',
    category: 'study-tours',
    question: '一汽红旗研学适合什么人群？',
    questionEn: 'Who is the FAW Hongqi study tour suitable for?',
    questionJa: '一汽紅旗の研修はどの層に適していますか？',
    questionKo: 'FAW 홍치 연수는 어떤 대상에 적합한가요?',
  },
  {
    id: 'faw-hongqi-content',
    category: 'study-tours',
    question: '一汽红旗研学主要看什么？',
    questionEn: 'What can I see during the FAW Hongqi study tour?',
    questionJa: '一汽紅旗の研修では主に何を見ますか？',
    questionKo: 'FAW 홍치 연수에서는 주로 뭘 보나요?',
  },
  {
    id: 'crrc-who',
    category: 'study-tours',
    question: '中车长客参访适合什么对象？',
    questionEn: 'Who is CRRC Changchun visit suitable for?',
    questionJa: '中車長客の訪問はどの対象に適していますか？',
    questionKo: 'CRRC 창춘 방문은 어떤 대상에게 적합한가요?',
  },
  {
    id: 'study-tour-age',
    category: 'study-tours',
    question: '工业研学有年龄限制吗？',
    questionEn: 'Are there age restrictions for industrial study tours?',
    questionJa: '産業研修には年齢制限がありますか？',
    questionKo: '산업 연수에 연령 제한이 있나요?',
  },
  {
    id: 'changchun-industrial-routes',
    category: 'study-tours',
    question: '长春工业研学有哪些线路？',
    questionEn: 'What routes are available for Changchun industrial study tours?',
    questionJa: '長春の産業研修にはどのラインがありますか？',
    questionKo: '창춘 산업 연수에는 어떤 루트가 있나요?',
  },
  {
    id: 'industrial-route-content',
    category: 'study-tours',
    question: '工业文明线路包含哪些参访点？',
    questionEn: 'What visit points are included in the Industrial Civilization route?',
    questionJa: '産業文明ラインにはどの訪問ポイントが含まれていますか？',
    questionKo: '산업 문명 라인에는 어떤 방문 포인트가 포함되어 있나요?',
  },
  {
    id: 'study-tour-duration',
    category: 'study-tours',
    question: '研学一般安排多长时间？',
    questionEn: 'How long is a typical study tour?',
    questionJa: '研修は通常どのくらいの期間ですか？',
    questionKo: '연수는 보통 얼마나 걸리나요?',
  },
  {
    id: 'study-tour-advance',
    category: 'study-tours',
    question: '研学需要提前多久预约？',
    questionEn: 'How far in advance should I book a study tour?',
    questionJa: '研修はどの程度前に予約する必要がありますか？',
    questionKo: '연수는 얼마나 미리 예약해야 하나요?',
  },
  {
    id: 'enterprise-visit',
    category: 'study-tours',
    question: '企业参访和个人参访有什么区别？',
    questionEn: 'What is the difference between corporate and individual visits?',
    questionJa: '企業訪問と個人訪問にはどんな違いがありますか？',
    questionKo: '기업 방문과 개인 방문은 어떤 차이가 있나요?',
  },
  {
    id: 'study-tour-guide',
    category: 'study-tours',
    question: '研学过程中有专业讲解吗？',
    questionEn: 'Is there professional commentary during the study tour?',
    questionJa: '研修中には専門の解説がありますか？',
    questionKo: '연수 중에 전문 해설이 있나요?',
  },
  // CONVERSION: 定制研学
  {
    id: 'study-tour-custom',
    category: 'study-tours',
    question: '我想定制一个研学行程，应该找谁？',
    questionEn: 'I want to customize a study tour — who should I contact?',
    questionJa: 'カスタム研修旅程を作成したいですが、誰に連絡すればよいですか？',
    questionKo: '맞춤 연수 일정을 원하는데 누구에게 문의해야 하나요?',
  },
  // CONVERSION: 学校团体报名
  {
    id: 'study-tour-school-group',
    category: 'study-tours',
    question: '我们学校想做研学，应该怎么咨询？',
    questionEn: 'Our school wants to arrange a study tour — how should we consult?',
    questionJa: '私たちの学校は研修やりたいですが、どう相談すればよいですか？',
    questionKo: '우리 학교에서 연수를想做인데 어떻게 상담하나요?',
  },
  // CONVERSION: 企业参访
  {
    id: 'study-tour-enterprise-next',
    category: 'study-tours',
    question: '我们想做企业参访，下一步怎么办？',
    questionEn: 'We want to arrange a corporate visit — what are the next steps?',
    questionJa: '私たちは企業の訪問をやりたいですが、次はどうすればいいですか？',
    questionKo: '우리 기업 방문想做인데 다음은 어떻게 하나요?',
  },
  // 自驾攻略咨询 (self-drive)
  {
    id: 'g331-days',
    category: 'self-drive',
    question: '331 吉林段适合几天自驾？',
    questionEn: 'How many days are recommended for Route 331 Jilin section?',
    questionJa: '331吉林区間の自動車旅行は何日が目安ですか？',
    questionKo: '331 지린 구간 자가운전은 며칠이 적절한가요?',
  },
  {
    id: 'g331-season',
    category: 'self-drive',
    question: '331国道什么季节去最好？',
    questionEn: 'What is the best season to travel Route 331?',
    questionJa: '331国道はどの季節に訪れるのが最好ですか？',
    questionKo: '331 국도는 어느 계절에 가는 게 가장 좋아요?',
  },
  {
    id: 'g331-stations',
    category: 'self-drive',
    question: '331国道沿途有驿站服务吗？',
    questionEn: 'Are there station services along Route 331?',
    questionJa: '331国道の沿道には驛站サービスがありますか？',
    questionKo: '331 국도沿途에 거점이 있나요?',
  },
  {
    id: 'g331-station-services',
    category: 'self-drive',
    question: '驿站服务通常提供什么？',
    questionEn: 'What services do the stations along Route 331 typically provide?',
    questionJa: '驛站サービスでは通常何が提供されますか？',
    questionKo: '거점 서비스는 보통 뭘 제공하나요?',
  },
  {
    id: 'g331-self-drive-prep',
    category: 'self-drive',
    question: '自驾331需要准备什么？',
    questionEn: 'What should I prepare for a self-drive trip on Route 331?',
    questionJa: '331をレンタカーで走るには何の準備が必要ですか？',
    questionKo: '331 자가운전에는 뭘 준비해야 하나요?',
  },
  {
    id: 'g331-type',
    category: 'self-drive',
    question: '331更适合亲子、自驾还是摄影？',
    questionEn: 'Is Route 331 more suitable for families, self-driving, or photography?',
    questionJa: '331は家族、レンタカー、写真撮影のいずれに適していますか？',
    questionKo: '331은 가족, 자가운전,写真 중哪种이 더 적합한가요?',
  },
  {
    id: 'g331-supplies',
    category: 'self-drive',
    question: '沿线补给和住宿怎么安排？',
    questionEn: 'How to plan supplies and accommodation along Route 331?',
    questionJa: '沿道の補給と宿泊はどう安排すればいいですか？',
    questionKo: '沿途 보급과 숙소는 어떻게安排的就可以요?',
  },
  {
    id: 'g331-length',
    category: 'self-drive',
    question: '331吉林段全程有多长？',
    questionEn: 'How long is the Jilin section of Route 331 in total?',
    questionJa: '331吉林区間の全長はどのくらいですか？',
    questionKo: '331 지린 구간 전장은 얼마나 되나요?',
  },
  {
    id: 'g331-caution',
    category: 'self-drive',
    question: '331自驾有哪些路段需要特别注意？',
    questionEn: 'Which sections of Route 331 require special attention for self-driving?',
    questionJa: '331のどの区間に特に注意する必要がありますか？',
    questionKo: '331 자가운전에서 어떤 구간에特别注意해야 하나요?',
  },
  {
    id: 'g331-recommended',
    category: 'self-drive',
    question: '有推荐的自驾路线吗？',
    questionEn: 'Is there a recommended self-driving route?',
    questionJa: '推奨される自動車のルートはありますか？',
    questionKo: '추천 자가운전 루트가 있나요?',
  },
  // CONVERSION: 预约驿站
  {
    id: 'g331-book-station',
    category: 'self-drive',
    question: '我想预约驿站服务，应该怎么联系？',
    questionEn: 'I want to book station services — how should I contact?',
    questionJa: '驛站サービスを予約したいですが、どう連絡すればいいですか？',
    questionKo: '거점 서비스를 예약하고 싶은데 어떻게 연락하나요?',
  },
  // CONVERSION: 定制路线
  {
    id: 'g331-custom-route',
    category: 'self-drive',
    question: '我想定制一条331自驾路线，怎么咨询？',
    questionEn: 'I want to customize a Route 331 self-drive itinerary — how do I consult?',
    questionJa: '331レンタカールートをカスタマイズしたいですが、どう相談すればよいですか？',
    questionKo: '331 자가운전 일정을 맞춤으로 원하는데 어떻게 상담하나요?',
  },
  // 官方服务入口说明 (official-services)
  {
    id: 'booking-official',
    category: 'official-services',
    question: '吉林官方票务和预约入口怎么看？',
    questionEn: 'How can I access official booking channels in Jilin?',
    questionJa: '吉林の公式予約入口はどう確認しますか？',
    questionKo: '지린 공식 예약 입구는 어떻게 확인하나요?',
  },
  {
    id: 'changbai-booking',
    category: 'official-services',
    question: '长白山门票怎么预约？',
    questionEn: 'How to book tickets for Changbai Mountain?',
    questionJa: '長白山のチケットはどのように予約しますか？',
    questionKo: '장백산 티켓은 어떻게 예약하나요?',
  },
  {
    id: 'platform-help',
    category: 'official-services',
    question: '平台能直接帮买票吗？',
    questionEn: 'Can the platform help me purchase tickets directly?',
    questionJa: 'プラットフォームは直接チケット購入を手伝ってもらえますか？',
    questionKo: '플랫폼에서 직접 티켓 구매 도와주나요?',
  },
  {
    id: 'why-official',
    category: 'official-services',
    question: '为什么有些服务要以官方入口为准？',
    questionEn: 'Why should some services be accessed through official channels?',
    questionJa: 'なぜ一部のサービスは公式入口を利用すべきですか？',
    questionKo: '왜 일부 서비스는 공식 입구를 이용해야 하나요?',
  },
  {
    id: 'yijoy-jilin',
    category: 'official-services',
    question: '一机游吉林是什么？',
    questionEn: 'What is YiJiYou Jilin?',
    questionJa: '一機游吉林とは何ですか？',
    questionKo: '원기유 지린이란 무엇인가요?',
  },
  {
    id: 'official-vs-platform',
    category: 'official-services',
    question: '官方入口和平台有什么区别？',
    questionEn: 'What is the difference between official entry and the platform?',
    questionJa: '公式入口とプラットフォームの違いは何ですか？',
    questionKo: '공식 입구와 플랫폼의 차이는 무엇인가요?',
  },
  {
    id: 'find-official',
    category: 'official-services',
    question: '如何找到官方预约页面？',
    questionEn: 'How to find the official booking page?',
    questionJa: '公式予約ページはどこで見つけられますか？',
    questionKo: '공식 예약 페이지는 어떻게 찾나요?',
  },
  {
    id: 'platform-assist',
    category: 'official-services',
    question: '哪些事项可以由平台协助？',
    questionEn: 'What matters can the platform assist with?',
    questionJa: '哪些の事項はプラットフォームで手伝ってもらえますか？',
    questionKo: '어떤 사항을 플랫폼에서 도와줄 수 있나요?',
  },
  // 合作咨询引导 (cooperation)
  {
    id: 'cooperation',
    category: 'cooperation',
    question: '如何联系合作咨询？',
    questionEn: 'How can I contact for cooperation inquiries?',
    questionJa: 'どのように協業相談に連絡できますか？',
    questionKo: '협업 문의를 어떻게 하나요?',
  },
  {
    id: 'school-study-tour',
    category: 'cooperation',
    question: '我们学校想做研学应该怎么咨询？',
    questionEn: 'Our school wants to arrange a study tour — how should we consult?',
    questionJa: '私たちの学校は研修やりたいですが、どう相談すればよいですか？',
    questionKo: '우리 학교에서 연수想做인데 어떻게 상담하나요?',
  },
  {
    id: 'station-cooperation',
    category: 'cooperation',
    question: '我有驿站资源怎么合作？',
    questionEn: 'I have station resources — how can we cooperate?',
    questionJa: '驛站の资源がありますが、どう協力すればいいですか？',
    questionKo: '저는 거점 자원がある인데 어떻게 협력하나요?',
  },
  {
    id: 'enterprise-visit-next',
    category: 'cooperation',
    question: '我们想做企业参访下一步怎么办？',
    questionEn: 'We want to arrange a corporate visit — what are the next steps?',
    questionJa: '私たちは企業の訪問をやりたいですが、次はどうすればいいですか？',
    questionKo: '우리 기업 방문想做인데 다음은 어떻게 하나요?',
  },
  {
    id: 'cooperation-types',
    category: 'cooperation',
    question: '大吉林目前接受哪些类型的合作？',
    questionEn: 'What types of cooperation does Dajilin currently accept?',
    questionJa: '大吉林は現時点でどの種類の協業を受け入れていますか？',
    questionKo: '대지린은 현재 어떤 종류의 협력을受け入れ나요?',
  },
  {
    id: 'cooperation-qualification',
    category: 'cooperation',
    question: '合作对象需要什么资质或条件？',
    questionEn: 'What qualifications or conditions do cooperation partners need?',
    questionJa: '協業パートナーはどのような資格や条件が必要ですか？',
    questionKo: '협력 대상은 어떤 자격이나 조건이 필요하나요?',
  },
  {
    id: 'cooperation-how',
    category: 'cooperation',
    question: '怎么提交合作咨询？',
    questionEn: 'How do I submit a cooperation inquiry?',
    questionJa: 'どのように協業相談を提出すればいいですか？',
    questionKo: '협력 상담은 어떻게 제출하나요?',
  },
  {
    id: 'cooperation-process',
    category: 'cooperation',
    question: '合作流程是什么？',
    questionEn: 'What is the cooperation process?',
    questionJa: '協業流程は何ですか？',
    questionKo: '협력 프로세스는 무엇인가요?',
  },
  {
    id: 'cooperation-contact',
    category: 'cooperation',
    question: '有具体的联系方式吗？',
    questionEn: 'Is there a specific contact method?',
    questionJa: '具体的な連絡方法はありますか？',
    questionKo: '구체적인 연락 방식이 있나요?',
  },
  {
    id: 'group-custom',
    category: 'cooperation',
    question: '团体定制服务怎么咨询？',
    questionEn: 'How to consult about group customization services?',
    questionJa: '団体カスタマイズサービスの相談方法は？',
    questionKo: '단체定制 서비스는 어떻게 상담하나요?',
  },
  // CONVERSION: 提交具体需求
  {
    id: 'cooperation-submit',
    category: 'cooperation',
    question: '我已经有具体需求了，怎么提交咨询？',
    questionEn: 'I already have specific requirements — how do I submit an inquiry?',
    questionJa: 'すでに具体的なニーズがありますが、どのように相談を提出すればいいですか？',
    questionKo: '이미 구체적인 니즈가 있는데 어떻게 상담을 제출하나요?',
  },
  // Additional destinations questions - Seasonal & Specific
  {
    id: 'changbai-north-vs-west',
    category: 'destinations',
    question: '长白山北坡和西坡有什么区别？',
    questionEn: 'What is the difference between Changbai Mountain North and West slopes?',
    questionJa: '長白山北坡と西坡の違いは何ですか？',
    questionKo: '장백산 북파와 서파의 차이는 무엇인가요?',
  },
  {
    id: 'rime-season',
    category: 'destinations',
    question: '雾凇什么时候去看最好？',
    questionEn: 'When is the best time to see the rime ice?',
    questionJa: '樹氷はいつ見頃ですか？',
    questionKo: '무|GE中国市场什么时候去看最好?',
  },
  {
    id: 'jilin-food',
    category: 'destinations',
    question: '吉林有什么必吃的美食？',
    questionEn: 'What food should I try in Jilin?',
    questionJa: '吉林で必ず食べるべき美食は何ですか？',
    questionKo: '지린에서 꼭 먹어야 할 미식은 뭐가 있나요?',
  },
  {
    id: 'changchun-day-trip',
    category: 'destinations',
    question: '长春一日游怎么安排？',
    questionEn: 'How to plan a Changchun day trip?',
    questionJa: '長春の日帰り旅行はどう計画しますか？',
    questionKo: '창춘 당일 투어 어떻게 계획하나요?',
  },
  {
    id: 'yanbian-pass',
    category: 'destinations',
    question: '去延边需要办理通行证吗？',
    questionEn: 'Do I need a permit to visit Yanbian?',
    questionJa: '延辺訪問に許可証が必要ですか？',
    questionKo: '연변 방문에 통행증이 필요하나요?',
  },
  {
    id: 'changbai-ski',
    category: 'destinations',
    question: '吉林有哪些滑雪场？',
    questionEn: 'What ski resorts are there in Jilin?',
    questionJa: '吉林有哪些滑雪場がありますか？',
    questionKo: '지린에 스키장은有哪些地方?',
  },
  {
    id: 'jilin-hot-spring',
    category: 'destinations',
    question: '吉林有温泉吗？',
    questionEn: 'Are there hot springs in Jilin?',
    questionJa: '吉林に温泉はありますか？',
    questionKo: '지린에 온천이 있나요?',
  },
  // Additional 331 Route questions
  {
    id: 'g331-total-length',
    category: 'self-drive',
    question: '331国道全程有多长？',
    questionEn: 'How long is the entire Route 331?',
    questionJa: '331国道の全長はどのくらいですか？',
    questionKo: '331国道 전장은 얼마나 되나요?',
  },
  {
    id: 'g331-difficulty',
    category: 'self-drive',
    question: '331自驾难度如何？需要什么车型？',
    questionEn: 'How difficult is the Route 331 self-drive? What vehicle is needed?',
    questionJa: '331の себеdriveの難易度は？どんな車が必要ですか？',
    questionKo: '331 자가운전 난이도는 어떤가요? 어떤 차량이 필요한가요?',
  },
  {
    id: 'g331-winter-driving',
    category: 'self-drive',
    question: '冬季自驾331需要注意什么？',
    questionEn: 'What should I note when driving Route 331 in winter?',
    questionJa: '冬に331を 운전할 때 무엇に注意する必要がありますか？',
    questionKo: '겨울에 331 운전 시 무엇을 주의해야 하나요?',
  },
  {
    id: 'g331-photo-spots',
    category: 'self-drive',
    question: '331沿途有哪些拍照点？',
    questionEn: 'What are the best photo spots along Route 331?',
    questionJa: '331の沿途にはどんな写真スポットがありますか？',
    questionKo: '331沿途에有哪些 사진 스팟이 있나요?',
  },
  {
    id: 'g331 camping',
    category: 'self-drive',
    question: '331可以露营吗？有哪些营地？',
    questionEn: 'Can I camp along Route 331? Are there campsites?',
    questionJa: '331の沿途でキャンプできますか？营地はありますか？',
    questionKo: '331에서 캠핑이 가능하나요? 캠핑장이 있나요?',
  },
  // Additional study tour questions
  {
    id: 'study-tour-vehicle',
    category: 'study-tours',
    question: '研学活动交通怎么安排？',
    questionEn: 'How is transportation arranged for study tours?',
    questionJa: '研修の交通はどう手配されますか？',
    questionKo: '연수 활동 교통은 어떻게安排的就可以요?',
  },
  {
    id: 'study-tour-certificate',
    category: 'study-tours',
    question: '研学完成后有证书吗？',
    questionEn: 'Is there a certificate after completing a study tour?',
    questionJa: '研修完了後に証明書はもらえますか？',
    questionKo: '연수 완료 후 인증서가 있나요?',
  },
  {
    id: 'study-tour-teacher',
    category: 'study-tours',
    question: '研学有老师带队吗？',
    questionEn: 'Is there a teacher accompanying the study tour?',
    questionJa: '研修には先生が带队しますか？',
    questionKo: '연수에 선생님이带队하나요?',
  },
  {
    id: 'study-tour-safety',
    category: 'study-tours',
    question: '研学活动有什么安全保障？',
    questionEn: 'What safety measures are there for study tours?',
    questionJa: '研修活動にはどのような安全保障がありますか？',
    questionKo: '연수 활동에 어떤 안전 보장措施이 있나요?',
  },
  {
    id: 'study-tour-meals',
    category: 'study-tours',
    question: '研学期间餐食怎么安排？',
    questionEn: 'How are meals arranged during the study tour?',
    questionJa: '研修期间的膳食はどう手配されますか？',
    questionKo: '연수 기간 식사는 어떻게安排的就可以요?',
  },
];

export const getQuestionsByCategory = (category: QuestionCategory): RecommendedQuestion[] =>
  recommendedQuestions.filter((q) => q.category === category);

export const getQuestionsByLocale = (locale: string): { id: string; question: string }[] => {
  const localeMap: Record<string, keyof RecommendedQuestion> = {
    zh: 'question',
    en: 'questionEn',
    ja: 'questionJa',
    ko: 'questionKo',
  };
  const key = localeMap[locale] || 'question';
  return recommendedQuestions.map((q) => ({ id: q.id, question: q[key] }));
};

export const getKnowledgeDomains = (): KnowledgeDomain[] => knowledgeDomains;

export const getKnowledgeDomainByModule = (moduleKey: string): KnowledgeDomain | undefined =>
  knowledgeDomains.find((d) => d.moduleKey === moduleKey);

export const getKnowledgeDomainById = (id: QuestionCategory): KnowledgeDomain | undefined =>
  knowledgeDomains.find((d) => d.id === id);
