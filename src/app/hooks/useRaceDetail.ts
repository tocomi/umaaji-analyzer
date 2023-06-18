'use client';

import { useEffect, useRef, useState } from 'react';
import { Race } from '@/types';

export const useRaceDetail = (raceId: number) => {
  const [raceDetail, setRaceDetail] = useState<Race | undefined>(undefined);

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    const load = async () => {
      initialized.current = true;
      const response = await fetch(`http://localhost:3000/api/races/${raceId}`);
      setRaceDetail(await response.json());
    };
    load();
  }, [raceId]);

  return raceDetail;
};
