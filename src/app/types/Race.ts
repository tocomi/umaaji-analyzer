import { Horse } from './Horse';
import { RaceClass, RaceType } from './shared';

export type Race = {
  round: number;
  name: string;
  class: RaceClass;
  place: string;
  startTime: string;
  type: RaceType;
  distance: number;
  horseCount: number;
  horses: Horse[];
};

export type RaceSummary = Omit<Race, 'horses'> & {
  /** netkeiba 上で定義されている ID */
  id: number;
};
