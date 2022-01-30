import { appSlice } from '@src/App/appSlice';
import { authSlice } from '@src/modules/Auth/authSlice';
import { GAME_FIELD_SIZE } from '@src/App/initialState';

describe('reducer', () => {
  it('resetApp', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.resetApp());
    expect(newState.gameFieldPercentFilled).toBe(30);
    expect(newState.userLevel).toBe('3');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(GAME_FIELD_SIZE ** 2);
  });

  it('setUserLevel', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.setUserLevel('2'));
    expect(newState.gameFieldPercentFilled).toBe(20);
    expect(newState.userLevel).toBe('2');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(GAME_FIELD_SIZE ** 2);
  });

  it('setSelectedCell', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.setSelectedCell(2));
    expect(newState.selectedCell).toEqual(2);
  });

  it('setUser', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = authSlice.reducer(
      state,
      authSlice.actions.setUser({
        login: 'user',
        password: '123',
      })
    );
    expect(newState).toEqual(state);
  });

  it('login', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = authSlice.reducer(
      state,
      authSlice.actions.login({
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

  it('logout', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      userProfile: {
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      },
    };
    const newState = authSlice.reducer(state, authSlice.actions.logout());
    expect(newState.userProfile).toEqual(undefined);
  });

  it('initApp', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
      userProfile: {
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      },
    };
    const newState = appSlice.reducer(state, appSlice.actions.initApp());
    expect(newState.gameFieldPercentFilled).toEqual(0);
    expect(newState.gameFieldData).toEqual([...Array(GAME_FIELD_SIZE ** 2)].map(() => 0));
  });

  it('waitOn', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.waitOn());
    expect(newState.isLoading).toEqual(true);
  });

  it('waitOff', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.waitOff());
    expect(newState.isLoading).toEqual(false);
  });

  it('rehydrate', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.rehydrate());
    expect(newState).toEqual(state);
  });

  it('restoreGame', () => {
    const state = {
      userLevel: '1',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(
      state,
      appSlice.actions.restoreGame({
        userLevel: '3',
        gameFieldPercentFilled: 50,
        gameFieldData: [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
        selectedCell: 1,
      })
    );
    expect(newState).toEqual({
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
      selectedCell: 1,
    });
  });

  it('moveToCell', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.moveToCell(1));
    expect(newState).toEqual(state);
  });

  it('updateGame', () => {
    const state = {
      userLevel: '3',
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.updateGame({ userLevel: '2' }));
    expect(newState.userLevel).toBe('2');
  });
});
