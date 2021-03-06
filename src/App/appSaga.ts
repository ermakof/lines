import {
  call,
  put,
  takeEvery,
  select,
  SelectEffect,
  PutEffect,
  CallEffect,
} from 'redux-saga/effects';
import { clone } from 'rambda';

import { actions as appActions, actions } from '@src/App/appSlice';
import { TRootState } from '@src/store';
import {
  addNewCellsToGameField,
  delay,
  getChainDirection,
  getHighlightedCells,
  getIndByPos,
  getOutdatedCells,
  lee,
  moveToCell,
} from '@src/utils';
import { IAppState } from '@src/App/model/IAppState';
import { PayloadAction } from '@reduxjs/toolkit';
import getOutdatedChains from '@src/utils/getOutdatedChains';
import { ICellsProps } from '@src/App/model/ICellsProps';
import removeOutdatedChains from '@src/utils/removeOutdatedChains';
import getNewCells from '@src/utils/getNewCells';
import { GAME_FIELD_SIZE } from '@src/App/initialState';
import { getAuth } from '@src/modules/Auth/authSaga';
import { IUserInfo as IUser } from '@src/modules/HitParade/models';

const LOCAL_STORAGE_APP_KEY = 'lines:app';

export function* watchRehydrate(): Generator<
  SelectEffect | PutEffect | CallEffect,
  void,
  TRootState
> {
  yield put(appActions.waitOn());
  const persistedApp = yield call([localStorage, localStorage.getItem], LOCAL_STORAGE_APP_KEY);
  if (persistedApp) {
    const dataApp = yield call([JSON, JSON.parse], persistedApp as unknown as string);
    yield put(actions.restoreGame(dataApp));
    const { userProfile } = yield select(getAuth);
    const userInfo: IUser = {
      login: userProfile.login,
      ts: userProfile.loginTime,
      score: 0,
    };
    yield put(actions.updateHitParadeInfo(userInfo));
  }
  yield put(appActions.waitOff());
}

export const getApp = (state: TRootState) => state.app;

export function* watchPersist(): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const app = yield select(getApp);
  yield call([localStorage, localStorage.setItem], LOCAL_STORAGE_APP_KEY, JSON.stringify(app));
}

/**
 * showCell
 * show target cell with props
 **/
export function* showCell(
  targetCell: number,
  props: { highlightedCells?: ICellsProps } = {}
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const { gameFieldData: gameData, selectedCell } = yield select(getApp);

  let gameFieldData = yield call(moveToCell, gameData, selectedCell, targetCell);
  yield put(appActions.updateGame({ gameFieldData, selectedCell: targetCell, ...props }));
}

/**
 * Step 0
 * show target cell as unreachable with delay
 **/
export function* step0(
  selectedCell: number,
  targetCell: number,
  time: number
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  yield* showCell(targetCell, { highlightedCells: { [targetCell]: '#00000070' } });
  yield call(delay, time);
  yield* showCell(selectedCell, { highlightedCells: undefined });
}

/**
 * moveTo
 * move cell from source to target and show it
 **/
export function* moveTo(
  p1: Array<number>,
  p2: Array<number>,
  time: number
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const { gameFieldData: gameData } = yield select(getApp);
  const from = Number(yield call(getIndByPos, p1));
  const to = Number(yield call(getIndByPos, p2));
  const gameFieldData = yield call(moveToCell, gameData, from, to);
  const highlightedCells = { [to]: '' };
  yield put(appActions.updateGame({ gameFieldData, highlightedCells }));
  yield call(delay, time);
}

/**
 * Step 1
 * move cell from selected to target and show it with delay
 **/
export function* step1(
  targetCell: number,
  route: Array<Array<number>>,
  time: number = 0
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  yield put(appActions.updateGame({ selectedCell: undefined }));
  for (let i = 1; i < route.length; i = i + 1) {
    yield* moveTo(route[i - 1], route[i], 100);
  }

  const highlightedCells = { [targetCell]: '' };
  yield put(appActions.updateGame({ highlightedCells }));
  yield call(delay, time);
}

/**
 * Step 2
 * get outdated cells and show it with delay
 **/
export function* step2(
  chains: Array<Array<number>>,
  time: number
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const direction: 'X' | 'Y' | '' = getChainDirection(chains, GAME_FIELD_SIZE);
  const highlightedCells = yield call(getOutdatedCells, chains, direction);
  yield put(appActions.updateGame({ highlightedCells }));
  yield call(delay, time);
}

/**
 * Step 3
 * remove outdated cells from game field
 **/
export function* step3(
  chains: Array<Array<number>>
): Generator<SelectEffect | PutEffect | CallEffect, void, TRootState> {
  const { gameFieldData: gameData, score: oldScore = 0, highlightedCells } = yield select(getApp);

  const gameFieldData = yield call(removeOutdatedChains, gameData, chains);
  const score = oldScore + (highlightedCells ? Object.keys(highlightedCells).length : 0);
  yield put(
    appActions.updateGame({
      gameFieldData,
      highlightedCells: undefined,
      score,
    })
  );
}

/**
 * Step 4
 * get new cells and show it on game field
 **/
export function* step4(
  time: number
): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const { gameFieldData: gameData, userLevel } = yield select(getApp);

  const newCells = yield call(getNewCells, gameData, userLevel);
  const highlightedCells = yield call(getHighlightedCells, newCells as unknown as Array<number>);
  const gameFieldData = yield call(
    addNewCellsToGameField,
    gameData as unknown as Array<number>,
    highlightedCells as unknown as ICellsProps
  );
  yield put(appActions.updateGame({ gameFieldData, highlightedCells }));
  yield call(delay, time);
}

/**
 * Step 5
 * update game field with un-highlighted new cells
 **/
export function* step5(): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  yield put(appActions.updateGame({ highlightedCells: undefined }));
}

/**
 * Step 6
 * update hit parade
 **/
export function* step6(): Generator<SelectEffect | PutEffect | CallEffect, void, TRootState> {
  const { userProfile } = yield select(getAuth);
  const { hitParade, score } = yield select(getApp);
  if (userProfile && userProfile.loginTime) {
    const newHitParade = hitParade ? clone(hitParade) : {};
    const ts = userProfile.loginTime;
    let userInfo = newHitParade[ts];
    if (!userInfo) {
      userInfo = {
        login: userProfile.login,
        ts,
        score,
      };
    } else {
      userInfo.score = score;
    }
    yield put(actions.updateHitParadeInfo(userInfo));
  }
}

export function* watchStartGameSteps({
  payload,
}: PayloadAction<number>): Generator<SelectEffect | PutEffect | CallEffect, void, IAppState> {
  const { gameFieldData: gameData, selectedCell, userLevel } = yield select(getApp);
  if (selectedCell != null && !gameData[payload]) {
    const route = yield call(lee, gameData, selectedCell, payload);
    let gameFieldData;
    if (!route) {
      yield* step0(selectedCell, payload, 250);
      return;
    } else {
      yield* step1(payload, route as unknown as Array<Array<number>>, 250);
      gameFieldData = yield call(moveToCell, gameData, selectedCell, payload);
    }
    const outdatedChains = yield call(
      getOutdatedChains,
      Number(payload),
      userLevel,
      gameFieldData as unknown as Array<number>
    );
    if (Array.isArray(outdatedChains) && outdatedChains.length) {
      yield* step2(outdatedChains, 100);
      yield* step3(outdatedChains);
      yield* step6();
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
