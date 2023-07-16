import { ElementHandle, Page } from 'puppeteer';
import { getHorseData } from './getHorseData';
import {
  getRaceClassFromElementClass,
  getRaceClassFromRaceName,
  getTextContent,
} from './utils';
import { Race, RaceClass } from '@/types';

const getClass = async (
  raceElement: ElementHandle<Element>,
  raceName: string
): Promise<RaceClass> => {
  const classFromRaceName = getRaceClassFromRaceName(raceName);
  if (classFromRaceName) return classFromRaceName;

  const classElement = await raceElement.$('.Icon_GradeType');
  if (!classElement) return 'OTHER';

  // ex. Icon_GradeType Icon_GradeType17 Icon_GradePos01
  const className = await classElement.evaluate(
    (el) => el.className,
    classElement
  );
  if (className === '') return 'OTHER';

  const raceClass = getRaceClassFromElementClass(className.split(' ')[1]);
  if (raceClass) return raceClass;

  return 'OTHER';
};

export const getRaceData = async ({
  page,
  raceId,
}: {
  page: Page;
  raceId: number;
}): Promise<Race | undefined> => {
  // 過去 5 走成績のページ
  const url = `https://race.netkeiba.com/race/shutuba_past.html?race_id=${raceId}&rf=shutuba_submenu`;
  await page.goto(url);

  const raceElement = await page.$('.RaceList_NameBox');
  if (!raceElement) return;

  const raceRoundElement = await raceElement.$('.RaceNum');
  if (!raceRoundElement) return;
  const rawRaceRound = await getTextContent(raceRoundElement);
  if (!rawRaceRound) return;
  // textContent から R とスペースを取り除く
  const raceRound = Number(rawRaceRound.replace(/R/g, '').trim());

  const raceNameElement = await raceElement.$('.RaceName');
  if (!raceNameElement) return;
  const rawRaceName = await getTextContent(raceNameElement);
  if (!rawRaceName) return;
  const raceName = rawRaceName.trim();

  const racePlaceElement = await raceElement.$$('.RaceData02 span');
  if (!racePlaceElement) return;
  const racePlace = await getTextContent(racePlaceElement[1]);
  if (!racePlace) return;

  const raceClass = await getClass(raceElement, raceName);

  console.log(
    `🏇 Target race: ${racePlace} ${raceRound}R ${raceName} ${raceClass}`
  );

  const horses = await getHorseData({ page });

  return {
    round: raceRound,
    name: raceName,
    place: racePlace,
    class: raceClass,
    horses,
  };
};
