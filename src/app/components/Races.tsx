'use client';

import { useRouter } from 'next/navigation';
import { RaceSummary } from '@/types';

export const Races = ({ raceSummaries }: { raceSummaries: RaceSummary[] }) => {
  const router = useRouter();

  return (
    <>
      {raceSummaries.map((raceSummary) => (
        <div
          key={`${raceSummary.place}-${raceSummary.round}`}
          className="relative bg-white py-2 px-6 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
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
