'use client';

import { TamboComponent } from '@tambo-ai/react';
import { z } from 'zod';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { InsightCard } from '@/components/charts/InsightCard';

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

// Register components only (no tools for now)
export const tamboComponents: TamboComponent[] = [
  {
    name: 'LineChart',
    description: 'A line chart for showing trends over time. Use for revenue, user growth, or any time-series data.',
    component: LineChart,
    propsSchema: lineChartSchema,
  },
  {
    name: 'BarChart',
    description: 'A bar chart for comparing categories. Use for quarterly comparisons, product performance, or category breakdowns.',
    component: BarChart,
    propsSchema: barChartSchema,
  },
  {
    name: 'PieChart',
    description: 'A donut chart showing proportional distribution. Use for market share, customer segments, or percentage breakdowns.',
    component: PieChart,
    propsSchema: pieChartSchema,
  },
  {
    name: 'InsightCard',
    description: 'A metric card showing a key value with trend indicator. Use for KPIs, summary statistics, or important metrics.',
    component: InsightCard,
    propsSchema: insightCardSchema,
  },
];

// Empty tools array for now
export const tamboTools: any[] = [];

// Aliases
export const components = tamboComponents;
export const tools = tamboTools;

export const tamboConfig = {
  environment: 'production' as const,
  components: tamboComponents,
  tools: tamboTools,
  model: {
    provider: 'openai' as const,
    model: 'gpt-4o',
    temperature: 0.2,
  },
  streaming: {
    enabled: true,
    delay: 50,
  },
};