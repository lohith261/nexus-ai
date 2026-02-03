'use client';

import { useState, useRef, useEffect } from 'react';
import { useTamboThreadInput, useTamboThread } from '@tambo-ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm NEXUS AI. I can help you analyze data, create visualizations, and answer questions about your metrics. What would you like to explore?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use Tambo hooks
  const { submit, isPending, value: input, setValue: setInput } = useTamboThreadInput();
  const { thread } = useTamboThread();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thread]);

  // Sync Tambo messages with local state
  useEffect(() => {
    if (thread?.messages && thread.messages.length > 0) {
      const newMessages = thread.messages.map((msg: any, idx: number) => ({
        id: idx.toString(),
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));
      
      // Only update if different
      if (newMessages.length !== messages.length - 1) {
        setMessages(prev => [
          prev[0], // Keep welcome message
          ...newMessages.slice(1) // Add Tambo messages (skip first system message)
        ]);
      }
    }
  }, [thread?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    try {
      await submit();
    } catch (error) {
      console.error('Tambo error:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-8">
      <div className="max-w-4xl mx-auto px-6 h-[calc(100vh-8rem)]">
        <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="font-semibold">NEXUS AI Assistant</h2>
                <p className="text-sm text-gray-500">Powered by Tambo AI</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
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
                  
                  <div className={`max-w-[80%] ${message.role === 'assistant' ? '' : 'text-right'}`}>
                    <div className={`inline-block px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                      message.role === 'assistant'
                        ? 'bg-white/[0.05] border border-white/10 text-gray-200'
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
                  <span>AI is thinking...</span>
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
                placeholder="Ask about your data (e.g., 'Show me MRR trends')..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm placeholder:text-gray-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isPending || !input.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}