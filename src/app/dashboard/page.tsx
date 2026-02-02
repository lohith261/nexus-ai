'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Sparkles, Plus } from 'lucide-react';
import { datasetInfo } from '@/data/saas-metrics';

export default function DashboardPage() {
  const [pinnedCharts, setPinnedCharts] = useState<React.ReactNode[]>([]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Fixed Header */}
      <header className="h-16 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-lg">NEXUS</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">{datasetInfo.name}</span>
              <span className="text-xs text-gray-500">({datasetInfo.rows} rows)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">AI Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Chat Section - Placeholder for now */}
            <div className="lg:col-span-1 h-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex flex-col">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Chat with AI</h3>
              <div className="flex-1 overflow-y-auto space-y-4">
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <p className="text-sm text-gray-300">I've loaded your data. Ask me anything!</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about your data..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                />
                <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm">
                  Send
                </button>
              </div>
            </div>

            {/* Dashboard Canvas */}
            <div className="lg:col-span-2 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Widget
                </button>
              </div>
              
              {pinnedCharts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 flex flex-col items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 border-dashed"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-center max-w-sm">
                    Ask the AI to visualize data, then pin charts here to build your dashboard
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pinnedCharts.map((chart, i) => (
                    <motion.div key={i} layout>
                      {chart}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}