import { compose } from 'ramda';

const setCell = (ind: number|undefined, value: number = 1) => (cells: Array<number> = []) => {
  if (ind != undefined && ind > -1 && ind < cells.length) {
    cells[ind] = value;
  }
  return [...cells];
};

const updateGameField = (cells: Array<number>, selectedCell: number|undefined, targetCell: number) => {
  return compose(setCell(selectedCell && targetCell), setCell(selectedCell, 0))(cells);
};

export default updateGameField;
