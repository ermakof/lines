import actionType from './actionType';

const setGameFieldSize = (gameFieldSize: number) => ({
  type: actionType.SET_SIZE,
  payload: { gameFieldSize },
});

export { setGameFieldSize };
