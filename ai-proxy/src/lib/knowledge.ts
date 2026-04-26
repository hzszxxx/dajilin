/**
 * Knowledge Base — Keyword-based retrieval from Markdown files.
 *
 * On every chat request, the user question is matched against knowledge
 * base keywords. Matching paragraphs are prepended to the system prompt so
 * the LLM answers from verified content rather than hallucinating.
 *
 * No embedding / vector DB required — plain text keyword matching.
 */

import * as fs from 'fs';
import * as path from 'path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KnowledgeEntry {
  file: string;       // e.g. "attractions.md"
  category: string;   // e.g. "景点"
  content: string;    // matched paragraph (trimmed)
}

// ---------------------------------------------------------------------------
// Keyword maps
// ---------------------------------------------------------------------------

/** Maps user-facing keywords → which file to search + a display label */
const CATEGORY_RULES: Array<{
  keywords: string[];
  file: string;
  category: string;
}> = [
  {
    keywords: ['景点', '好玩', '天池', '长白山', '雾凇', '净月潭', '松花湖', '伪满皇宫', '查干湖', '防川', '六鼎山', '向海', '露水河'],
    file: 'attractions.md',
    category: '景点',
  },
  {
    keywords: ['美食', '吃', '冷面', '烤肉', '包饭', '火锅', '锅贴', '米肠', '打糕', '朝鲜族', '延边', '餐厅'],
    file: 'food.md',
    category: '美食',
  },
  {
    keywords: ['交通', '怎么去', '自驾', '开车', '飞机', '火车', '高铁', '巴士', '租车', '开车', '公路', '国道', '331', '珲春'],
    file: 'transport.md',
    category: '交通',
  },
  {
    keywords: ['住宿', '酒店', '住', '宾馆', '民宿', '温泉', '度假区', '预订', '房间'],
    file: 'hotels.md',
    category: '住宿',
  },
  {
    keywords: ['节庆', '活动', '节', '滑雪', '冬捕', '雾凇节', '冰雪节', '那达慕', '电影节', '金达莱', '红叶', '什么时候去'],
    file: 'festivals.md',
    category: '节庆活动',
  },
  {
    keywords: ['注意', '攻略', '贴士', '保暖', '穿什么', '安全', '电话', '门票', '预约', '预订', '行程', '推荐', '几天', '几天游', '路线'],
    file: 'tips.md',
    category: '旅行贴士',
  },
];

// ---------------------------------------------------------------------------
// Cached file contents
// ---------------------------------------------------------------------------

let cache: Map<string, string> | null = null;

function loadKnowledgeFiles(): Map<string, string> {
  if (cache) return cache;
  cache = new Map();
  try {
    const files = fs.readdirSync(KNOWLEDGE_DIR);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(KNOWLEDGE_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      cache.set(file, content);
    }
  } catch {
    // Directory may not exist in all environments
  }
  return cache;
}

/**
 * Retrieve relevant paragraphs from the knowledge base.
 * Returns top 3 matched entries (by keyword coverage), each trimmed to ~300 chars.
 */
export function retrieveKnowledge(question: string): KnowledgeEntry[] {
  const files = loadKnowledgeFiles();
  const q = question.toLowerCase();

  const scored: Array<{ entry: KnowledgeEntry; score: number }> = [];

  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.filter(kw => q.includes(kw.toLowerCase())).length;
    if (score === 0) continue;

    const content = files.get(rule.file);
    if (!content) continue;

    // Split by blank lines → each "block" is a potential paragraph
    const blocks = content
      .split(/\n\s*\n/)
      .map(b => b.replace(/#{1,6}\s/g, '').replace(/\n/g, ' ').trim())
      .filter(b => b.length > 20);

    // Pick the block that has the most keyword overlap
    let bestBlock = '';
    let bestBlockScore = 0;
    for (const block of blocks) {
      const blockLower = block.toLowerCase();
      const blockScore = rule.keywords.filter(kw =>
        blockLower.includes(kw.toLowerCase())
      ).length;
      if (blockScore > bestBlockScore) {
        bestBlockScore = blockScore;
        bestBlock = block;
      }
    }

    if (bestBlock) {
      scored.push({
        entry: {
          file: rule.file,
          category: rule.category,
          content: bestBlock.slice(0, 300) + (bestBlock.length > 300 ? '…' : ''),
        },
        score: score * bestBlockScore,
      });
    }
  }

  // Sort by combined score, take top 3
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.entry);
}

/**
 * Format retrieved knowledge entries as a string to inject into system prompt.
 * Returns empty string if nothing matched.
 */
export function formatKnowledgePrompt(question: string): string {
  const entries = retrieveKnowledge(question);
  if (entries.length === 0) return '';

  const header = '【相关知识库信息】\n';
  const body = entries
    .map(e => `[${e.category}]\n${e.content}`)
    .join('\n\n');
  const footer = '\n【回答要求】\n请基于以上知识库信息回答。如果用户问题超出知识库范围，请说明并建议转人工服务。';

  return header + body + footer;
}
