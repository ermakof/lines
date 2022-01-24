import { getChainByInd, HORIZONTAL, VERTICAL } from '@src/utils/getChainByInd';
import getPosByInd from '@src/utils/getPosByInd';

const getVerticalChain = (order: number, cells: Array<number>) => getChainByInd(VERTICAL, order, cells);

const getHorizontalChain = (order: number, cells: Array<number>) => getChainByInd(HORIZONTAL, order, cells);

const getChainsByInd = (targetCell: number) => (cells: Array<number>) => {
  const pos = getPosByInd(targetCell, Math.sqrt(cells.length));
  const chainsV = getVerticalChain(pos[0], cells);
  const chainsH = getHorizontalChain(pos[1], cells);
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
