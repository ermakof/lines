import appSlice from '@src/App/appSlice';
import authSlice from '@src/modules/Auth/authSlice';
import initialState from "@src/store/initialState";

describe('reducer', () => {
  it('resetApp', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.resetApp());
    expect(newState.gameFieldPercentFilled).toBe(30);
    expect(newState.gameFieldSize).toBe(5);
    expect(newState.userLevel).toBe('3');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(25);
  });

  it('setUserLevel', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.setUserLevel('2'));
    expect(newState.gameFieldPercentFilled).toBe(20);
    expect(newState.gameFieldSize).toBe(5);
    expect(newState.userLevel).toBe('2');
    expect(newState.selectedCell).toEqual(1);
    expect(newState.gameFieldData.length).toBe(25);
  });

  it('setSelectedCell', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 5,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedCell: 1,
    };
    const newState = appSlice.reducer(state, appSlice.actions.setSelectedCell(2));
    expect(newState.selectedCell).toEqual(2);
  });

  it('setGameFieldSize', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 2,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.setGameFieldSize(2));
    expect(newState.gameFieldSize).toEqual(2);
    expect(newState.gameFieldData.length).toEqual(4);
  });

  it('login', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 2,
      gameFieldPercentFilled: 30,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const newState = authSlice.reducer(state, authSlice.actions.login({
      login: 'user',
      password: '123',
      token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
    }));
    expect(newState.userProfile).toEqual({
      login: 'user',
      password: '123',
      token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
    });
  });

  it('logout', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 2,
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
      gameFieldSize: 3,
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
    expect(newState.gameFieldData).toEqual([...Array(initialState.gameFieldSize ** 2)].map(() => 0));
  });

  it('waitOn', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 3,
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.waitOn());
    expect(newState.isLoading).toEqual(true);
  });

  it('waitOff', () => {
    const state = {
      userLevel: '3',
      gameFieldSize: 3,
      gameFieldPercentFilled: 50,
      gameFieldData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    };
    const newState = appSlice.reducer(state, appSlice.actions.waitOff());
    expect(newState.isLoading).toEqual(false);
  });

  describe('moveToCell', () => {
    it('without create chains', () => {
      const state = {
        userLevel: '1',
        gameFieldSize: 4,
        gameFieldPercentFilled: 30,
        gameFieldData: [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        selectedCell: 0,
      };
      const newState = appSlice.reducer(state, appSlice.actions.moveToCell(10));
      expect(newState.selectedCell).toBeUndefined();
      const newCount = newState.gameFieldData.filter(v => !!v).length;
      expect(newCount).toBe(7);
      expect(newState.gameFieldData[10]).toBe(1);
    });

    it('with create chains', () => {
      const state = {
        userLevel: '1',
        gameFieldSize: 4,
        gameFieldPercentFilled: 30,
        gameFieldData: [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        selectedCell: 5,
      };
      const newState = appSlice.reducer(state, appSlice.actions.moveToCell(1));
      expect(newState.selectedCell).toBeUndefined();
      expect(newState.gameFieldData).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  })
});
