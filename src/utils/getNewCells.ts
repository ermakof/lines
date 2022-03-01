import { compose } from 'ramda';
import shuffle from '@src/utils/shuffle';
import { GAME_LEVEL_SETTINGS } from '@src/App/initialState';

const getFreeCells = (cells: Array<number>) =>
  cells.map((cell, ind) => (!cell ? ind : -1)).filter((pos) => pos > -1);

const generateNewCells = (countCells: number) => (randomArray: Array<number>) =>
  randomArray.slice(0, countCells);

const getNewCells = (cells: Array<number> = [], level = '1') => {
  const increase = GAME_LEVEL_SETTINGS[level].increase;
  return compose(generateNewCells(increase), shuffle, getFreeCells)(cells);
};

export default getNewCells;
