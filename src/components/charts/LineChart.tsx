'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';
import { getTimeSeriesData } from '@/lib/tambo-tools';
import { normalizeMetric, normalizeTimeRange } from '@/lib/normalize-metric';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  metric?: string;
  timeRange?: string;
  title?: string;
  color?: string;
}

export function LineChart({
  metric: rawMetric,
  timeRange: rawTimeRange,
  title,
  color = '#00f0ff',
}: LineChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const metric = normalizeMetric(rawMetric);
  const timeRange = normalizeTimeRange(rawTimeRange);

  useEffect(() => {
    setLoading(true);
    try {
      const result = getTimeSeriesData({ metric, timeRange });
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [metric, timeRange]);

  if (loading) {
    return (
      <div className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse">
        {title && <div className="h-6 w-32 bg-white/10 rounded mb-4" />}
        <div className="h-[300px] bg-white/5 rounded" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center text-gray-500">
        {title && <h3 className="text-lg font-semibold mb-4 text-gray-200">{title}</h3>}
        <p>No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/10"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-200">{title}</h3>
      )}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) =>
                value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : value
              }
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 10, 15, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#lineGradient)"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
