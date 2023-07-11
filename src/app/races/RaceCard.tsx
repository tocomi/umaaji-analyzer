'use client';

import { FC, memo, useCallback } from 'react';
import { css } from '../../../styled-system/css';
import { center, stack } from '../../../styled-system/patterns';
import { RaceSummary, raceClass, raceType } from '@/types';

type Props = {
  raceSummary: RaceSummary;
  onClick: (raceId: number) => void;
};

export const RaceCard: FC<Props> = memo(function RaceCard({
  raceSummary,
  onClick,
}) {
  const _onClick = useCallback(() => {
    onClick(raceSummary.id);
  }, [onClick, raceSummary.id]);

  return (
    <div
      className={css({
        rounded: 8,
        p: 1,
        borderWidth: 2,
        borderColor: 'sky.400',
      })}
      onClick={_onClick}
    >
      <div className={stack({ direction: 'row' })}>
        <div
          className={center({
            p: 1,
            rounded: 4,
            backgroundColor: 'sky.400',
            color: 'white',
            minW: '44px',
            flexDir: 'column',
          })}
        >
          <p className={css({ fontSize: 12, fontWeight: 'bold' })}>
            {raceSummary.place}
          </p>
          <p className={css({ fontSize: 16, fontWeight: 'bold' })}>
            {raceSummary.round}R
          </p>
        </div>

        <div className={stack({ gap: 1 })}>
          <div className={stack({ direction: 'row' })}>
            <p
              className={css({
                fontSize: 16,
                fontWeight: 'bold',
                color: 'gray.600',
              })}
            >
              {raceSummary.name}
            </p>
            <p>{raceClass[raceSummary.class]}</p>
          </div>
          <div className={stack({ direction: 'row' })}>
            <p
              className={css({
                fontSize: 14,
                color: 'gray.400',
                fontWeight: 'bold',
              })}
            >
              {raceType[raceSummary.type]}
              {raceSummary.distance}m
            </p>
            <p
              className={css({
                fontSize: 14,
                color: 'gray.400',
                fontWeight: 'bold',
              })}
            >
              {raceSummary.horseCount}頭
            </p>
            <p
              className={css({
                fontSize: 14,
                color: 'gray.400',
                fontWeight: 'bold',
              })}
            >
              {raceSummary.startTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
