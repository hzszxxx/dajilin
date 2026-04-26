/**
 * MiniMax API Client — OpenAI-compatible endpoint (Token Plan)
 * Endpoint: https://api.minimax.chat/v1/chat/completions
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const MiniMaxMessageRole = z.enum(['user', 'assistant', 'system']);
export type MiniMaxMessageRole = z.infer<typeof MiniMaxMessageRole>;

export interface MiniMaxMessage {
  role: MiniMaxMessageRole;
  content: string;
}

export interface ChatRequest {
  model?: string;
  messages: MiniMaxMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  id: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const MINIMAX_API_BASE = 'https://api.minimaxi.com/v1';

export class MiniMaxClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Send a chat completion request via OpenAI-compatible endpoint.
   * No GroupId required for Token Plan keys.
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const url = `${MINIMAX_API_BASE}/chat/completions`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model || 'M2.7',
        max_tokens: request.max_tokens || 512,
        temperature: request.temperature ?? 0.7,
        messages: request.messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MiniMax API error ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<ChatResponse>;
  }

  /**
   * Build a system prompt for the Jilin tourism AI assistant.
   * Optionally prepends retrieved knowledge base context.
   */
  static buildSystemPrompt(locale: string = 'zh', knowledgeContext?: string): string {
    const prompts: Record<string, string> = {
      zh: `你是吉林文旅 AI 导览助手，专注于为游客提供关于吉林省（长春、吉林、长白山、延边等）的旅游、工业研学、331 国道自驾路线和官方服务的咨询。

核心能力：
- 介绍吉林热门景点、特色美食、四季玩法
- 提供工业研学（长客、一汽、红旗等）行程建议
- 讲解 331 国道吉林段的自驾路线、沿途驿站、注意事项
- 指引官方服务入口（门票预订、驿站申请、合作咨询等）

回答风格：亲切、专业、简洁，控制在 200 字以内。
如果问题超出范围，引导用户转人工服务。`,
      en: `You are the Jilin Culture & Tourism AI Guide Assistant, helping visitors with information about Jilin Province, China — including Changchun, Jilin City, Changbaishan, Yanbian, industrial study tours, Route 331 self-driving, and official services.

Keep answers concise within 200 words. If a question is beyond your scope, suggest human assistance.`,
      ja: `あなたは吉林文旅AIガイドアシスタントです。吉林省（長春、吉林、長白山、延辺など）の観光、工业研学、331国道ドライブルート、公式サービスについてをサポートします。

回答は200文字以内に簡潔に。対応範囲外の質問は人工サービスへの 전환を提案してください。`,
      ko: `당신은 지린 문화·관광 AI 가이드 어시스턴트입니다. 지린성(창춘, 지린, 장백산, 연변 등)의 관광, 산업 체험, 331국도自驾 노선, 공식 서비스에 대해 도와드립니다.

답변은 200자 이내로 간결하게。응답 범위를 벗어나는 질문은人工 서비스로 전환을 제안하세요.`,
    };
    const base = prompts[locale] || prompts.zh;
    if (knowledgeContext) {
      return base + '\n\n' + knowledgeContext;
    }
    return base;
  }
}
