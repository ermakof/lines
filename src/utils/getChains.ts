import { compose } from 'ramda';

import getChainByInd from '@src/utils/getChainByInd';
import getPosByInd from '@src/utils/getPosByInd';

const getChainByX = (order: number, cells: Array<number>) => getChainByInd('X', order, cells);

const getChainByY = (order: number, cells: Array<number>) => getChainByInd('Y', order, cells);

const getChainsByInd = (targetCell: number) => (cells: Array<number>) => {
  const pos = getPosByInd(targetCell, Math.sqrt(cells.length));
  const chainsX = getChainByX(pos[0], cells);
  const chainsY = getChainByY(pos[1], cells);
  const rez = [];
  if (chainsX.length) {
    rez.push(chainsX);
  }
  if (chainsY.length) {
    rez.push(chainsY);
  }
  return rez;
};

const filterChainByX = (chains: number[][] | undefined, ind: number) =>
  chains && chains.filter((chain) => chain.indexOf(ind) > -1)[0];

const filterChainByY = (chains: number[][] | undefined, ind: number) =>
  chains && chains.filter((chain) => chain.indexOf(ind) > -1)[0];

const filterChainsByInd = (ind: number) => (chains: number[][][]) => {
  const lineX = filterChainByX(chains[0], ind);
  const lineY = filterChainByY(chains[1], ind);
  const rez = [];
  if (lineX) {
    rez.push(lineX);
  }
  if (lineY) {
    rez.push(lineY);
  }
  return rez;
};

const getChains = (ind: number, cells: Array<number>) => {
  return compose(filterChainsByInd(ind), getChainsByInd(ind))(cells);
};

export default getChains;
