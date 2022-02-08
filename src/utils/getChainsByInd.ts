import { getChainByInd, HORIZONTAL, VERTICAL } from '@src/utils/getChainByInd';
import getPosByInd from '@src/utils/getPosByInd';

const getVerticalChain = (order: number, level: string, cells: Array<number>, idColor: number) =>
  getChainByInd(VERTICAL, order, level, cells, idColor);

const getHorizontalChain = (order: number, level: string, cells: Array<number>, idColor: number) =>
  getChainByInd(HORIZONTAL, order, level, cells, idColor);

const getChainsByInd = (targetCell: number, level: string) => (cells: Array<number>) => {
  const pos = getPosByInd(targetCell);
  const chainsV = getVerticalChain(pos[0], level, cells, cells[targetCell]);
  const chainsH = getHorizontalChain(pos[1], level, cells, cells[targetCell]);
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
