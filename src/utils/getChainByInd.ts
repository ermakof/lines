import getIndByPos from '@src/utils/getIndByPos';
import { GAME_FIELD_SIZE, GAME_LEVEL_SETTINGS } from '@src/App/initialState';

const VERTICAL = 'V';
const HORIZONTAL = 'H';

type TDirection = typeof VERTICAL | typeof HORIZONTAL;

const getChainByInd = (direction: TDirection, pos: number, level: string, cells: Array<number>) => {
  const chains = [];
  let line = [];
  for (let i = 0; i < GAME_FIELD_SIZE; i = i + 1) {
    const curPos: [number, number] = direction === 'H' ? [i, pos] : [pos, i];
    const curInd = getIndByPos(curPos);
    if (!cells[curInd]) {
      if (line.length > GAME_LEVEL_SETTINGS[level].chain) {
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
