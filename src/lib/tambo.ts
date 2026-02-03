import { TamboComponent } from '@tambo-ai/react';
import type { ComponentType } from 'react';
import { z } from 'zod';

const lineChartSchema = z.object({
  data: z.array(z.object({
    date: z.string(),
    value: z.number(),
  })),
  title: z.string().optional(),
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

// Export schemas for use in components
export { lineChartSchema, barChartSchema, pieChartSchema };

export const tamboComponents: TamboComponent[] = [
  {
    name: 'LineChart',
    description: 'A line chart showing trends over time. Use for MRR, revenue trends, or any time-series data.',
    component: (() => null) as ComponentType<any>, // This will be mapped to actual component in TamboProvider
    propsSchema: lineChartSchema,
  },
  {
    name: 'BarChart',
    description: 'A bar chart comparing categories. Use for quarterly comparisons, product performance.',
    component: (() => null) as ComponentType<any>,
    propsSchema: barChartSchema,
  },
  {
    name: 'PieChart',
    description: 'A donut chart showing distribution. Use for customer segments, market share.',
    component: (() => null) as ComponentType<any>,
    propsSchema: pieChartSchema,
  },
];

export const components = tamboComponents;
export const tamboTools: any[] = [];
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