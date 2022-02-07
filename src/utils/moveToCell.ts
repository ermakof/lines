import { compose } from 'ramda';

import setCell from '@src/utils/setCell';

export default (cells: Array<number>, selectedCell: number | undefined, targetCell: number) => {
  return compose(
    setCell(selectedCell != undefined ? targetCell : undefined),
    setCell(selectedCell, 0)
  )(cells);
};
