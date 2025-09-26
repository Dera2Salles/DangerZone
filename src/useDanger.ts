import { useState } from 'react';
import type { DangerEntity } from './danger/danger.entity';

export const useDanger = () => {
  const [list, setList] = useState<DangerEntity>([]);
};
