import { compose } from 'ramda';

import removeOrderedChains from '@src/utils/removeOrderedChains';
import addNewCells from '@src/utils/addNewCells';
import setCell from '@src/utils/setCell';
import getOrderedChains from '@src/utils/getOrderedChains';

const updateGameField = (
  cells: Array<number>,
  selectedCell: number | undefined,
  targetCell: number
) => {
  return compose(
    addNewCells(3),
    removeOrderedChains,
    getOrderedChains(targetCell + 1),
    setCell(selectedCell != undefined ? targetCell : undefined),
    setCell(selectedCell, 0)
  )(cells);
};

export default updateGameField;
