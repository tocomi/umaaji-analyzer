import { API_DOMAIN } from './constants';
import { Race } from './types';
import { Races } from '@/races/Races';

export const revalidate = 6000;

const getRaceSummaries = async (): Promise<Race[]> => {
  const response = await fetch(`${API_DOMAIN}/races`, {
    next: { revalidate: 3600 },
  });
  const raceSummaries = (await response.json()) as Race[];
  return raceSummaries;
};

export default async function Home() {
  const raceSummaries = await getRaceSummaries();

  return <Races raceSummaries={raceSummaries} />;
}
