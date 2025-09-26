import { useEffect, useState } from 'react';
import type { DangerEntity } from './danger/danger.entity';
import { dangerRepository } from './injection';

import Fingerprintjs from '@fingerprintjs/fingerprintjs';

export const useDanger = () => {
  const [list, setList] = useState<DangerEntity[]>([]);
  const [fingerPrint, setFingerPrint] = useState<string>('');

  const fetchData = async () => {
    const result = await dangerRepository.get(fingerPrint);
    if (result.status != 'failure') setList(result.data);
  };

  useEffect(() => {
    const callFetchData = async () => {
      await fetchData();
    };

    const loadFingerPrint = async () => {
      const fpPromise = await Fingerprintjs.load();
      const result = await fpPromise.get();
      setFingerPrint(result.visitorId);
    };

    loadFingerPrint();
    callFetchData();
  });

  return { list };
};
