// Normalize metric names from various AI inputs to valid metric keys
export type MetricKey = 'mrr' | 'newCustomers' | 'churnedCustomers' | 'cac' | 'nps' | 'supportTickets' | 'featureAdoption';
export type InsightMetricKey = 'mrr' | 'newCustomers' | 'churnRate' | 'nps';
export type TimeRange = 'all' | 'last6months' | 'last3months' | 'ytd';
export type GroupBy = 'quarter' | 'month';
export type Trend = 'up' | 'down' | 'neutral';

const metricMapping: Record<string, MetricKey> = {
  'mrr': 'mrr',
  'revenue': 'mrr',
  'monthly recurring revenue': 'mrr',
  'monthly_recurring_revenue': 'mrr',
  'newcustomers': 'newCustomers',
  'new_customers': 'newCustomers',
  'new customers': 'newCustomers',
  'customers': 'newCustomers',
  'churnedcustomers': 'churnedCustomers',
  'churned_customers': 'churnedCustomers',
  'churned customers': 'churnedCustomers',
  'churn': 'churnedCustomers',
  'cac': 'cac',
  'customer acquisition cost': 'cac',
  'customer_acquisition_cost': 'cac',
  'nps': 'nps',
  'net promoter score': 'nps',
  'net_promoter_score': 'nps',
  'supporttickets': 'supportTickets',
  'support_tickets': 'supportTickets',
  'support tickets': 'supportTickets',
  'tickets': 'supportTickets',
  'featureadoption': 'featureAdoption',
  'feature_adoption': 'featureAdoption',
  'feature adoption': 'featureAdoption',
  'adoption': 'featureAdoption',
};

export function normalizeMetric(input?: string): MetricKey {
  if (!input) return 'mrr';
  const normalized = input.toLowerCase().trim();
  return metricMapping[normalized] || 'mrr';
}

export function normalizeInsightMetric(input?: string): InsightMetricKey {
  if (!input) return 'mrr';
  const normalized = input.toLowerCase().trim();
  if (normalized.includes('churn')) return 'churnRate';
  if (normalized.includes('customer') || normalized.includes('new')) return 'newCustomers';
  if (normalized.includes('nps') || normalized.includes('promoter')) return 'nps';
  return 'mrr';
}

export function normalizeTimeRange(input?: string): TimeRange {
  if (!input) return 'all';
  const normalized = input.toLowerCase().trim();
  if (normalized.includes('6') || normalized.includes('six')) return 'last6months';
  if (normalized.includes('3') || normalized.includes('three')) return 'last3months';
  if (normalized.includes('ytd') || normalized.includes('year')) return 'ytd';
  return 'all';
}

export function normalizeGroupBy(input?: string): GroupBy {
  if (!input) return 'quarter';
  const normalized = input.toLowerCase().trim();
  return normalized.includes('month') ? 'month' : 'quarter';
}

export function normalizeTrend(input?: string): Trend {
  if (!input) return 'neutral';
  const normalized = input.toLowerCase().trim();
  if (normalized.includes('up') || normalized.includes('positive') || normalized.includes('increase')) return 'up';
  if (normalized.includes('down') || normalized.includes('negative') || normalized.includes('decrease')) return 'down';
  return 'neutral';
}
