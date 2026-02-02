'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function InsightCard({
  title,
  value,
  change,
  description,
  trend = 'neutral',
}: InsightCardProps) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColors = {
    up: 'text-emerald-400 bg-emerald-400/10',
    down: 'text-red-400 bg-red-400/10',
    neutral: 'text-gray-400 bg-gray-400/10',
  };

  const TrendIcon = trendIcons[trend];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg ${trendColors[trend]}`}>
          <TrendIcon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="text-3xl font-bold mb-2">{value}</div>
      
      {change !== undefined && (
        <div className={`text-sm mb-2 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(1)}% from last period
        </div>
      )}
      
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </motion.div>
  );
}