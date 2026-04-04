export type AIKnowledgeModule =
  | ''
  | 'destinations'
  | 'industrial_study_tours'
  | 'route_331'
  | 'official_services'
  | 'cooperation';

export interface AIWidgetContext {
  module: AIKnowledgeModule;
  title: string;
}

export const inferAIWidgetContext = (pageUrl: string): AIWidgetContext => {
  const pathname = String(pageUrl || '/').trim() || '/';

  if (pathname.startsWith('/study-tours')) {
    return {
      module: 'industrial_study_tours',
      title: '工业研学 AI 导览助手',
    };
  }

  if (pathname.startsWith('/self-drive')) {
    return {
      module: 'self_drive',
      title: '自驾攻略 AI 导览助手',
    };
  }

  if (pathname.startsWith('/official-services')) {
    return {
      module: 'official_services',
      title: '官方服务说明 AI 助手',
    };
  }

  if (pathname.startsWith('/cooperation')) {
    return {
      module: 'cooperation',
      title: '合作咨询 AI 助手',
    };
  }

  if (pathname.startsWith('/destinations') || pathname.startsWith('/themes') || pathname.startsWith('/guides')) {
    return {
      module: 'destinations',
      title: '吉林目的地 AI 导览助手',
    };
  }

  return {
    module: '',
    title: '吉林文旅 AI 导览助手',
  };
};
