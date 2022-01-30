import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState, { GAME_LEVEL_SETTINGS } from '@src/App/initialState';
import { createGameField } from '@src/utils/';

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    rehydrate: (state) => state,
    restoreGame: (state, action) => action.payload,
    setUserLevel: (state, { payload }: PayloadAction<string>) => {
      state.userLevel = payload;
      state.gameFieldSize = GAME_LEVEL_SETTINGS[payload].size;
      state.gameFieldPercentFilled = GAME_LEVEL_SETTINGS[payload].percent;
      state.gameFieldData = createGameField(state.gameFieldSize ** 2, state.gameFieldPercentFilled);
    },
    setGameFieldSize: (state, { payload }: PayloadAction<number>) => {
      state.gameFieldSize = payload;
      state.gameFieldData = createGameField(payload ** 2, state.gameFieldPercentFilled);
    },
    setSelectedCell: (state, { payload }: PayloadAction<number | undefined>) => {
      state.selectedCell = payload;
    },
    moveToCell: (state, { payload }: PayloadAction<number>) => state,
    updateGame: (state, action) => ({ ...state, ...action.payload }),
    initApp: (state) => {
      state.gameFieldPercentFilled = initialState.gameFieldPercentFilled;
      state.gameFieldData = createGameField(
        initialState.gameFieldSize ** 2,
        initialState.gameFieldPercentFilled
      );
    },
    resetApp: (state) => {
      const gameFieldPercentFilled = Number(state.userLevel) * 10;
      state.score = 0;
      state.gameFieldPercentFilled = gameFieldPercentFilled;
      state.gameFieldData = createGameField(state.gameFieldSize ** 2, gameFieldPercentFilled);
    },
    waitOn: (state) => {
      state.isLoading = true;
    },
    waitOff: (state) => {
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = appSlice;

export { appSlice, actions, reducer };
