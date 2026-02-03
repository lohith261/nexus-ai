'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Sparkles, X, MessageSquare } from 'lucide-react';
import { datasetInfo } from '@/data/saas-metrics';
import { LineChart, BarChart, PieChart, InsightCard } from '@/components/charts';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function DashboardPage() {
  const [showChat, setShowChat] = useState(true);
  const [pinnedCharts, setPinnedCharts] = useState<Array<{
    id: string;
    type: 'line' | 'bar' | 'pie' | 'insight';
    component: React.ReactNode;
  }>>([]);

  const handleChartGenerated = (type: 'line' | 'bar' | 'pie' | 'insight') => {
    const id = Date.now().toString();
    let component: React.ReactNode;
    
    switch (type) {
      case 'line':
        // LineChart expects a metric/timeRange prop (it fetches data internally)
        component = <LineChart metric="mrr" timeRange="all" title="MRR Trends" color="#00f0ff" />;
        break;
      case 'bar':
        // BarChart expects a metric and groupBy
        component = <BarChart metric="mrr" groupBy="quarter" title="Quarterly Revenue" />;
        break;
      case 'pie':
        // PieChart uses a metric to compute distribution (e.g. featureAdoption or newCustomers)
        component = <PieChart metric="featureAdoption" title="Customer Segments" />;
        break;
      case 'insight':
        component = (
          <div className="grid grid-cols-2 gap-4">
            <InsightCard title="Total MRR" value="$98k" change={12.5} trend="up" />
            <InsightCard title="Churn Rate" value="2.4%" change={-0.8} trend="down" />
          </div>
        );
        break;
      default:
        component = <LineChart metric="mrr" timeRange="all" title="Analysis" color="#00f0ff" />;
    }

    setPinnedCharts(prev => [...prev, { id, type, component }]);
  };

  const removeChart = (id: string) => {
    setPinnedCharts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <main className="pt-20 pb-6 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
            
            {/* Chat Sidebar */}
            <div className={`${showChat ? 'lg:col-span-4' : 'hidden'} h-full`}>
              <div className="h-full rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <h3 className="font-medium">AI Assistant</h3>
                  </div>
                  <button 
                    onClick={() => setShowChat(false)}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ChatInterface onChartRequest={handleChartGenerated} />
                </div>
              </div>
            </div>

            {/* Dashboard Canvas */}
            <div className={`${showChat ? 'lg:col-span-8' : 'lg:col-span-12'} h-full flex flex-col`}>
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    Dashboard
                    {!showChat && (
                      <button 
                        onClick={() => setShowChat(true)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    )}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {pinnedCharts.length === 0 
                      ? 'Ask the AI to generate charts' 
                      : `${pinnedCharts.length} chart${pinnedCharts.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-gray-300">{datasetInfo.name}</span>
                    <span className="text-xs text-gray-500">({datasetInfo.rows} rows)</span>
                  </div>
                  {pinnedCharts.length > 0 && (
                    <button 
                      onClick={() => setPinnedCharts([])}
                      className="text-sm text-gray-500 hover:text-gray-300"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Charts Grid */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {pinnedCharts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 border-dashed p-8"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mb-6 border border-white/5">
                        <Sparkles className="w-10 h-10 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">No Charts Yet</h3>
                      <p className="text-gray-500 text-center max-w-md mb-6">
                        Ask the AI to visualize your data. Try "Show me MRR trends" or "Compare quarterly revenue"
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-2">
                        {['MRR trends', 'Quarterly revenue', 'Customer segments', 'Key metrics'].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              if (suggestion === 'MRR trends') handleChartGenerated('line');
                              if (suggestion === 'Quarterly revenue') handleChartGenerated('bar');
                              if (suggestion === 'Customer segments') handleChartGenerated('pie');
                              if (suggestion === 'Key metrics') handleChartGenerated('insight');
                            }}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:bg-white/10 hover:text-gray-300 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
                      {pinnedCharts.map((chart) => (
                        <motion.div
                          key={chart.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative group"
                        >
                          <button
                            onClick={() => removeChart(chart.id)}
                            className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/50 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            {chart.component}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}