import getIndByPos from '@src/utils/getIndByPos';
import { GAME_FIELD_SIZE, GAME_LEVEL_SETTINGS } from '@src/App/initialState';

const VERTICAL = 'V';
const HORIZONTAL = 'H';

type TDirection = typeof VERTICAL | typeof HORIZONTAL;
interface ILines {
  [key: string]: Array<number>;
}

const getChainByInd = (
  direction: TDirection,
  pos: number,
  level: string,
  cells: Array<number>,
  idColor: number
) => {
  const chains: Array<Array<number>> = [];
  const lines: ILines = {
    1: [],
    2: [],
    3: [],
  };
  const maxChainLen = GAME_LEVEL_SETTINGS[level].chain;
  for (let i = 0; i < GAME_FIELD_SIZE; i = i + 1) {
    const curPos: [number, number] = direction === 'H' ? [i, pos] : [pos, i];
    const curInd = getIndByPos(curPos);
    const curIdColor = cells[curInd];
    if (!cells[curInd] || curIdColor !== idColor) {
      if (idColor && lines[idColor].length > maxChainLen) {
        chains.push([...lines[idColor]]);
      }
      lines[idColor] = [];
    } else {
      lines[idColor].push(curInd);
    }
  }
  if (lines[idColor].length > maxChainLen) {
    chains.push([...lines[idColor]]);
  }
  return chains;
};

export { getChainByInd, VERTICAL, HORIZONTAL };
