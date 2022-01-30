import getIndByPos from '@src/utils/getIndByPos';
import { GAME_LEVEL_SETTINGS } from '@src/App/initialState';

const VERTICAL = 'V';
const HORIZONTAL = 'H';

type TDirection = typeof VERTICAL | typeof HORIZONTAL;

const getChainByInd = (direction: TDirection, pos: number, cells: Array<number>) => {
  const chains = [];
  let line = [];
  const size = Math.sqrt(cells.length);
  for (let i = 0; i < size; i = i + 1) {
    const curPos: [number, number] = direction === 'H' ? [i, pos] : [pos, i];
    const curInd = getIndByPos(curPos, size);
    if (!cells[curInd]) {
      if (line.length > GAME_LEVEL_SETTINGS['2'].chain) {
        chains.push([...line]);
      }
      line = [];
    } else {
      line.push(curInd);
    }
  }
  if (line.length > GAME_LEVEL_SETTINGS['2'].chain) {
    chains.push([...line]);
  }
  return chains;
};

export { getChainByInd, VERTICAL, HORIZONTAL };
