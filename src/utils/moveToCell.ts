import { compose } from 'ramda';

import setCell from '@src/utils/setCell';

export default (cells: ReadonlyArray<number>, selectedCell?: number, targetCell?: number) => {
  if (selectedCell == null || targetCell == null) {
    return cells;
  }
  return compose(setCell(targetCell, cells[selectedCell]), setCell(selectedCell, 0))(cells);
};
