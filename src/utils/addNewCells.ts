import { compose } from 'ramda';
import shuffle from '@src/utils/shuffle';

const getFreeCells = (cells: Array<number>) =>
  cells.map((cell, ind) => (!cell ? ind : -1)).filter((pos) => pos > -1);

const generateNewCells =
  (countCells: number, cells: Array<number>) => (randomArray: Array<number>) => {
    const rez = [...cells];
    randomArray.slice(0, 3).forEach((num) => (rez[num] = 1));
    return rez;
  };

const addNewCells = (countCells: number) => (cells: Array<number>) => {
  return compose(generateNewCells(countCells, cells), shuffle, getFreeCells)(cells);
};

export default addNewCells;
