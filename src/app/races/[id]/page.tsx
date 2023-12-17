import RaceDetail from './RaceDetail';
import { DOMAIN } from '@/constants';
import { Race } from '@/types';

export async function generateStaticParams() {
  const response = await fetch(`${DOMAIN}/races`);
  const races = (await response.json()) as Race[];
  return races.map((race) => ({
    id: race.id.toString(),
  }));
}

const getRaceDetail = async (raceId: number): Promise<Race> => {
  const response = await fetch(`${DOMAIN}/races/${raceId}`, {
    next: { revalidate: 300 },
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
