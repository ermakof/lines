import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from '@src/App/initialState';
import { createGameField, updateGameField } from '@src/utils/';

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    hydrate: (state, action) => action.payload,
    setUserLevel: (state, { payload }: PayloadAction<string>) => {
      const gameFieldPercentFilled = Number(payload) * 10;
      state.userLevel = payload;
      state.gameFieldPercentFilled = gameFieldPercentFilled;
      state.gameFieldData = createGameField(state.gameFieldSize ** 2, gameFieldPercentFilled);
    },
    setGameFieldSize: (state, { payload }: PayloadAction<number>) => {
      state.gameFieldSize = payload;
      state.gameFieldData = createGameField(payload ** 2, state.gameFieldPercentFilled);
    },
    setSelectedCell: (state, { payload }: PayloadAction<number | undefined>) => {
      state.selectedCell = payload;
    },
    moveToCell: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedCell != null) {
        state.gameFieldData = updateGameField(state.gameFieldData, state.selectedCell, payload);
        state.selectedCell = undefined;
      }
    },
    initApp: (state) => {
      state.gameFieldPercentFilled = initialState.gameFieldPercentFilled;
      state.gameFieldData = createGameField(
        initialState.gameFieldSize ** 2,
        initialState.gameFieldPercentFilled
      );
    },
    resetApp: (state) => {
      const gameFieldPercentFilled = Number(state.userLevel) * 10;
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

export default appSlice;
