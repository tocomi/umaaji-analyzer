'use client';

import { useCallback, useMemo } from 'react';
import { css, cva } from '../../../../styled-system/css';
import { center, hstack, stack } from '../../../../styled-system/patterns';
import { RaceCard } from '@/components/RaceCard';
import { calculateScore } from '@/modules/umaaji-calculator';
import { HorseSexMap, Race } from '@/types';

const gateNumberRecipe = cva({
  base: {
    w: '18px',
    h: '51px',
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
  const horsesWithScore = useMemo(() => {
    return raceDetail.horses.map((horse) => {
      const score = calculateScore(raceDetail, horse.records);
      return {
        ...horse,
        score: {
          ...score,
          average: score.average,
          max: score.max,
        },
      };
    });
  }, [raceDetail]);

  const horsesWithRank = useMemo(() => {
    const addAvarageRank = (horses: typeof horsesWithScore) => {
      let currentRank = 1;
      let previousScore = horses[0].score.average;
      return horses.map((horse, index) => {
        if (index === 0) {
          return {
            ...horse,
            score: {
              ...horse.score,
              averageRank: currentRank,
            },
          };
        }

        // NOTE: 前の馬とスコアが同じ場合は同じ順位
        if (horse.score.average === previousScore) {
          return {
            ...horse,
            score: {
              ...horse.score,
              averageRank: currentRank,
            },
          };
        }

        previousScore = horse.score.average;
        currentRank = index + 1;
        return {
          ...horse,
          score: {
            ...horse.score,
            averageRank: currentRank,
          },
        };
      });
    };

    const addMaxRank = (horses: ReturnType<typeof addAvarageRank>) => {
      let currentRank = 1;
      let previousScore = horses[0].score.max;
      return horses.map((horse, index) => {
        if (index === 0) {
          return {
            ...horse,
            score: {
              ...horse.score,
              maxRank: currentRank,
            },
          };
        }

        // NOTE: 前の馬とスコアが同じ場合は同じ順位
        if (horse.score.max === previousScore) {
          return {
            ...horse,
            score: {
              ...horse.score,
              maxRank: currentRank,
            },
          };
        }

        previousScore = horse.score.max;
        currentRank = index + 1;
        return {
          ...horse,
          score: {
            ...horse.score,
            maxRank: currentRank,
          },
        };
      });
    };

    const sortedByAverageHorses = horsesWithScore.sort(
      (a, b) => b.score.average - a.score.average
    );
    const horsesWithAverageRank = addAvarageRank(sortedByAverageHorses);

    const sortedByMaxHorses = horsesWithAverageRank.sort(
      (a, b) => b.score.max - a.score.max
    );
    const horsesWithMaxRank = addMaxRank(sortedByMaxHorses);

    return horsesWithMaxRank;
  }, [horsesWithScore]);

  const sortedHorses = useMemo(() => {
    return horsesWithRank.sort((a, b) => {
      return a.oddsRank - b.oddsRank;
    });
  }, [horsesWithRank]);

  const onRaceCardClick = useCallback(() => {
    window.open(
      `https://race.netkeiba.com/race/shutuba_past.html?race_id=${raceDetail.id}&rf=shutuba_submenu`,
      '_blank noopener noreferrer'
    );
  }, [raceDetail.id]);

  return (
    <div
      className={css({
        p: 4,
      })}
    >
      <div className={stack({ gap: 4 })}>
        <RaceCard raceSummary={raceDetail} onClick={onRaceCardClick} />

        <div>
          {sortedHorses.map((horse) => (
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
              <div className={hstack({ gap: 0 })}>
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
                    w: '18px',
                    h: '51px',
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

                <div className={stack({ direction: 'row', gap: 3 })}>
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
                    <p className={css({ fontSize: 12 })}>
                      {horse.odds.toFixed(1)}
                    </p>
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
                      {horse.score.averageRank}
                    </p>
                    <p className={css({ fontSize: 12 })}>
                      {horse.score.average.toFixed(1)}
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
                      {horse.score.maxRank}
                    </p>
                    <p className={css({ fontSize: 12 })}>
                      {horse.score.max.toFixed(1)}
                    </p>
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
