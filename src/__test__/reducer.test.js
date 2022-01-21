import {
  clearGameField,
  loginApp,
  logoutApp,
  resetApp,
  setLevel,
  waitOff,
  waitOn,
} from '@src/App/actions';
import { setSelectedCell } from '@src/modules/Cell/actions';
import { setGameFieldSize } from '@src/modules/GameField/actions';
import reducer from '@src/reducer';

describe('reducer', () => {
  it('resetApp', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = reducer(state, resetApp());
    expect(newState.gameFieldPercentFilled).toBe(30);
    expect(newState.gameFieldSize).toBe(5);
    expect(newState.gameLevel).toBe('3');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(25);
  });

  it('setLevel', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = reducer(state, setLevel('2'));
    expect(newState.gameFieldPercentFilled).toBe(20);
    expect(newState.gameFieldSize).toBe(5);
    expect(newState.gameLevel).toBe('2');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(25);
  });

  it('setSelectedCell', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = reducer(state, setSelectedCell(2));
    expect(newState.selectedCell).toEqual(2);
  });

  it('setGameFieldSize', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 2,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = reducer(state, setGameFieldSize(2));
    expect(newState.gameFieldSize).toEqual(2);
    expect(newState.gameFieldData.length).toEqual(4);
  });

  it('loginApp', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 2,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = reducer(
      state,
      loginApp({
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      })
    );
    expect(newState.userProfile).toEqual({
      login: 'user',
      password: '123',
      token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
    });
  });

  it('logoutApp', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 2,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      userProfile: {
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      },
    };
    const newState = reducer(state, logoutApp());
    expect(newState.userProfile).toEqual(null);
  });

  it('clearGameField', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 3,
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
      userProfile: {
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      },
    };
    const newState = reducer(state, clearGameField());
    expect(newState.gameFieldPercentFilled).toEqual(0);
    expect(newState.gameFieldData).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('waitOn', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 3,
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = reducer(state, waitOn());
    expect(newState.isLoading).toEqual(true);
  });

  it('waitOff', () => {
    const state = {
      gameLevel: '3',
      gameFieldSize: 3,
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = reducer(state, waitOff());
    expect(newState.isLoading).toEqual(false);
  });
});
