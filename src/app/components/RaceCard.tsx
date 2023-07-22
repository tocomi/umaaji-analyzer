'use client';

import { FC, memo, useCallback } from 'react';
import { css } from '../../../styled-system/css';
import { stack } from '../../../styled-system/patterns';
import { RaceClassBadge } from '@/components/RaceClassBadge';
import { RaceRoundBadge } from '@/components/RaceRoundBadge';
import { Race, raceTypeName } from '@/types';

type Props = {
  raceSummary: Race;
  onClick: (raceId: number) => void;
};

const additionalInfoStyle = css({
  fontSize: 14,
  color: 'gray.500',
  fontWeight: 'bold',
});

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
        borderColor: 'cyan.700',
        backgroundColor: 'sky.50',
      })}
      onClick={_onClick}
    >
      <div className={stack({ direction: 'row' })}>
        <RaceRoundBadge place={raceSummary.place} round={raceSummary.round} />

        <div className={stack({ gap: 1 })}>
          <div className={stack({ direction: 'row' })}>
            <RaceClassBadge raceClass={raceSummary.class} />
            <p
              className={css({
                fontSize: 16,
                fontWeight: 'bold',
                color: 'gray.600',
              })}
            >
              {raceSummary.name}
            </p>
          </div>
          <div className={stack({ direction: 'row' })}>
            <p className={additionalInfoStyle}>
              {raceTypeName[raceSummary.type]}
              {raceSummary.distance}m
            </p>
            <p className={additionalInfoStyle}>{raceSummary.horseCount}頭</p>
            <p className={additionalInfoStyle}>{raceSummary.startTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
