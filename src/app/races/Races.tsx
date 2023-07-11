'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { stack } from '../../../styled-system/patterns';
import { RaceCard } from './RaceCard';
import { RaceSummary } from '@/types';

export const Races = ({ raceSummaries }: { raceSummaries: RaceSummary[] }) => {
  const router = useRouter();

  // const tabTitles = useMemo(() => {
  //   return Array.from(
  //     new Set(raceSummaries.map((raceSummary) => raceSummary.place))
  //   );
  // }, [raceSummaries]);

  const onClickCard = useCallback(
    (raceId: number) => {
      router.push(`/races/${raceId}`);
    },
    [router]
  );

  return (
    <div className={stack({ padding: 4, gap: 2 })}>
      {raceSummaries.map((raceSummary) => (
        <RaceCard
          key={`${raceSummary.place}-${raceSummary.round}`}
          raceSummary={raceSummary}
          onClick={onClickCard}
        />
      ))}
    </div>
  );
};
