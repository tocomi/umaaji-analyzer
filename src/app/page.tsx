import { RaceSummary } from './types';
import { Races } from '@/components';

export const getRaceSummaries = async (): Promise<RaceSummary[]> => {
  const response = await fetch('http://localhost:3000/api/races');
  const raceSummaries = (await response.json()) as RaceSummary[];
  return raceSummaries;
};

export default async function Home() {
  const raceSummaries = await getRaceSummaries();

  return <Races raceSummaries={raceSummaries} />;
}
