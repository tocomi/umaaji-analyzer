import RaceDetail from './RaceDetail';
import { Race } from '@/types';

export const getRaceDetail = async (raceId: number): Promise<Race> => {
  const response = await fetch(`http://localhost:3000/api/races/${raceId}`);
  const raceDetail = (await response.json()) as Race;
  return raceDetail;
};

export default async function Race({
  params: { id },
}: {
  params: { id: string };
}) {
  const raceDetail = await getRaceDetail(Number(id));

  return <RaceDetail raceDetail={raceDetail} />;
}
