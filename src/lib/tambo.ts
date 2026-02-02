'use client';

import { TamboComponent, TamboTool } from '@tambo-ai/react';
import { z } from 'zod';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { InsightCard } from '@/components/charts/InsightCard';
import {
  queryData,
  getTimeSeriesData,
  getComparisonData,
  getDistributionData,
  getLatestMetrics,
} from './tambo-tools';

// Component Schemas
const lineChartSchema = z.object({
  data: z.array(z.object({
    date: z.string(),
    value: z.number(),
  })),
  title: z.string().optional(),
  xAxisKey: z.string().default('date'),
  yAxisKey: z.string().default('value'),
  color: z.string().default('#00f0ff'),
});

const barChartSchema = z.object({
  data: z.array(z.object({
    name: z.string(),
    value: z.number(),
  })),
  title: z.string().optional(),
});

const pieChartSchema = z.object({
  data: z.array(z.object({
    name: z.string(),
    value: z.number(),
  })),
  title: z.string().optional(),
});

const insightCardSchema = z.object({
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.number().optional(),
  trend: z.enum(['up', 'down', 'neutral']).default('neutral'),
});

// Register components
export const tamboComponents: TamboComponent[] = [
  {
    name: 'LineChart',
    description: 'A line chart for showing trends over time. Use for MRR, revenue, user growth, or any time-series data. Pass data as array of {date, value} objects.',
    component: LineChart,
    propsSchema: lineChartSchema,
  },
  {
    name: 'BarChart',
    description: 'A bar chart for comparing categories. Use for quarterly comparisons, product performance, or category breakdowns. Pass data as array of {name, value} objects.',
    component: BarChart,
    propsSchema: barChartSchema,
  },
  {
    name: 'PieChart',
    description: 'A donut chart showing proportional distribution. Use for market share, customer segments, or percentage breakdowns. Pass data as array of {name, value} objects.',
    component: PieChart,
    propsSchema: pieChartSchema,
  },
  {
    name: 'InsightCard',
    description: 'A metric card showing a key value with trend indicator. Use for KPIs, summary statistics, or important single metrics. Shows title, value, optional change percentage, and trend direction.',
    component: InsightCard,
    propsSchema: insightCardSchema,
  },
];

// Tool input schemas
const queryDataInputSchema = z.object({
  metric: z.enum(['mrr', 'newCustomers', 'churnedCustomers', 'cac', 'nps', 'supportTickets', 'featureAdoption'])
    .describe('The metric to query'),
  aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']).optional()
    .describe('How to aggregate the data'),
  timeRange: z.enum(['all', 'last6months', 'last3months', 'ytd']).optional()
    .describe('Time range filter'),
});

const timeSeriesInputSchema = z.object({
  metric: z.enum(['mrr', 'newCustomers', 'churnedCustomers', 'cac', 'nps', 'supportTickets', 'featureAdoption'])
    .describe('The metric to get time series for'),
  timeRange: z.enum(['all', 'last6months', 'last3months', 'ytd']).optional()
    .describe('Time range filter'),
});

const comparisonInputSchema = z.object({
  metrics: z.array(z.string()).describe('List of metrics to compare'),
  groupBy: z.enum(['quarter', 'month']).optional().describe('How to group the data'),
});

const distributionInputSchema = z.object({
  metric: z.enum(['mrr', 'newCustomers', 'churnedCustomers', 'cac', 'nps', 'supportTickets', 'featureAdoption'])
    .describe('The metric to get distribution for'),
  segments: z.number().optional().describe('Number of segments/buckets'),
});

const latestMetricsInputSchema = z.object({});

// Output schemas
const queryDataOutputSchema = z.object({
  result: z.number(),
  metric: z.string(),
  aggregation: z.string(),
  dataPoints: z.number(),
});

const timeSeriesOutputSchema = z.array(z.object({
  date: z.string(),
  value: z.number(),
}));

const comparisonOutputSchema = z.array(z.record(z.string(), z.union([z.string(), z.number()])));

const distributionOutputSchema = z.array(z.object({
  name: z.string(),
  value: z.number(),
}));

const latestMetricsOutputSchema = z.object({
  mrr: z.number(),
  mrrChange: z.number(),
  newCustomers: z.number(),
  churnRate: z.number(),
  nps: z.number(),
});

// Register tools for data access
export const tamboTools: TamboTool[] = [
  {
    name: 'queryData',
    description: 'Query a specific metric from the SaaS dataset with aggregation. Available metrics: mrr, newCustomers, churnedCustomers, cac, nps, supportTickets, featureAdoption.',
    tool: queryData,
    inputSchema: queryDataInputSchema,
    outputSchema: queryDataOutputSchema,
  },
  {
    name: 'getTimeSeriesData',
    description: 'Get time series data for a metric, suitable for line charts. Returns array of {date, value} objects.',
    tool: getTimeSeriesData,
    inputSchema: timeSeriesInputSchema,
    outputSchema: timeSeriesOutputSchema,
  },
  {
    name: 'getComparisonData',
    description: 'Get data grouped by quarter or month for bar chart comparisons. Returns array of {name, ...metrics} objects.',
    tool: getComparisonData,
    inputSchema: comparisonInputSchema,
    outputSchema: comparisonOutputSchema,
  },
  {
    name: 'getDistributionData',
    description: 'Get distribution/bucketed data for pie charts. Returns array of {name, value} objects representing data distribution.',
    tool: getDistributionData,
    inputSchema: distributionInputSchema,
    outputSchema: distributionOutputSchema,
  },
  {
    name: 'getLatestMetrics',
    description: 'Get the latest key metrics snapshot including MRR, MRR change percentage, new customers, churn rate, and NPS. Great for insight cards and KPI summaries.',
    tool: getLatestMetrics,
    inputSchema: latestMetricsInputSchema,
    outputSchema: latestMetricsOutputSchema,
  },
];

// Aliases for backwards compatibility
export const components = tamboComponents;
export const tools = tamboTools;
