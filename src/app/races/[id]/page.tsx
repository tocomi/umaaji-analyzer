'use client';

import { useRaceDetail } from '@/hooks/useRaceDetail';

export default function RaceDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const raceDetail = useRaceDetail(Number(id));

  if (!raceDetail) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>
        {raceDetail.place} {raceDetail.round}R
      </p>
      <p>{raceDetail.name}</p>
      {raceDetail.horses.map((horse) => (
        <div key={horse.name}>
          <p>{horse.name}</p>
        </div>
      ))}
    </div>
  );
}
