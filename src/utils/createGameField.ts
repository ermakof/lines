import { compose } from 'ramda';
import createIndexArrayBySize from '@src/utils/createArrayBySize';
import shuffle from '@src/utils/shuffle';
import generateCellsByPercent from '@src/utils/generateCellsByPercent';

const createGameField = (size: number, fillPercent: number = 30) => {
  return compose(generateCellsByPercent(fillPercent), shuffle, createIndexArrayBySize)(size);
};

export default createGameField;
