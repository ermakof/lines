import { IAction, IState } from '@src/model';
import GameFieldActions from '@src/modules/GameField/actionType';
import CellActions from '@src/modules/Cell/actionType';
import AppActions from '@src/App/actionType';
import initialState from '@src/initialState';
import createGameField from '@src/utils/createGameField';

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case GameFieldActions.SET_SIZE: {
      const { gameFieldSize = initialState.gameFieldSize } = action.payload || {};
      return {
        ...state,
        gameFieldSize: gameFieldSize,
        gameFieldData: createGameField(gameFieldSize ** 2),
      };
    }

    case CellActions.SET_SELECTED: {
      const { selectedCell = undefined } = action.payload || {};
      return {
        ...state,
        selectedCell,
      };
    }

    case AppActions.RESET: {
      const gameFieldPercentFilled = parseInt(state.gameLevel, 10) * 10;
      return {
        ...state,
        gameFieldPercentFilled,
        gameFieldData: createGameField(state.gameFieldSize ** 2, gameFieldPercentFilled),
      };
    }

    case AppActions.SET_LEVEL: {
      const { gameLevel = initialState.gameLevel } = action.payload || {};
      const gameFieldPercentFilled = parseInt(gameLevel, 10) * 10;
      return {
        ...state,
        gameLevel,
        gameFieldPercentFilled,
        gameFieldData: createGameField(state.gameFieldSize ** 2, gameFieldPercentFilled),
      };
    }

    case AppActions.LOGIN: {
      const { userProfile = null } = action.payload || {};
      return {
        ...state,
        userProfile: { ...userProfile },
      };
    }

    case AppActions.LOGOUT: {
      return {
        ...state,
        userProfile: null,
      };
    }

    case AppActions.CLEAR_GAME_FIELD: {
      const gameFieldPercentFilled = 0;
      return {
        ...state,
        gameFieldPercentFilled,
        gameFieldData: createGameField(state.gameFieldSize ** 2, gameFieldPercentFilled),
      };
    }

    case AppActions.WAIT_ON: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AppActions.WAIT_OFF: {
      return {
        ...state,
        isLoading: false,
      };
    }
  }
};

export default reducer;
