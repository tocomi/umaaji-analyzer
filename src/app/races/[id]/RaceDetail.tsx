'use client';

import { css, cva } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';
import { RaceCard } from '@/components/RaceCard';
import { Race } from '@/types';

const DUMMY_ID = 0;
const DO_NOTHING = () => undefined;

const gateNumberRecipe = cva({
  base: {
    fontSize: 12,
    minW: '18px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
  },
  variants: {
    gateNumber: {
      1: {
        backgroundColor: 'white',
        color: 'black',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray.300',
      },
      2: { backgroundColor: 'black', color: 'white' },
      3: { backgroundColor: 'red.500', color: 'white' },
      4: { backgroundColor: 'blue.500', color: 'white' },
      5: { backgroundColor: 'yellow.500', color: 'white' },
      6: { backgroundColor: 'green.500', color: 'white' },
      7: { backgroundColor: 'orange.500', color: 'white' },
      8: { backgroundColor: 'pink.500', color: 'white' },
    },
  },
});

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
            <div
              key={horse.name}
              className={stack({
                direction: 'row',
                alignItems: 'center',
                gap: 2,
                borderWidth: 1,
                borderColor: 'gray.300',
                // NOTE: border の重なり回避
                marginTop: '-1px',
              })}
            >
              <div className={stack({ gap: 0 })}>
                <p
                  // TODO: 型エラーの解消
                  // @ts-ignore
                  className={gateNumberRecipe({ gateNumber: horse.gateNumber })}
                >
                  {horse.gateNumber}
                </p>
                <p
                  className={css({
                    fontSize: 12,
                    color: 'gray.500',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRightWidth: 1,
                    borderColor: 'gray.300',
                  })}
                >
                  {horse.horseNumber}
                </p>
              </div>
              <div className={stack({ gap: 1 })}>
                <p
                  className={css({
                    fontSize: 14,
                    minW: '128px',
                    fontWeight: 'bold',
                  })}
                >
                  {horse.name}
                </p>
                <div
                  className={stack({ direction: 'row', gap: 1, fontSize: 12 })}
                >
                  <p>{horse.sex}</p>
                  <p>{horse.age}</p>
                  <p>{horse.jockey}</p>
                  <p>{horse.handi}</p>
                </div>
              </div>
              <div
                className={stack({ gap: 0, minW: '40px', textAlign: 'center' })}
              >
                <p className={css({ fontSize: 18, fontWeight: 'bold' })}>
                  {horse.oddsRank}
                </p>
                <p className={css({ fontSize: 14 })}>{horse.odds}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
