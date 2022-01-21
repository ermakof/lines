import actionType from './actionType';
import { IUserProfile } from '@src/model';

const resetApp = () => ({
  type: actionType.RESET,
});

const setLevel = (gameLevel: string) => ({
  type: actionType.SET_LEVEL,
  payload: { gameLevel },
});

const loginApp = (userProfile: IUserProfile) => ({
  type: actionType.LOGIN,
  payload: { userProfile },
});

const logoutApp = () => ({
  type: actionType.LOGOUT,
});

const clearGameField = () => ({
  type: actionType.CLEAR_GAME_FIELD,
});

const waitOn = () => ({
  type: actionType.WAIT_ON,
});

const waitOff = () => ({
  type: actionType.WAIT_OFF,
});

export { resetApp, setLevel, loginApp, logoutApp, clearGameField, waitOn, waitOff };
