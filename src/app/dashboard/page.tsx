'use client';

import { motion } from 'framer-motion';
import { TamboChat } from '@/components/chat/TamboChat';
import { Database, Sparkles } from 'lucide-react';
import { datasetInfo } from '@/data/saas-metrics';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">NEXUS</h1>
              <p className="text-xs text-gray-500">AI Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">{datasetInfo.name}</span>
              <span className="text-xs text-gray-500">({datasetInfo.rows} rows)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">AI Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 h-screen">
        <div className="h-full max-w-[1600px] mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-5rem)]">
            
            {/* Chat - Full width on mobile, 5 columns on large screens */}
            <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[500px]">
              <TamboChat />
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-7 xl:col-span-8 h-full flex flex-col">
              <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/10 border-dashed p-8 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-lg"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <Sparkles className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-3">Ask NEXUS Anything</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    The AI will analyze your data and generate interactive visualizations. 
                    Charts and insights will appear directly in the chat.
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <p className="text-sm text-gray-400 font-medium">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Show me MRR trends over time',
                        'What are the key metrics?',
                        'Compare quarterly revenue',
                        'Show customer churn analysis',
                        'What was our best month?',
                      ].map((suggestion) => (
                        <span
                          key={suggestion}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400"
                        >
                          &ldquo;{suggestion}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                      Powered by Tambo AI • Components render in real-time
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
