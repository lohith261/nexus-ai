'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getLatestMetrics } from '@/lib/tambo-tools';
import { normalizeInsightMetric, normalizeTrend, type Trend } from '@/lib/normalize-metric';

interface InsightCardProps {
  metricKey?: string;
  title?: string;
  value?: string | number;
  change?: number;
  description?: string;
  trend?: string;
}

export function InsightCard({
  metricKey: rawMetricKey,
  title: providedTitle,
  value: providedValue,
  change: providedChange,
  description,
  trend: rawTrend,
}: InsightCardProps) {
  const [value, setValue] = useState<string | number>(providedValue || 0);
  const [change, setChange] = useState<number | undefined>(providedChange);
  const [trend, setTrend] = useState<Trend>(normalizeTrend(rawTrend));
  const [displayTitle, setDisplayTitle] = useState(providedTitle || 'Metric');
  const [loading, setLoading] = useState(!providedValue && !!rawMetricKey);

  const metricKey = normalizeInsightMetric(rawMetricKey);

  useEffect(() => {
    if (!providedValue && rawMetricKey) {
      setLoading(true);
      try {
        const metrics = getLatestMetrics();
        
        switch (metricKey) {
          case 'mrr':
            setValue(`$${(metrics.mrr / 1000).toFixed(0)}k`);
            setChange(metrics.mrrChange);
            setTrend(metrics.mrrChange >= 0 ? 'up' : 'down');
            setDisplayTitle(providedTitle || 'Monthly Recurring Revenue');
            break;
          case 'newCustomers':
            setValue(metrics.newCustomers);
            setTrend('up');
            setDisplayTitle(providedTitle || 'New Customers');
            break;
          case 'churnRate':
            setValue(`${metrics.churnRate}%`);
            setTrend(metrics.churnRate <= 3 ? 'up' : 'down');
            setDisplayTitle(providedTitle || 'Churn Rate');
            break;
          case 'nps':
            setValue(metrics.nps);
            setTrend(metrics.nps >= 50 ? 'up' : 'neutral');
            setDisplayTitle(providedTitle || 'Net Promoter Score');
            break;
          default:
            setValue(providedValue || 0);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    } else if (providedValue) {
      setValue(providedValue);
      setTrend(normalizeTrend(rawTrend));
      setDisplayTitle(providedTitle || 'Metric');
    }
  }, [metricKey, rawMetricKey, providedValue, providedTitle, rawTrend]);

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

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse">
        <div className="h-4 w-24 bg-white/10 rounded mb-4" />
        <div className="h-8 w-16 bg-white/10 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-gray-400">{displayTitle}</span>
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
