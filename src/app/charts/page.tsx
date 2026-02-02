'use client';

import { LineChart, BarChart, PieChart, InsightCard } from '@/components/charts';

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Chart Components</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart metric="mrr" title="MRR Over Time" />
        <BarChart metric="mrr" groupBy="quarter" title="Quarterly Revenue" />
        <PieChart metric="mrr" title="Revenue Distribution" />
        <div className="grid grid-cols-2 gap-4">
          <InsightCard metricKey="mrr" />
          <InsightCard metricKey="churnRate" />
          <InsightCard metricKey="newCustomers" />
          <InsightCard metricKey="nps" />
        </div>
      </div>
    </div>
  );
}
