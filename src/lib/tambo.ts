'use client';

import { TamboComponent } from '@tambo-ai/react';
import { z } from 'zod';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { InsightCard } from '@/components/charts/InsightCard';

// Simple schemas - no transforms, just accept strings
// Normalization happens in the components
const lineChartSchema = z.object({
  metric: z.string().optional().describe('Metric name: mrr, newCustomers, churnedCustomers, cac, nps, supportTickets, or featureAdoption'),
  timeRange: z.string().optional().describe('Time range: all, last6months, last3months, or ytd'),
  title: z.string().optional().describe('Chart title'),
  color: z.string().optional().describe('Line color hex code'),
});

const barChartSchema = z.object({
  metric: z.string().optional().describe('Metric name: mrr, newCustomers, churnedCustomers, cac, nps, supportTickets, or featureAdoption'),
  groupBy: z.string().optional().describe('Group by: quarter or month'),
  title: z.string().optional().describe('Chart title'),
});

const pieChartSchema = z.object({
  metric: z.string().optional().describe('Metric name: mrr, newCustomers, churnedCustomers, cac, nps, supportTickets, or featureAdoption'),
  segments: z.number().optional().describe('Number of segments (default 4)'),
  title: z.string().optional().describe('Chart title'),
});

const insightCardSchema = z.object({
  metricKey: z.string().optional().describe('Metric key: mrr, newCustomers, churnRate, or nps'),
  title: z.string().optional().describe('Card title'),
  value: z.union([z.string(), z.number()]).optional().describe('Display value'),
  change: z.number().optional().describe('Percentage change from last period'),
  trend: z.string().optional().describe('Trend direction: up, down, or neutral'),
  description: z.string().optional().describe('Additional description'),
});

// Register components
export const tamboComponents: TamboComponent[] = [
  {
    name: 'LineChart',
    description: 'A line chart for showing trends over time. The component fetches data automatically. Use metric="mrr" for revenue, "newCustomers" for customer growth, "nps" for satisfaction, etc. Example: {metric: "mrr", title: "Revenue Trends"}',
    component: LineChart,
    propsSchema: lineChartSchema,
  },
  {
    name: 'BarChart',
    description: 'A bar chart for comparing data by quarter or month. Use metric="mrr" and groupBy="quarter" for quarterly revenue. Example: {metric: "mrr", groupBy: "quarter", title: "Quarterly Revenue"}',
    component: BarChart,
    propsSchema: barChartSchema,
  },
  {
    name: 'PieChart',
    description: 'A donut chart showing data distribution. Example: {metric: "mrr", title: "Revenue Distribution"}',
    component: PieChart,
    propsSchema: pieChartSchema,
  },
  {
    name: 'InsightCard',
    description: 'A metric card with value and trend. Use metricKey to auto-fetch (mrr, newCustomers, churnRate, nps) OR provide value directly. Example: {metricKey: "mrr"} or {title: "Sales", value: "$50k", trend: "up"}',
    component: InsightCard,
    propsSchema: insightCardSchema,
  },
];

// No tools - components fetch their own data
export const tamboTools: never[] = [];

export const components = tamboComponents;
export const tools = tamboTools;
