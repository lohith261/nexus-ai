'use client';

import { useState, useRef, useEffect } from 'react';
import { useTamboThreadInput, useTamboThread } from '@tambo-ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "I've loaded your data. Ask me anything - show me trends, compare metrics, or get insights about your business.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { submit, isPending, value: input, setValue: setInput } = useTamboThreadInput();
  const { thread } = useTamboThread();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thread]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      await submit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${message.role === 'assistant' ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' 
                  ? 'bg-violet-500/20' 
                  : 'bg-cyan-500/20'
              }`}>
                {message.role === 'assistant' ? (
                  <Sparkles className="w-4 h-4 text-violet-400" />
                ) : (
                  <User className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              
              <div className={`max-w-[80%] ${message.role === 'assistant' ? '' : 'text-right'}`}>
                <div className={`inline-block p-4 rounded-xl text-sm ${
                  message.role === 'assistant'
                    ? 'bg-white/[0.03] border border-white/10 text-gray-200'
                    : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-100'
                }`}>
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
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
              Analyzing data...
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your data (e.g., 'Show me MRR trends')"
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}