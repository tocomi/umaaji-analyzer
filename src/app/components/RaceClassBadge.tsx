'use client';

import { FC, memo } from 'react';
import { cva } from '../../../styled-system/css';
import { RaceClass, raceClassName } from '@/types';

type Props = {
  raceClass: RaceClass;
};

const recipe = cva({
  base: {
    rounded: 4,
    fontSize: 12,
    backgroundColor: 'gray.300',
    color: 'gray.600',
    fontWeight: 'bold',
    minW: '44px',
    h: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    class: {
      G1: { backgroundColor: 'red.500', color: 'white' },
      G2: { backgroundColor: 'blue.500', color: 'white' },
      G3: { backgroundColor: 'orange.300' },
    },
  },
});

export const RaceClassBadge: FC<Props> = memo(function RaceGradeBadge({
  raceClass,
}) {
  return (
    // TODO: variants の class を全部定義しなくても ts-error にならない方法
    // @ts-ignore
    <div className={recipe({ class: raceClass })}>
      {raceClassName[raceClass]}
    </div>
  );
});
