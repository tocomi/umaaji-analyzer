import { Record, RaceClass, Race } from '@/types';
import { Score } from '@/types/Score';

export const calculateScore = (targetRace: Race, records: Record[]): Score => {
  const recordsWithScore = records
    .filter((record) => record.name !== '-')
    .map((record) => {
      return {
        ...record,
        score: calculateOneRace(record),
      };
    });

  const scores = recordsWithScore.map(({ score }) => score);
  const totalScore = scores.reduce((total, score) => total + score, 0);
  const raceCount = recordsWithScore.length;

  return {
    average: totalScore / raceCount,
    max: Math.max(...scores),
    min: Math.min(...scores),
    raceCount,
    // FIXME: 算出する
    confidence: 100,
  };
};

const calculateOneRace = (raceRecord: Record) => {
  let score = 0;

  score = calculateDiff(score, Number(raceRecord.diff));
  score = calculateGradeAndPlace(score, raceRecord.class, raceRecord.place);

  return Math.round(score * 10) / 10;
};

const calculateDiff = (score: number, diff: number) => {
  const baseScore = 50;
  const calculatedScore = baseScore - diff * 10 * 2;
  return calculatedScore > 0 ? calculatedScore : 0;
};

const calculateGradeAndPlace = (
  score: number,
  raceClass: RaceClass,
  place: string
) => {
  score = calculateGrade(score, raceClass);
  score = calculatePlace(score, place);
  return score;
};

const calculateGrade = (score: number, grade: RaceClass) => {
  if (grade === 'G1') {
    return score * 1.7;
  }
  if (grade === 'G2') {
    return score * 1.5;
  }
  if (grade === 'G3') {
    return score * 1.3;
  }
  if (grade === 'OP' || grade === 'L') {
    return score * 1.1;
  }
  if (grade === '3WIN') {
    return score;
  }
  if (grade === '2WIN') {
    return score * 0.85;
  }
  if (grade === '1WIN') {
    return score * 0.7;
  }
  return score * 0.5;
};

const calculatePlace = (score: number, place: string) => {
  const subPlaces = ['札幌', '函館', '福島', '新潟', '中京', '小倉'];
  const localPlaces = [
    '門別',
    '盛岡',
    '水沢',
    '浦和',
    '船橋',
    '川崎',
    '大井',
    '名古屋',
    '金沢',
    '笠松',
    '高知',
    '園田',
    '佐賀',
  ];
  if (subPlaces.includes(place)) {
    return score * 0.9;
  }
  if (localPlaces.includes(place)) {
    return score * 0.3;
  }
  return score;
};
