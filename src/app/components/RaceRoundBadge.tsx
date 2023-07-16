'use client';

import { FC, memo } from 'react';
import { css } from '../../../styled-system/css';
import { center } from '../../../styled-system/patterns';

type Props = {
  place: string;
  round: number;
};

export const RaceRoundBadge: FC<Props> = memo(function RaceRoundBadge({
  place,
  round,
}) {
  return (
    <div
      className={center({
        p: 1,
        rounded: 4,
        backgroundColor: 'cyan.700',
        color: 'white',
        minW: '44px',
        w: '44px',
        flexDir: 'column',
      })}
    >
      <p className={css({ fontSize: 12, fontWeight: 'bold' })}>{place}</p>
      <p className={css({ fontSize: 16, fontWeight: 'bold' })}>{round}R</p>
    </div>
  );
});
