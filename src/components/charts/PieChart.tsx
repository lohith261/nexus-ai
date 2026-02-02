'use client';

import { motion } from 'framer-motion';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DataPoint[];
  title?: string;
  colors?: string[];
  height?: number;
}

const defaultColors = ['#00f0ff', '#7000ff', '#ff006e', '#00ff9f', '#ffb800', '#ff4444'];

export function PieChart({
  data,
  title,
  colors = defaultColors,
  height = 300,
}: PieChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/10"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-6 text-gray-200">{title}</h3>
      )}
      <div style={{ height }}>
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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