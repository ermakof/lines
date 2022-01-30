import { GAME_FIELD_SIZE } from '@src/App/initialState';

const getPosByInd = (ind: number): [number, number] => {
  const y = Math.min(Math.max(Math.ceil((ind + 1) / GAME_FIELD_SIZE) - 1, 0), GAME_FIELD_SIZE - 1);
  const x = Math.min(Math.max(ind - y * GAME_FIELD_SIZE, 0), GAME_FIELD_SIZE - 1);
  return [x, y];
};

export default getPosByInd;
