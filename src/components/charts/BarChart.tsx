'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getComparisonData } from '@/lib/tambo-tools';
import { normalizeMetric, normalizeGroupBy } from '@/lib/normalize-metric';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  metric?: string;
  groupBy?: string;
  title?: string;
}

const defaultColors = ['#00f0ff', '#7000ff', '#ff006e', '#00ff9f', '#ffb800'];

export function BarChart({
  metric: rawMetric,
  groupBy: rawGroupBy,
  title,
}: BarChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const metric = normalizeMetric(rawMetric);
  const groupBy = normalizeGroupBy(rawGroupBy);

  useEffect(() => {
    setLoading(true);
    try {
      const result = getComparisonData({ metrics: [metric], groupBy });
      const transformed = result.map(item => ({
        name: String(item.name),
        value: Number(item[metric] || 0),
      }));
      setData(transformed);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [metric, groupBy]);

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
        <h3 className="text-lg font-semibold mb-6 text-gray-200">{title}</h3>
      )}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
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
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
