import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState, {
  GAME_LEVEL_SETTINGS,
  INIT_GAME_FIELD_PERCENT_FILLED,
  GAME_FIELD_SIZE,
} from '@src/App/initialState';
import { createGameField } from '@src/utils/';

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    rehydrate: (state) => state,
    restoreGame: (state, action) => action.payload,
    setUserLevel: (state, { payload }: PayloadAction<string>) => {
      state.userLevel = payload;
      state.selectedCell = undefined;
      state.highlightedCells = undefined;
      state.score = 0;
      state.gameFieldPercentFilled = GAME_LEVEL_SETTINGS[payload].percent;
      state.gameFieldData = createGameField(GAME_FIELD_SIZE ** 2, state.gameFieldPercentFilled);
    },
    setSelectedCell: (state, { payload }: PayloadAction<number | undefined>) => {
      state.selectedCell = payload;
    },
    startGameSteps: (state, { payload }: PayloadAction<number>) => state,
    updateGame: (state, action) => ({ ...state, ...action.payload }),
    initApp: (state) => {
      state.gameFieldPercentFilled = INIT_GAME_FIELD_PERCENT_FILLED;
      state.gameFieldData = createGameField(GAME_FIELD_SIZE ** 2, 0);
    },
    resetApp: (state) => {
      const gameFieldPercentFilled = Number(state.userLevel) * 10;
      state.selectedCell = undefined;
      state.highlightedCells = undefined;
      state.score = 0;
      state.gameFieldPercentFilled = gameFieldPercentFilled;
      state.gameFieldData = createGameField(GAME_FIELD_SIZE ** 2, gameFieldPercentFilled);
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
