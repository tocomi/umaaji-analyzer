'use client';

import { useMemo } from 'react';
import { css, cva } from '../../../../styled-system/css';
import { center, stack } from '../../../../styled-system/patterns';
import { RaceCard } from '@/components/RaceCard';
import { calculateScore } from '@/modules/umaaji-calculator';
import { HorseSexMap, Race } from '@/types';

const DUMMY_ID = 0;
const DO_NOTHING = () => undefined;

const gateNumberRecipe = cva({
  base: {
    fontSize: 12,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'gray.500',
    textAlign: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray.300',
  },
  variants: {
    gateNumber: {
      1: {
        backgroundColor: 'white',
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

const ageRecipe = cva({
  base: {
    minW: '24px',
    color: 'gray.500',
  },
  variants: {
    sex: {
      male: {
        color: 'blue.500',
      },
      female: {
        color: 'red.500',
      },
    },
  },
});

export default function RaceDetail({ raceDetail }: { raceDetail: Race }) {
  const sortedHorses = useMemo(() => {
    return raceDetail.horses.sort((a, b) => {
      if (a.oddsRank > b.oddsRank) return 1;
      if (a.oddsRank < b.oddsRank) return -1;
      return 0;
    });
  }, [raceDetail.horses]);

  const sortedHorsesWithScore = useMemo(() => {
    return sortedHorses.map((horse) => {
      const score = calculateScore(raceDetail, horse.records);
      return { ...horse, score };
    });
  }, [raceDetail, sortedHorses]);

  return (
    <div
      className={css({
        p: 4,
      })}
    >
      <div className={stack({ gap: 4 })}>
        <RaceCard
          raceSummary={{ ...raceDetail, id: DUMMY_ID }}
          onClick={DO_NOTHING}
        />

        <div>
          {sortedHorsesWithScore.map((horse) => (
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
              <div className={stack({ gap: 0, h: '51px', minW: '18px' })}>
                {/* 枠番 */}
                <div
                  className={gateNumberRecipe({
                    // @ts-ignore TODO: 型エラー解消
                    gateNumber: horse.gateNumber,
                  })}
                >
                  <p>{horse.gateNumber}</p>
                </div>

                {/* 馬番 */}
                <div
                  className={center({
                    flex: 1,
                    fontSize: 12,
                    color: 'gray.500',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRightWidth: 1,
                    borderColor: 'gray.300',
                  })}
                >
                  <p>{horse.horseNumber}</p>
                </div>
              </div>
              <div
                className={stack({
                  p: 1,
                  flex: 1,
                  direction: 'row',
                  justifyContent: 'space-between',
                })}
              >
                <div className={stack({ gap: 1 })}>
                  {/* 馬名 */}
                  <p
                    className={css({
                      fontSize: 14,
                      minW: '128px',
                      fontWeight: 'bold',
                      color: 'gray.700',
                    })}
                  >
                    {horse.name}
                  </p>
                  <div
                    className={stack({
                      direction: 'row',
                      gap: 1,
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'gray.500',
                    })}
                  >
                    {/* 馬齢 */}
                    {/* @ts-ignore TODO: 型エラー解消 */}
                    <p className={ageRecipe({ sex: horse.sex })}>
                      {HorseSexMap[horse.sex]}
                      {horse.age}
                    </p>

                    {/* ジョッキー */}
                    <p className={css({ minW: '40px' })}>{horse.jockey}</p>

                    {/* ハンデ */}
                    <p>{horse.handi}</p>
                  </div>
                </div>

                <div className={stack({ direction: 'row', gap: 2 })}>
                  {/* オッズ */}
                  <div
                    className={stack({
                      gap: 0,
                      minW: '40px',
                      textAlign: 'center',
                    })}
                  >
                    <p className={css({ fontSize: 16, fontWeight: 'bold' })}>
                      {horse.oddsRank}
                    </p>
                    <p className={css({ fontSize: 12 })}>{horse.odds}</p>
                  </div>

                  {/* 平均値 */}
                  <div
                    className={stack({
                      gap: 0,
                      minW: '40px',
                      textAlign: 'center',
                    })}
                  >
                    <p className={css({ fontSize: 16, fontWeight: 'bold' })}>
                      {horse.score.average}
                    </p>
                    <p className={css({ fontSize: 12 })}>
                      {horse.score.average}
                    </p>
                  </div>

                  {/* 最大値 */}
                  <div
                    className={stack({
                      gap: 0,
                      minW: '40px',
                      textAlign: 'center',
                    })}
                  >
                    <p className={css({ fontSize: 16, fontWeight: 'bold' })}>
                      {horse.score.max}
                    </p>
                    <p className={css({ fontSize: 12 })}>{horse.score.max}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
