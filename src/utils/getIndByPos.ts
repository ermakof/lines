import { GAME_FIELD_SIZE } from '@src/App/initialState';

const getIndByPos = (pos: Array<number>): number => {
  return pos[0] + pos[1] * GAME_FIELD_SIZE;
};

export default getIndByPos;
