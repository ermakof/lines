import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actions as appActions, actions } from '@src/App/appSlice';
import { LOCAL_STORAGE_APP_KEY, TRootState } from '@src/store';
import {
  addNewCellsToGameField,
  delay,
  getHighlightedCells,
  getIndByPos,
  getOutdatedCells,
  lee,
  moveToCell,
} from '@src/utils';
import { IAppState } from '@src/App/model/IAppState';
import { PayloadAction } from '@reduxjs/toolkit';
import getOutdatedChains from '@src/utils/getOutdatedChains';
import { IHighlightedCells } from '@src/App/model/IHighlightedCells';
import removeOutdatedChains from '@src/utils/removeOutdatedChains';
import getNewCells from '@src/utils/getNewCells';

export function* watchRehydrate(): Generator {
  yield put(appActions.waitOn());
  const persistedApp = yield call([localStorage, localStorage.getItem], LOCAL_STORAGE_APP_KEY);
  if (persistedApp) {
    const dataApp = yield call([JSON, JSON.parse], persistedApp as string);
    yield put(actions.restoreGame(dataApp));
  }
  yield put(appActions.waitOff());
}

export const getApp = (state: TRootState) => state.app;

export function* watchPersist(): Generator {
  const app = yield select(getApp);
  yield call([localStorage, localStorage.setItem], LOCAL_STORAGE_APP_KEY, JSON.stringify(app));
}

/*
 * Step 0
 * show target cell as unreachable with delay
 */
export function* step0(targetCell: number, time: number): Generator {
  const app = yield select(getApp);
  const { gameFieldData: gameData, selectedCell } = app as unknown as IAppState;

  let gameFieldData = yield call(moveToCell, gameData, selectedCell, targetCell);
  const highlightedCells = { [targetCell]: '#ff0000' };
  yield put(appActions.updateGame({ gameFieldData, highlightedCells }));
  yield call(delay, time);
  yield put(appActions.updateGame({ gameFieldData: gameData, highlightedCells: undefined }));
}

export function* moveTo(p1: Array<number>, p2: Array<number>, time: number): Generator {
  const app = yield select(getApp);
  const { gameFieldData: gameData } = app as unknown as IAppState;
  const from = getIndByPos(p1);
  const to = getIndByPos(p2);
  const gameFieldData = yield call(moveToCell, gameData, from, to);
  const highlightedCells = { [to]: '#ffff00' };
  yield put(appActions.updateGame({ gameFieldData, highlightedCells }));
  yield call(delay, time);
}

/*
 * Step 1
 * move cell from selected to target and show it with delay
 */
export function* step1(
  targetCell: number,
  route: Array<Array<number>>,
  time: number = 0
): Generator {
  const app = yield select(getApp);
  const { gameFieldData: gameData, selectedCell } = app as unknown as IAppState;

  yield put(appActions.updateGame({ selectedCell: undefined }));
  for (let i = 1; i < route.length; i = i + 1) {
    yield* moveTo(route[i - 1], route[i], 100);
  }

  const gameFieldData = yield call(moveToCell, gameData, selectedCell, targetCell);
  const highlightedCells = { [targetCell]: '#0000ff' };
  yield put(appActions.updateGame({ highlightedCells }));
  yield call(delay, time);
  return gameFieldData;
}

/*
 * Step 2
 * get outdated cells and show it with delay
 */
export function* step2(chains: Array<Array<number>>, time: number): Generator {
  const highlightedCells = yield call(getOutdatedCells, chains);
  yield put(appActions.updateGame({ highlightedCells }));
  yield call(delay, time);
}

/*
 * Step 3
 * remove outdated cells from game field
 */
export function* step3(chains: Array<Array<number>>): Generator {
  const app = yield select(getApp);
  const {
    gameFieldData: gameData,
    score: oldScore,
    highlightedCells,
  } = app as unknown as IAppState;

  const gameFieldData = yield call(removeOutdatedChains, gameData, chains);
  const score = oldScore + Object.keys(highlightedCells as unknown as IHighlightedCells).length;
  yield put(
    appActions.updateGame({
      gameFieldData,
      highlightedCells: undefined,
      selectedCell: undefined,
      score,
    })
  );
}

/*
 * Step 4
 * get new cells and show it on game field
 */
export function* step4(time: number): Generator {
  const app = yield select(getApp);
  const { gameFieldData: gameData, userLevel } = app as unknown as IAppState;

  const newCells = yield call(getNewCells, gameData, userLevel);
  const cells = yield getHighlightedCells(newCells as Array<number>);
  const highlightedCells = cells as IHighlightedCells;
  const gameFieldData = yield addNewCellsToGameField(gameData, highlightedCells);
  yield put(appActions.updateGame({ gameFieldData, highlightedCells }));
  yield call(delay, time);
  return highlightedCells;
}

/*
 * Step 5
 * update game field with un-highlighted new cells
 */
export function* step5(): Generator {
  yield put(appActions.updateGame({ highlightedCells: undefined }));
}

export function* watchStartGameSteps({ payload }: PayloadAction<number>): Generator {
  const app = yield select(getApp);
  const { gameFieldData: gameData, selectedCell, userLevel } = app as unknown as IAppState;
  if (selectedCell != null) {
    const route = yield call(lee, gameData, selectedCell, payload);
    let gameFieldData;
    if (!route) {
      yield* step0(payload, 250);
      return;
    } else {
      gameFieldData = yield* step1(payload, route as unknown as Array<Array<number>>, 250);
    }
    const outdatedChains = yield call(getOutdatedChains, payload, userLevel, gameFieldData);
    if (Array.isArray(outdatedChains) && outdatedChains.length) {
      yield* step2(outdatedChains, 250);
      yield* step3(outdatedChains);
    } else {
      yield* step4(250);
      yield* step5();
    }
    yield* watchPersist();
  }
}

export function* appSaga() {
  yield takeEvery(actions.rehydrate.type, watchRehydrate);
  yield takeEvery(actions.setUserLevel.type, watchPersist);
  yield takeEvery(actions.startGameSteps.type, watchStartGameSteps);
  yield takeEvery(actions.resetApp.type, watchPersist);
}
