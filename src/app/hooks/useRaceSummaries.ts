'use client';

import { useEffect, useRef, useState } from 'react';
import { RaceSummary } from '@/types';

export const useRaceSummaries = () => {
  const [raceSummaries, setRaceSummaries] = useState<RaceSummary[]>([]);

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    const load = async () => {
      initialized.current = true;
      const response = await fetch('http://localhost:3000/api/races');
      setRaceSummaries(await response.json());
    };
    load();
  }, []);

  return raceSummaries;
};
