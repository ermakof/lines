import { compose } from 'ramda';

import filterChainsByInd from '@src/utils/filterChainsByInd';
import getChainsByInd from '@src/utils/getChainsByInd';

const getOrderedChains = (ind: number) => (cells: Array<number>) => {
  const chains = compose(filterChainsByInd(ind), getChainsByInd(ind))(cells);
  return { chains, cells };
};

export default getOrderedChains;
