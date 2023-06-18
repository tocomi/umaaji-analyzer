'use client';

import { useRaceSummaries } from './hooks/useRaceSummaries';

export default function Home() {
  const raceSummaries = useRaceSummaries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {raceSummaries.map((raceSummary) => (
        <div
          key={`${raceSummary.place}-${raceSummary.round}`}
          className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
        >
          <p>
            {raceSummary.place} {raceSummary.round}R
          </p>
          <p>{raceSummary.name}</p>
          <p>{raceSummary.startTime}</p>
        </div>
      ))}
    </main>
  );
}
