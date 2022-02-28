import { compose } from 'ramda';

import filterChainsByInd from '@src/utils/filterChainsByInd';
import getChainsByInd from '@src/utils/getChainsByInd';

const getOutdatedChains = (ind: number = -1, level: string = '1', cells: Array<number> = []) => {
  return compose(filterChainsByInd(ind), getChainsByInd(ind, level))(cells);
};

export default getOutdatedChains;
