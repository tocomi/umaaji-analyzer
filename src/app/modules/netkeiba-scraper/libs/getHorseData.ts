import { Page } from 'puppeteer';
import { getHorseRecords } from './getHorseRecords';
import { getHref, getTextContent } from './utils';
import { Horse } from '@/types';

/**
 * レース詳細ページから出走馬の情報を取得する
 */
export const getHorseData = async ({
  page,
}: {
  page: Page;
}): Promise<Horse[]> => {
  const horseElements = await page.$$('#sort_table .HorseList');

  const horses: Horse[] = [];
  for (const horseElement of horseElements) {
    const horseInfo = await horseElement.$('#Horse_Info_Data');
    if (!horseInfo) continue;

    const horseLink = await horseInfo.$('.Horse02 a');
    if (!horseLink) continue;

    const horseUrl = await getHref(horseLink);
    const horseName = await getTextContent(horseLink);
    if (!horseName) continue;

    const horseNumberElement = await horseElement.$('.Waku');
    if (!horseNumberElement) continue;
    const horseNumber = Number(await getTextContent(horseNumberElement));

    const gateNumberElement = await horseElement.$$('td');
    if (!gateNumberElement.length) continue;
    const gateNumber = Number(await getTextContent(gateNumberElement[0]));

    const oddsAndRankElements = await horseElement.$$('.Popular span');
    if (!oddsAndRankElements.length) continue;
    const rawOdds = await getTextContent(oddsAndRankElements[0]);
    if (!rawOdds) continue;
    const odds = Number(rawOdds);

    // ex. (12人気)
    const rawOddsRank = await getTextContent(oddsAndRankElements[1]);
    if (!rawOddsRank) continue;
    const oddsRankMatch = rawOddsRank.match(/(\d+)人気/);
    if (!oddsRankMatch) continue;
    const oddsRank = Number(oddsRankMatch[1]);

    const records = await getHorseRecords({ horseElement });

    horses.push({
      name: horseName,
      url: horseUrl,
      horseNumber,
      gateNumber,
      odds,
      oddsRank,
      records,
    });
  }

  return horses;
};
