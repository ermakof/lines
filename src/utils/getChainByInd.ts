import getIndByPos from '@src/utils/getIndByPos';

const getChainByInd = (direction: string, order: number, cells: Array<number>) => {
  const chains = [];
  let line = [];
  const size = Math.sqrt(cells.length);
  for (let i = 1; i <= size; i = i + 1) {
    const curPos: [number, number] = direction === 'Y' ? [i, order] : [order, i];
    const curInd = getIndByPos(curPos, size);
    if (!cells[curInd - 1]) {
      if (line.length > 3) {
        chains.push([...line]);
      }
      line = [];
    } else {
      line.push(curInd);
    }
  }
  if (line.length > 3) {
    chains.push([...line]);
  }
  return chains;
};

export default getChainByInd;
