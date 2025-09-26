import { createContext, useContext } from 'react';
import type { useDanger } from './useDanger';

export const DangerContext = createContext<ReturnType<typeof useDanger> | null>(
  null,
);

export const useDangerContext = () => {
  const context = useContext(DangerContext);
  if (!context) throw new Error('DAngerContext must be initialized');
  return context;
};
