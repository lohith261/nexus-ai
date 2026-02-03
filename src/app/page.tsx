'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { datasetInfo } from '@/data/saas-metrics';
import { Upload, Database, Sparkles, Brain, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GlowingCard } from '@/components/animations/GlowingCard';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { FloatingParticles } from '@/components/animations/FloatingParticles';

export default function Home() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background gradient
      gsap.to('.gradient-bg', {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Animated gradient background */}
      <div 
        className="gradient-bg absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(112, 0, 255, 0.1) 0%, transparent 40%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticles>
        </FloatingParticles>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-black" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight">NEXUS</span>
          </div>
        </div>
      </motion.header>

      <main className="pt-24 relative z-10">
        {!dataLoaded ? (
          <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 py-12">
            {/* Hero */}
            <div className="text-center mb-20 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Powered by Tambo AI</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                <TextReveal text="Analyze Data with " delay={0.2} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 animate-gradient">
                  Natural Language
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Upload your data or use our sample dataset. Ask questions, get insights, 
                and visualize trends — all through conversation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-8 text-sm text-gray-500"
              >
                {[
                  { icon: Brain, text: 'AI-Powered Insights' },
                  { icon: MessageSquare, text: 'Natural Language' },
                  { icon: TrendingUp, text: 'Real-time Visualization' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-16" stagger={0.15}>
              {/* Upload Card */}
              <GlowingCard className="stagger-item p-8 rounded-2xl border border-white/10 cursor-pointer group" glowColor="rgba(0, 240, 255, 0.3)">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Upload Your Data</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Import CSV, Excel, or JSON files. We'll automatically detect schemas and prepare your data for analysis.
                  </p>
                  <MagneticButton 
                    className="flex items-center gap-2 text-cyan-400 font-medium group/btn"
                    strength={0.2}
                  >
                    Select File
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </GlowingCard>

              {/* Sample Dataset Card */}
              <GlowingCard 
                className="stagger-item p-8 rounded-2xl border border-white/10 cursor-pointer group" 
                glowColor="rgba(112, 0, 255, 0.3)"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Database className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{datasetInfo.name}</h3>
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
                  <MagneticButton 
                    className="flex items-center gap-2 text-violet-400 font-medium group/btn"
                    strength={0.2}
                    onClick={() => setDataLoaded(true)}
                  >
                    Start Analysis
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </GlowingCard>
            </StaggerContainer>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl">Loading dashboard...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}