'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getDistributionData } from '@/lib/tambo-tools';
import { normalizeMetric } from '@/lib/normalize-metric';

interface DataPoint {
  name: string;
  value: number;
}

interface PieChartProps {
  metric?: string;
  segments?: number;
  title?: string;
}

const defaultColors = ['#00f0ff', '#7000ff', '#ff006e', '#00ff9f', '#ffb800', '#ff4444'];

export function PieChart({
  metric: rawMetric,
  segments = 4,
  title,
}: PieChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const metric = normalizeMetric(rawMetric);

  useEffect(() => {
    setLoading(true);
    try {
      const result = getDistributionData({ metric, segments });
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [metric, segments]);

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
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 10, 15, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-gray-400 text-sm">{value}</span>}
            />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
