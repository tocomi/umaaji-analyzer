'use client';

import { css } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';
import { RaceCard } from '@/components/RaceCard';
import { Race } from '@/types';

const DUMMY_ID = 0;
const DO_NOTHING = () => undefined;

export default function RaceDetail({ raceDetail }: { raceDetail: Race }) {
  return (
    <div
      className={css({
        p: 4,
      })}
    >
      <div className={stack({ gap: 2 })}>
        <RaceCard
          raceSummary={{ ...raceDetail, id: DUMMY_ID }}
          onClick={DO_NOTHING}
        />
        <div>
          {raceDetail.horses.map((horse) => (
            <div key={horse.name}>
              <p>{horse.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
