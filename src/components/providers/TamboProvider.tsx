'use client';

import { TamboProvider as Provider } from '@tambo-ai/react';
import { tamboComponents } from '@/lib/tambo';

interface TamboProviderProps {
  children: React.ReactNode;
}

export function TamboProvider({ children }: TamboProviderProps) {
  return (
    <Provider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY || ''}
      components={tamboComponents}
    >
      {children}
    </Provider>
  );
}
