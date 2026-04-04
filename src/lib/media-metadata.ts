export type MediaRequirement = {
  id: string;
  type: 'image' | 'video';
  label: string;
  labelEn: string;
  priority: 'P0' | 'P1' | 'P2';
  specifications: {
    dimensions?: string;
    aspectRatio?: string;
    format: string;
    duration?: string;
  };
  sourceRecommendation: string;
  notes?: string;
};

export type SectionMediaRequirements = {
  section: string;
  items: MediaRequirement[];
};

export const mediaRequirements: SectionMediaRequirements[] = [
  {
    section: 'destinations',
    items: [
      {
        id: 'changchun-aerial',
        type: 'image',
        label: '长春航拍全景',
        labelEn: 'Changchun Aerial View',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '长春市文广旅局、官方摄影师',
      },
      {
        id: 'changchun-puppet-palace',
        type: 'image',
        label: '伪满皇宫建筑群',
        labelEn: 'Puppet Emperor Palace',
        priority: 'P0',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '伪满皇宫博物院官网',
      },
      {
        id: 'changchun-chiyou',
        type: 'image',
        label: '这有山室内商业体',
        labelEn: 'Chi You Mountain Mall',
        priority: 'P0',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '商场品牌合作',
      },
      {
        id: 'changchun-tram',
        type: 'image',
        label: '54路有轨电车',
        labelEn: 'Route 54 Heritage Tram',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '长春轨道交通官方',
      },
      {
        id: 'changbai-tianchi-summer',
        type: 'image',
        label: '天池夏季全景',
        labelEn: 'Tianchi Summer Panorama',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '长白山管委会官方素材',
      },
      {
        id: 'changbai-tianchi-winter',
        type: 'image',
        label: '天池冬季冰封',
        labelEn: 'Tianchi Winter Ice',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '长白山管委会官方素材',
      },
      {
        id: 'changbai-snow',
        type: 'image',
        label: '滑雪场全貌',
        labelEn: 'Ski Resort Overview',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '万科松花湖/万达长白山度假区官方',
      },
      {
        id: 'changbai-hot-spring',
        type: 'image',
        label: '温泉雾气场景',
        labelEn: 'Hot Spring Mist',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '长白山各温泉景区官方',
      },
      {
        id: 'changbai-fall',
        type: 'image',
        label: '秋季五花山',
        labelEn: 'Autumn Colors',
        priority: 'P1',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '官方/摄影师授权',
      },
      {
        id: 'changbai-mist',
        type: 'image',
        label: '雾凇奇观',
        labelEn: 'Rime Ice Formations',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '魔界/大泉河景区官方',
      },
      {
        id: 'yanbian-tumen',
        type: 'image',
        label: '图们口岸边境线',
        labelEn: 'Tumen Border Crossing',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '延边州文旅局',
      },
      {
        id: 'yanbian-city',
        type: 'image',
        label: '延吉市城市风貌',
        labelEn: 'Yanji Cityscape',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '延吉市政府',
      },
      {
        id: 'yanbian-food',
        type: 'image',
        label: '延边美食组合',
        labelEn: 'Yanbian Food Combination',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '餐厅/美食博主授权',
      },
      {
        id: 'yanbian-costume',
        type: 'image',
        label: '朝鲜族传统服饰',
        labelEn: 'Korean Traditional Costumes',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '延边文化馆/民族村授权',
      },
      {
        id: 'yanbian-kidalce',
        type: 'image',
        label: '春季金达莱花海',
        labelEn: 'Korean Rhododendron Spring',
        priority: 'P2',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '官方/摄影师授权',
      },
    ],
  },
  {
    section: 'study-tours',
    items: [
      {
        id: 'faw-hongqi-history',
        type: 'image',
        label: '红旗历史车型展列',
        labelEn: 'Hongqi Historical Vehicles',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '一汽红旗官方',
      },
      {
        id: 'faw-hongqi-factory',
        type: 'image',
        label: '现代化生产车间',
        labelEn: 'Modern Production Line',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '一汽红旗官方（内部授权）',
      },
      {
        id: 'faw-hongqi-h9',
        type: 'image',
        label: '红旗H9外观三视角',
        labelEn: 'Hongqi H9 Exterior',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '一汽红旗官方产品图',
      },
      {
        id: 'faw-hongqi-brand',
        type: 'image',
        label: '红旗品牌文化墙',
        labelEn: 'Hongqi Brand Wall',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '一汽红旗官方',
      },
      {
        id: 'crrc-production',
        type: 'image',
        label: '高速列车生产线全景',
        labelEn: 'CRRC Production Line',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '中车长客官方（内部授权）',
      },
      {
        id: 'crrc-fuxing',
        type: 'image',
        label: '复兴号标准动车组',
        labelEn: 'Fuxing EMU',
        priority: 'P1',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '中车长客官方',
      },
      {
        id: 'crrc-exhibition',
        type: 'image',
        label: '企业展厅发展历程',
        labelEn: 'CRRC Exhibition Hall',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '中车长客官方',
      },
      {
        id: 'industrial-route-map',
        type: 'image',
        label: '工业文明线路示意图',
        labelEn: 'Industrial Route Map',
        priority: 'P2',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'PNG' },
        sourceRecommendation: '自制定制信息图',
      },
    ],
  },
  {
    section: 'self-drive',
    items: [
      {
        id: 'g331-signage',
        type: 'image',
        label: 'G331标识牌与起点终点',
        labelEn: 'G331 Signage',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '吉林省公路局',
      },
      {
        id: 'g331-aerial',
        type: 'image',
        label: '边境公路蜿蜒航拍',
        labelEn: 'Border Highway Aerial',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '官方/自驾博主授权',
      },
      {
        id: 'g331-border',
        type: 'image',
        label: '中朝边境界河/界碑',
        labelEn: 'China-North Korea Border',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '延边州文旅局',
      },
      {
        id: 'g331-station',
        type: 'image',
        label: '典型驿站外观与服务设施',
        labelEn: 'Highway Station Facilities',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '吉林省公路局/驿站运营方',
      },
      {
        id: 'g331-accommodation',
        type: 'image',
        label: '特色住宿（林场民宿/边境木屋）',
        labelEn: 'Border Homestays',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '地方文旅局/民宿合作',
      },
      {
        id: 'g331-seasonal',
        type: 'image',
        label: '四季路况对比',
        labelEn: 'Seasonal Road Conditions',
        priority: 'P2',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '官方/摄影师授权',
      },
      {
        id: 'g331-vehicle',
        type: 'image',
        label: '自驾车辆与公路组合',
        labelEn: 'Road Trip Vehicle',
        priority: 'P1',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '官方/自驾博主授权',
      },
    ],
  },
  {
    section: 'themes',
    items: [
      {
        id: 'theme-ice-snow',
        type: 'image',
        label: '冰雪景观（雾凇/积雪/冰雕）',
        labelEn: 'Ice & Snow Landscapes',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '吉林省文旅厅/各景区官方',
      },
      {
        id: 'theme-ice-fishing',
        type: 'image',
        label: '查干湖冬捕',
        labelEn: 'Chagan Lake Winter Fishing',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '查干湖旅游区官方',
      },
      {
        id: 'theme-border',
        type: 'image',
        label: '中朝边境公路',
        labelEn: 'China-North Korea Border Road',
        priority: 'P0',
        specifications: { dimensions: '1920×1080', aspectRatio: '16:9', format: 'WebP' },
        sourceRecommendation: '延边州文旅局',
      },
      {
        id: 'theme-industrial',
        type: 'image',
        label: '工厂大门/标志',
        labelEn: 'Factory Landmark',
        priority: 'P1',
        specifications: { dimensions: '1200×800', aspectRatio: '3:2', format: 'WebP' },
        sourceRecommendation: '一汽红旗/中车长客官方',
      },
    ],
  },
  {
    section: 'shop',
    items: [
      {
        id: 'shop-service-pack',
        type: 'image',
        label: '研学资料包封面',
        labelEn: 'Study Tour Package Cover',
        priority: 'P2',
        specifications: { dimensions: '800×600', aspectRatio: '4:3', format: 'PNG' },
        sourceRecommendation: '自制定制',
      },
      {
        id: 'shop-creative',
        type: 'image',
        label: '朝鲜族元素文创',
        labelEn: 'Korean-style Creative Products',
        priority: 'P2',
        specifications: { dimensions: '800×600', aspectRatio: '4:3', format: 'WebP' },
        sourceRecommendation: '地方文创合作方',
      },
      {
        id: 'shop-specialty',
        type: 'image',
        label: '特产礼盒组合',
        labelEn: 'Specialty Gift Boxes',
        priority: 'P2',
        specifications: { dimensions: '800×600', aspectRatio: '4:3', format: 'WebP' },
        sourceRecommendation: '供应商/生产商授权',
      },
      {
        id: 'shop-ginseng',
        type: 'image',
        label: '人参/鹿茸等特产',
        labelEn: 'Ginseng & Deer Antler',
        priority: 'P2',
        specifications: { dimensions: '800×600', aspectRatio: '4:3', format: 'WebP' },
        sourceRecommendation: '供应商授权',
      },
    ],
  },
];

export const getMediaRequirementsBySection = (section: string) =>
  mediaRequirements.find((r) => r.section === section)?.items ?? [];

export const getMediaRequirementsByPriority = (priority: 'P0' | 'P1' | 'P2') =>
  mediaRequirements.flatMap((r) => r.items.filter((i) => i.priority === priority));

export const getAllMediaRequirements = () => mediaRequirements.flatMap((r) => r.items);
