import { compose } from 'ramda';
import createIndexArrayBySize from '@src/utils/createArrayBySize';
import shuffle from '@src/utils/shuffle';

const generateCells = (fillPercent: number) => (randomArray: Array<number>) => {
  let countFilledCells = parseInt(((randomArray.length * fillPercent) / 100).toFixed(), 10);
  const rez = randomArray.map(() => 0);
  for (let i = 0; i < countFilledCells; i = i + 1) {
    rez[randomArray[i]] = 1;
  }
  return rez;
};

const createGameField = (size: number, fillPercent: number = 30) => {
  return compose(generateCells(fillPercent), shuffle, createIndexArrayBySize)(size);
};

export default createGameField;
