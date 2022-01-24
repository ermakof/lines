import getIndByPos from '@src/utils/getIndByPos';

const VERTICAL = 'V';
const HORIZONTAL = 'H';

type TDirection = typeof VERTICAL | typeof HORIZONTAL;

const getChainByInd = (direction: TDirection, pos: number, cells: Array<number>) => {
  const chains = [];
  let line = [];
  const size = Math.sqrt(cells.length);
  for (let i = 1; i <= size; i = i + 1) {
    const curPos: [number, number] = direction === 'H' ? [i, pos] : [pos, i];
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

export { getChainByInd, VERTICAL, HORIZONTAL };
