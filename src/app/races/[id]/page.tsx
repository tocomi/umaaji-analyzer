import RaceDetail from './RaceDetail';
import { Race } from '@/types';

const getRaceDetail = async (raceId: number): Promise<Race> => {
  const response = await fetch(`http://localhost:3000/api/races/${raceId}`, {
    next: { revalidate: 30000 },
  });
  const raceDetail = (await response.json()) as Race;
  return raceDetail;
};

export default async function Race({
  params: { id },
}: {
  params: { id: string };
}) {
  const _id = Number(id);
  const raceDetail = await getRaceDetail(_id);

  return <RaceDetail raceDetail={{ ...raceDetail, id: _id }} />;
}
