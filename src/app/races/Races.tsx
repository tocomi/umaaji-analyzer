'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Tabs } from './Tabs';
import { RaceSummary } from '@/types';

export const Races = ({ raceSummaries }: { raceSummaries: RaceSummary[] }) => {
  const router = useRouter();

  const tabTitles = useMemo(() => {
    return Array.from(
      new Set(raceSummaries.map((raceSummary) => raceSummary.place))
    );
  }, [raceSummaries]);

  return (
    <>
      <Tabs tabTitles={tabTitles} />
      {raceSummaries.map((raceSummary) => (
        <div
          key={`${raceSummary.place}-${raceSummary.round}`}
          className="relative bg-white py-2 px-6 shadow-xl ring-1 ring-gray-900/5"
          onClick={() => {
            router.push(`/races/${raceSummary.id}`);
          }}
        >
          <p>
            {raceSummary.place} {raceSummary.round}R
          </p>
          <p>{raceSummary.name}</p>
          <p>{raceSummary.startTime}</p>
        </div>
      ))}
    </>
  );
};
