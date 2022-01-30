import { compose } from 'ramda';

import removeOrderedChains from '@src/utils/removeOrderedChains';
import addNewCells from '@src/utils/addNewCells';

const updateGameField = (cells: Array<number>, chains: Array<Array<number>>) => {
  return compose(addNewCells(3), removeOrderedChains(chains))(cells);
};

export default updateGameField;
