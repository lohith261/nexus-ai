'use client';

import { saasMetricsData, SaasMetrics } from '@/data/saas-metrics';

type MetricKey = keyof Omit<SaasMetrics, 'date'>;
type Aggregation = 'sum' | 'avg' | 'min' | 'max' | 'count';
type TimeRange = 'all' | 'last6months' | 'last3months' | 'ytd';

function filterByTimeRange(data: SaasMetrics[], timeRange: TimeRange): SaasMetrics[] {
  if (timeRange === 'all') return data;
  
  const now = new Date('2024-12-01');
  let cutoff: Date;
  
  switch (timeRange) {
    case 'last6months':
      cutoff = new Date(now.getFullYear(), now.getMonth() - 6, 1);
      break;
    case 'last3months':
      cutoff = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      break;
    case 'ytd':
      cutoff = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return data;
  }
  
  return data.filter(d => new Date(d.date) >= cutoff);
}

function aggregate(values: number[], aggregation: Aggregation): number {
  if (values.length === 0) return 0;
  
  switch (aggregation) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'avg':
      return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    case 'count':
      return values.length;
    default:
      return values.reduce((a, b) => a + b, 0);
  }
}

export function queryData(params: {
  metric: MetricKey;
  aggregation?: Aggregation;
  timeRange?: TimeRange;
}): { result: number; metric: string; aggregation: string; dataPoints: number } {
  const { metric, aggregation = 'sum', timeRange = 'all' } = params;
  const filtered = filterByTimeRange(saasMetricsData, timeRange);
  const values = filtered.map(d => d[metric]);
  
  return {
    result: aggregate(values, aggregation),
    metric,
    aggregation,
    dataPoints: filtered.length,
  };
}

export function getTimeSeriesData(params: {
  metric: MetricKey;
  timeRange?: TimeRange;
}): Array<{ date: string; value: number }> {
  const { metric, timeRange = 'all' } = params;
  const filtered = filterByTimeRange(saasMetricsData, timeRange);
  
  return filtered.map(d => ({
    date: d.date,
    value: d[metric],
  }));
}

export function getComparisonData(params: {
  metrics: MetricKey[];
  groupBy?: 'quarter' | 'month';
}): Array<{ name: string; [key: string]: string | number }> {
  const { metrics, groupBy = 'quarter' } = params;
  
  if (groupBy === 'quarter') {
    const quarters: { [key: string]: { [key: string]: number[] } } = {};
    
    saasMetricsData.forEach(d => {
      const date = new Date(d.date);
      const q = `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`;
      
      if (!quarters[q]) quarters[q] = {};
      
      metrics.forEach(m => {
        if (!quarters[q][m]) quarters[q][m] = [];
        quarters[q][m].push(d[m]);
      });
    });
    
    return Object.entries(quarters).map(([name, data]) => {
      const result: { name: string; [key: string]: string | number } = { name };
      metrics.forEach(m => {
        result[m] = Math.round(data[m].reduce((a, b) => a + b, 0) / data[m].length);
      });
      return result;
    });
  }
  
  return saasMetricsData.map(d => {
    const result: { name: string; [key: string]: string | number } = { name: d.date };
    metrics.forEach(m => {
      result[m] = d[m];
    });
    return result;
  });
}

export function getDistributionData(params: {
  metric: MetricKey;
  segments?: number;
}): Array<{ name: string; value: number }> {
  const { metric, segments = 4 } = params;
  const values = saasMetricsData.map(d => d[metric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = (max - min) / segments;
  
  const buckets: { [key: string]: number } = {};
  
  values.forEach(v => {
    const bucketIndex = Math.min(Math.floor((v - min) / range), segments - 1);
    const bucketName = `${Math.round(min + bucketIndex * range)}-${Math.round(min + (bucketIndex + 1) * range)}`;
    buckets[bucketName] = (buckets[bucketName] || 0) + 1;
  });
  
  return Object.entries(buckets).map(([name, value]) => ({ name, value }));
}

export function getLatestMetrics(): {
  mrr: number;
  mrrChange: number;
  newCustomers: number;
  churnRate: number;
  nps: number;
} {
  const latest = saasMetricsData[saasMetricsData.length - 1];
  const previous = saasMetricsData[saasMetricsData.length - 2];
  
  const totalCustomers = saasMetricsData.reduce((sum, d) => sum + d.newCustomers - d.churnedCustomers, 1000);
  
  return {
    mrr: latest.mrr,
    mrrChange: Math.round(((latest.mrr - previous.mrr) / previous.mrr) * 100 * 10) / 10,
    newCustomers: latest.newCustomers,
    churnRate: Math.round((latest.churnedCustomers / totalCustomers) * 100 * 10) / 10,
    nps: latest.nps,
  };
}
