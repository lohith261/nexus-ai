'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { 
  useTamboThreadInput, 
  useTamboThread,
  TamboThreadInputProvider,
  TamboThreadProvider,
} from '@tambo-ai/react';

// Helper to extract text content from Tambo message content
function getTextContent(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map(part => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return (part as { text: string }).text;
        }
        return '';
      })
      .join('');
  }
  return '';
}

function ChatContent() {
  const { submit, isPending, value: input, setValue: setInput } = useTamboThreadInput();
  const { thread } = useTamboThread();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;
    
    try {
      await submit();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const messages = thread?.messages || [];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Chat with NEXUS AI</h3>
        {isPending && (
          <div className="flex items-center gap-2 text-xs text-violet-400">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message if no messages */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-violet-400" />
            </div>
            <div className="max-w-[80%]">
              <div className="inline-block px-4 py-2.5 rounded-xl text-sm leading-relaxed bg-white/[0.05] border border-white/10 text-gray-200">
                I&apos;ve loaded your SaaS metrics data. Ask me anything - show trends, compare metrics, or get insights about your business.
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Show MRR trends', 'Compare quarterly revenue', 'Key metrics summary'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-300 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 px-1">NEXUS AI</div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${message.role === 'assistant' ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' 
                  ? 'bg-violet-500/20' 
                  : 'bg-cyan-500/20'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-violet-400" />
                ) : (
                  <User className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              
              <div className={`max-w-[85%] ${message.role === 'assistant' ? '' : 'text-right'}`}>
                {/* Text content */}
                {getTextContent(message.content) && (
                  <div className={`inline-block px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'bg-white/[0.05] border border-white/10 text-gray-200'
                      : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-100'
                  }`}>
                    {getTextContent(message.content)}
                  </div>
                )}
                
                {/* Rendered component from AI */}
                {message.renderedComponent && (
                  <div className="mt-2 rounded-xl overflow-hidden">
                    {message.renderedComponent}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-1 px-1">
                  {message.role === 'assistant' ? 'NEXUS AI' : 'You'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm bg-white/[0.03] px-4 py-2.5 rounded-xl border border-white/10">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span>Analyzing data...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your data..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm placeholder:text-gray-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export function TamboChat() {
  return (
    <TamboThreadProvider>
      <TamboThreadInputProvider>
        <ChatContent />
      </TamboThreadInputProvider>
    </TamboThreadProvider>
  );
}
