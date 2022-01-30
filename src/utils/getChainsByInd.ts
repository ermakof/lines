import { getChainByInd, HORIZONTAL, VERTICAL } from '@src/utils/getChainByInd';
import getPosByInd from '@src/utils/getPosByInd';

const getVerticalChain = (order: number, level: string, cells: Array<number>) =>
  getChainByInd(VERTICAL, order, level, cells);

const getHorizontalChain = (order: number, level: string, cells: Array<number>) =>
  getChainByInd(HORIZONTAL, order, level, cells);

const getChainsByInd = (targetCell: number, level: string) => (cells: Array<number>) => {
  const pos = getPosByInd(targetCell);
  const chainsV = getVerticalChain(pos[0], level, cells);
  const chainsH = getHorizontalChain(pos[1], level, cells);
  const rez = [];
  if (chainsV.length) {
    rez.push(chainsV);
  }
  if (chainsH.length) {
    rez.push(chainsH);
  }
  return rez;
};

export default getChainsByInd;
