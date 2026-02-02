'use client';

import { TamboComponent, TamboTool } from '@tambo-ai/react';

export const tamboComponents: TamboComponent[] = [];
export const tamboTools: TamboTool[] = [];

// Aliases for imports
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
