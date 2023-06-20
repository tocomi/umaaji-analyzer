'use client';

import { Race } from '@/types';

export default function RaceDetail({ raceDetail }: { raceDetail: Race }) {
  return (
    <>
      <p>
        {raceDetail.place} {raceDetail.round}R
      </p>
      <p>{raceDetail.name}</p>
      {raceDetail.horses.map((horse) => (
        <div key={horse.name}>
          <p>{horse.name}</p>
        </div>
      ))}
    </>
  );
}
