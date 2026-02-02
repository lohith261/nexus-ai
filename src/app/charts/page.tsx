'use client';

import { LineChart, BarChart, PieChart, InsightCard } from '@/components/charts';
import { saasMetricsData } from '@/data/saas-metrics';

// Transform data for charts
const lineData = saasMetricsData.map(d => ({
  date: d.date.slice(0, 7), // YYYY-MM
  value: d.mrr,
}));

const barData = [
  { name: 'Q1', value: 150000 },
  { name: 'Q2', value: 180000 },
  { name: 'Q3', value: 165000 },
  { name: 'Q4', value: 210000 },
];

const pieData = [
  { name: 'Enterprise', value: 45 },
  { name: 'Pro', value: 30 },
  { name: 'Starter', value: 25 },
];

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <h1 className="text-3xl font-bold mb-8">Chart Components</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={lineData}
          title="MRR Over Time"
          color="#00f0ff"
        />
        
        <BarChart
          data={barData}
          title="Quarterly Revenue"
        />
        
        <PieChart
          data={pieData}
          title="Customer Segments"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <InsightCard
            title="Total MRR"
            value="$124.5k"
            change={12.5}
            trend="up"
          />
          <InsightCard
            title="Churn Rate"
            value="2.4%"
            change={-0.8}
            trend="down"
          />
          <InsightCard
            title="NPS Score"
            value="52"
            change={0}
            trend="neutral"
          />
          <InsightCard
            title="Active Users"
            value="1,234"
            change={8.2}
            trend="up"
          />
        </div>
      </div>
    </div>
  );
}