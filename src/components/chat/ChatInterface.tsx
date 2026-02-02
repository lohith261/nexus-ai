'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onChartRequest?: (type: 'line' | 'bar' | 'pie' | 'insight') => void;
}

export function ChatInterface({ onChartRequest }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "I've loaded your data. Ask me anything - show me trends, compare metrics, or get insights about your business.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) {
      console.log('Submit blocked:', { input: input.trim(), isLoading });
      return;
    }

    console.log('Sending message:', input);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // In the setTimeout where AI responds:
setTimeout(() => {
  const aiMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: `I'll analyze that for you. Here are the MRR trends over the past 12 months...`,
  };
  setMessages(prev => [...prev, aiMessage]);
  setIsLoading(false);
  
  // Trigger chart render
  if (onChartRequest && input.toLowerCase().includes('mrr')) {
    onChartRequest('line');
  } else if (onChartRequest && input.toLowerCase().includes('quarter')) {
    onChartRequest('bar');
  }
}, 1500);
  };

  console.log('Current messages:', messages.length);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <h3 className="text-sm font-medium text-gray-300">Chat with AI</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
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
              
              <div className={`max-w-[80%] ${message.role === 'assistant' ? '' : 'text-right'}`}>
                <div className={`inline-block px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                  message.role === 'assistant'
                    ? 'bg-white/[0.05] border border-white/10 text-gray-200'
                    : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-100'
                }`}>
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1 px-1">
                  {message.role === 'assistant' ? 'NEXUS AI' : 'You'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
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
            disabled={isLoading || !input.trim()}
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