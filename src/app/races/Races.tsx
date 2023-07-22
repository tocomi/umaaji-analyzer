'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { stack } from '../../../styled-system/patterns';
import { PlaceTabs } from './PlaceTabs';
import { RaceCard } from '@/components/RaceCard';
import { Race } from '@/types';

export const Races = ({ raceSummaries }: { raceSummaries: Race[] }) => {
  const router = useRouter();

  const onClickCard = useCallback(
    (raceId: number) => {
      router.push(`/races/${raceId}`);
    },
    [router]
  );

  const raceSummaryMap = useMemo(() => {
    return raceSummaries.reduce<{ [key: string]: Race[] }>(
      (result, raceSummary) => {
        (result[raceSummary.place] = result[raceSummary.place] || []).push(
          raceSummary
        );
        return result;
      },
      {}
    );
  }, [raceSummaries]);

  const tabTitles = useMemo(() => {
    return Object.keys(raceSummaryMap);
  }, [raceSummaryMap]);

  const tabContens = useMemo(() => {
    return Object.values(raceSummaryMap).map((raceSummaries) => {
      return (
        <div className={stack({ gap: 2 })} key={raceSummaries[0].place}>
          {raceSummaries.map((raceSummary) => (
            <RaceCard
              key={`${raceSummary.place}-${raceSummary.round}`}
              raceSummary={raceSummary}
              onClick={onClickCard}
            />
          ))}
        </div>
      );
    });
  }, [onClickCard, raceSummaryMap]);

  return (
    <div className={stack({ padding: 4, gap: 2 })}>
      <PlaceTabs titles={tabTitles} contents={tabContens} />
    </div>
  );
};
