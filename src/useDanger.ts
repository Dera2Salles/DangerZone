import { useEffect, useState } from 'react';
import type { DangerEntity } from './danger/danger.entity';
import { dangerRepository } from './injection';
import Fingerprintjs from '@fingerprintjs/fingerprintjs';

export const useDanger = () => {
  const [list, setList] = useState<DangerEntity[]>([]);
  const [fingerPrint, setFingerPrint] = useState<string>('');

  const fetchData = async (fp: string) => {
    const result = await dangerRepository.get(fp);
    if (result.status != 'failure') setList(result.data);
  };

  const warning = async (id: string) => {
    if (!fingerPrint) return;
    await dangerRepository.warning(id, fingerPrint);
  };

  const danger = async (id: string) => {
    if (!fingerPrint) return;
    await dangerRepository.danger(id, fingerPrint);
  };

  const safe = async (id: string) => {
    if (!fingerPrint) return;
    await dangerRepository.safe(id, fingerPrint);
  };

  useEffect(() => {
    const loadFingerPrintAndData = async () => {
      try {
        const fpPromise = await Fingerprintjs.load();
        const result = await fpPromise.get();
        const fp = result.visitorId;
        setFingerPrint(fp);
        await fetchData(fp);
      } catch (error) {
        console.error('Error loading fingerprint:', error);
      }
    };

    loadFingerPrintAndData();
  }, []);

  useEffect(() => {
    if (fingerPrint) {
      fetchData(fingerPrint);
    }
  }, [fingerPrint]);

  return { list, danger, safe, warning };
};
