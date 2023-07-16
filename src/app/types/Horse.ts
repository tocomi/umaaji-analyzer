import { Record } from './Record';

export type Horse = {
  name: string;
  url: string;
  horseNumber: number;
  gateNumber: number;
  records: Record[];
};
