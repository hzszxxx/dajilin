/**
 * AI Chat Component - Phase 2
 *
 * Enhanced AI chat with:
 * - Typing indicators
 * - Message timestamps
 * - Conversation history display
 * - Suggested follow-up questions
 * - Human handoff mechanism
 * - Real OpenClaw AI integration
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  summary?: string;
  detail?: string;
}

export interface SuggestedAction {
  type: 'open_page' | 'handoff' | 'suggested_question';
  label: string;
  target?: string;
  question_id?: string;
}

export interface ChatState {
  isOpen: boolean;
  isTyping: boolean;
  sessionId: string;
  messages: ChatMessageData[];
  suggestedFollowUps: string[];
  error: string | null;
  handoffFormVisible: boolean;
  handoffSubmitting: boolean;
  handoffSuccess: boolean;
}

export interface AIChatProps {
  siteId: string;
  pageUrl: string;
  module: string;
  locale: string;
  title: string;
  scope: string;
  introA: string;
  introB: string;
  triggerMain: string;
  triggerSub: string;
  closeLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  handoffTitle: string;
  handoffDesc: string;
  namePlaceholder: string;
  contactPlaceholder: string;
  orgPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  continueLabel: string;
  fallbackSummary: string;
  fallbackDetail: string;
  handoffLabel: string;
  handoffSuccessMsg: string;
  handoffSuccessDetail: string;
  handoffFailMsg: string;
  handoffFailDetail: string;
  typingLabel: string;
  apiBaseUrl: string;
  endpoints: {
    aiSession: string;
    aiChat: string;
    aiRecommendedQuestions: string;
    aiHandoff: string;
  };
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

const formatTimestamp = (timestamp: number, locale: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const generateId = (): string => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TypingIndicator: React.FC<{ label: string }> = ({ label }) => (
  <div className="ai-message ai-message-assistant ai-message-typing">
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span className="typing-label">{label}</span>
  </div>
);

const MessageTimestamp: React.FC<{ timestamp: number; locale: string }> = ({
  timestamp,
  locale,
}) => <time className="ai-message-timestamp">{formatTimestamp(timestamp, locale)}</time>;

const SuggestedFollowUps: React.FC<{
  questions: string[];
  onSelect: (question: string) => void;
}> = ({ questions, onSelect }) => {
  if (!questions.length) return null;

  return (
    <div className="ai-suggested-followups">
      <span className="followups-label">相关问题：</span>
      {questions.map((q, i) => (
        <button
          key={`followup-${i}`}
          type="button"
          className="ai-followup-chip"
          onClick={() => onSelect(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

const HandoffForm: React.FC<{
  onSubmit: (data: {
    name: string;
    phoneOrWechat: string;
    organization: string;
    message: string;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  namePlaceholder: string;
  contactPlaceholder: string;
  orgPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  continueLabel: string;
}> = ({
  onSubmit,
  onCancel,
  isSubmitting,
  namePlaceholder,
  contactPlaceholder,
  orgPlaceholder,
  messagePlaceholder,
  submitLabel,
  continueLabel,
}) => {
  const [name, setName] = useState('');
  const [phoneOrWechat, setPhoneOrWechat] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, phoneOrWechat, organization, message });
  };

  return (
    <form className="ai-handoff-form" onSubmit={handleSubmit}>
      <h3>人工服务申请</h3>
      <p>留下联系方式，客服人员将尽快与您联系</p>

      <input
        type="text"
        placeholder={namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder={contactPlaceholder}
        value={phoneOrWechat}
        onChange={(e) => setPhoneOrWechat(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder={orgPlaceholder}
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      <textarea
        placeholder={messagePlaceholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        required
      />

      <div className="ai-handoff-actions">
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : submitLabel}
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {continueLabel}
        </button>
      </div>
    </form>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export const AIChat: React.FC<AIChatProps> = (props) => {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    isTyping: false,
    sessionId: '',
    messages: [],
    suggestedFollowUps: [],
    error: null,
    handoffFormVisible: false,
    handoffSubmitting: false,
    handoffSuccess: false,
  });

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const storageKey = `dajilin-ai-session:${props.siteId}`;

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setState((prev) => ({
          ...prev,
          sessionId: session.sessionId || '',
          messages: session.messages || [],
        }));
      } catch {
        // Invalid session data, ignore
      }
    }
  }, [storageKey]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isOpen]);

  // Initialize session when panel opens
  const ensureSession = useCallback(async (): Promise<string> => {
    if (state.sessionId) {
      return state.sessionId;
    }

    if (!props.endpoints.aiSession) {
      throw new Error('AI session endpoint not configured');
    }

    try {
      const response = await fetch(props.endpoints.aiSession, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: props.siteId,
          page_url: props.pageUrl,
          source: 'web',
          context: {
            module: props.module,
            locale: props.locale,
          },
        }),
      });

      const result = await response.json();
      const sessionId = result?.data?.session_id || '';

      if (sessionId) {
        setState((prev) => ({ ...prev, sessionId }));
        localStorage.setItem(
          storageKey,
          JSON.stringify({ sessionId, messages: [] })
        );
      }

      return sessionId;
    } catch (err) {
      console.error('Failed to start session:', err);
      throw err;
    }
  }, [props, state.sessionId, storageKey]);

  // Send message to AI
  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      if (!message.trim() || !props.endpoints.aiChat) {
        return;
      }

      const userMessage: ChatMessageData = {
        id: generateId(),
        role: 'user',
        content: message.trim(),
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        isTyping: true,
        error: null,
        messages: [...prev.messages, userMessage],
        suggestedFollowUps: [],
      }));

      try {
        const sessionId = await ensureSession();

        const response = await fetch(props.endpoints.aiChat, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            site_id: props.siteId,
            session_id: sessionId,
            page_url: props.pageUrl,
            message: message.trim(),
            context: {
              module: props.module,
              locale: props.locale,
            },
          }),
        });

        const result = await response.json();
        const answer = result?.data?.answer;

        if (answer) {
          const assistantMessage: ChatMessageData = {
            id: answer.message_id || generateId(),
            role: 'assistant',
            content: answer.content || answer.summary || '',
            timestamp: Date.now(),
            summary: answer.summary,
            detail: answer.detail,
          };

          setState((prev) => ({
            ...prev,
            isTyping: false,
            messages: [...prev.messages, assistantMessage],
            suggestedFollowUps: answer.suggested_follow_ups || [],
          }));

          // Check if handoff is suggested
          if (result?.data?.handoff_suggested) {
            setState((prev) => ({
              ...prev,
              handoffFormVisible: true,
            }));
          }

          // Save session to localStorage
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              sessionId,
              messages: [...state.messages, userMessage, assistantMessage],
            })
          );
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        setState((prev) => ({
          ...prev,
          isTyping: false,
          error: props.fallbackSummary,
          messages: [
            ...prev.messages,
            {
              id: generateId(),
              role: 'assistant',
              content: `${props.fallbackSummary} ${props.fallbackDetail}`,
              timestamp: Date.now(),
            },
          ],
        }));
      }
    },
    [props, ensureSession, state.messages, storageKey]
  );

  // Handle form submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const message = inputValue;
      setInputValue('');
      await sendMessage(message);
    },
    [inputValue, sendMessage]
  );

  // Handle handoff submit
  const handleHandoffSubmit = useCallback(
    async (data: {
      name: string;
      phoneOrWechat: string;
      organization: string;
      message: string;
    }): Promise<void> => {
      if (!props.endpoints.aiHandoff) {
        throw new Error('Handoff endpoint not configured');
      }

      setState((prev) => ({ ...prev, handoffSubmitting: true }));

      try {
        const response = await fetch(props.endpoints.aiHandoff, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            site_id: props.siteId,
            session_id: state.sessionId,
            handoff_type: 'consultation',
            contact: {
              name: data.name,
              phone_or_wechat: data.phoneOrWechat,
              organization: data.organization,
            },
            message: data.message,
          }),
        });

        const result = await response.json();

        if (result?.success) {
          setState((prev) => ({
            ...prev,
            handoffSubmitting: false,
            handoffSuccess: true,
            handoffFormVisible: false,
            messages: [
              ...prev.messages,
              {
                id: generateId(),
                role: 'assistant',
                content: `${props.handoffSuccessMsg} ${props.handoffSuccessDetail}`,
                timestamp: Date.now(),
              },
            ],
          }));
        } else {
          throw new Error(result?.error || 'Handoff failed');
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          handoffSubmitting: false,
          messages: [
            ...prev.messages,
            {
              id: generateId(),
              role: 'assistant',
              content: `${props.handoffFailMsg} ${props.handoffFailDetail}`,
              timestamp: Date.now(),
            },
          ],
        }));
      }
    },
    [props, state.sessionId]
  );

  // Handle follow-up question selection
  const handleFollowUpSelect = useCallback(
    (question: string) => {
      sendMessage(question);
    },
    [sendMessage]
  );

  // Toggle panel
  const togglePanel = useCallback(async () => {
    if (state.isOpen) {
      setState((prev) => ({ ...prev, isOpen: false }));
    } else {
      setState((prev) => ({ ...prev, isOpen: true }));
      if (!state.sessionId) {
        await ensureSession();
      }
    }
  }, [state.isOpen, state.sessionId, ensureSession]);

  return (
    <div
      className="ai-chat-widget"
      data-site-id={props.siteId}
      data-module={props.module}
      data-locale={props.locale}
    >
      {/* Trigger Button */}
      <button
        className="ai-chat-trigger"
        type="button"
        aria-expanded={state.isOpen}
        onClick={togglePanel}
      >
        <span className="ai-chat-trigger-main">{props.triggerMain}</span>
        <span className="ai-chat-trigger-sub">{props.triggerSub}</span>
      </button>

      {/* Chat Panel */}
      <section className="ai-chat-panel" hidden={!state.isOpen}>
        <header className="ai-chat-header">
          <div>
            <strong>{props.title}</strong>
            <small>{props.scope}</small>
          </div>
          <button
            type="button"
            className="ai-chat-close"
            aria-label={props.closeLabel}
            onClick={togglePanel}
          >
            ×
          </button>
        </header>

        <div className="ai-chat-body">
          {/* Intro messages */}
          {!state.messages.length && (
            <div className="ai-chat-intro">
              <p>{props.introA}</p>
              <p>{props.introB}</p>
            </div>
          )}

          {/* Messages */}
          <div className="ai-chat-messages">
            {state.messages.map((msg) => (
              <article
                key={msg.id}
                className={`ai-message ai-message-${msg.role}`}
              >
                <div className="ai-message-content">
                  {msg.role === 'assistant' && msg.summary && (
                    <strong>{msg.summary}</strong>
                  )}
                  <p>{msg.content}</p>
                  {msg.role === 'assistant' && msg.detail && (
                    <p className="ai-message-detail">{msg.detail}</p>
                  )}
                </div>
                <MessageTimestamp
                  timestamp={msg.timestamp}
                  locale={props.locale}
                />
              </article>
            ))}

            {/* Typing indicator */}
            {state.isTyping && <TypingIndicator label={props.typingLabel} />}
          </div>

          {/* Suggested follow-ups */}
          {state.suggestedFollowUps.length > 0 && (
            <SuggestedFollowUps
              questions={state.suggestedFollowUps}
              onSelect={handleFollowUpSelect}
            />
          )}

          {/* Error message */}
          {state.error && (
            <div className="ai-chat-error">
              <p>{state.error}</p>
            </div>
          )}

          {/* Handoff form */}
          {state.handoffFormVisible && (
            <HandoffForm
              onSubmit={handleHandoffSubmit}
              onCancel={() =>
                setState((prev) => ({
                  ...prev,
                  handoffFormVisible: false,
                }))
              }
              isSubmitting={state.handoffSubmitting}
              namePlaceholder={props.namePlaceholder}
              contactPlaceholder={props.contactPlaceholder}
              orgPlaceholder={props.orgPlaceholder}
              messagePlaceholder={props.messagePlaceholder}
              submitLabel={props.submitLabel}
              continueLabel={props.continueLabel}
            />
          )}

          {/* Handoff success message */}
          {state.handoffSuccess && (
            <div className="ai-chat-handoff-success">
              <p>
                <strong>{props.handoffSuccessMsg}</strong>
              </p>
              <p>{props.handoffSuccessDetail}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form className="ai-chat-input" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="message"
            placeholder={props.inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={state.isTyping}
            required
          />
          <button
            type="submit"
            className="button"
            disabled={state.isTyping || !inputValue.trim()}
          >
            {props.sendLabel}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AIChat;
