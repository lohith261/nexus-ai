'use client';

import { useState } from 'react';
import { BootSequence } from '@/components/ui/BootSequence';
import { motion } from 'framer-motion';
import { datasetInfo } from '@/data/saas-metrics';
import { Upload, Database, Sparkles, Brain, MessageSquare, TrendingUp } from 'lucide-react';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-lg">NEXUS</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Online</span>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {!dataLoaded ? (
          <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
            {/* Hero */}
            <div className="text-center mb-16 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Powered by Tambo AI</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
              >
                Analyze Data with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                  Natural Language
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
              >
                Upload your data or use our sample dataset. Ask questions, get insights, 
                and visualize trends through conversation.
              </motion.p>
            </div>

            {/* Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-16"
            >
              {/* Upload */}
              <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                    <Upload className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Data</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Import CSV, Excel, or JSON files. We'll automatically detect schemas and prepare your data for analysis.
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <span>Select File</span>
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sample */}
              <div 
                onClick={() => setDataLoaded(true)}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/40 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                    <Database className="w-7 h-7 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{datasetInfo.name}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {datasetInfo.description}
                  </p>
                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 rounded-lg bg-white/5 text-sm text-gray-400 border border-white/5">
                      {datasetInfo.rows} rows
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 text-sm text-gray-400 border border-white/5">
                      {datasetInfo.columns.length} columns
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-violet-400 font-medium">
                    <span>Start Analysis</span>
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {[
                { icon: Brain, text: 'AI-Powered Insights', color: 'text-violet-400' },
                { icon: MessageSquare, text: 'Natural Language', color: 'text-cyan-400' },
                { icon: TrendingUp, text: 'Real-time Visualization', color: 'text-emerald-400' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Data Loaded Successfully</h2>
              <p className="text-gray-400">{datasetInfo.name} is ready for analysis</p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}