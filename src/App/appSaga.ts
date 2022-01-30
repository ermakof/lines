import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actions as appActions, actions } from '@src/App/appSlice';
import { LOCAL_STORAGE_APP_KEY, TRootState } from '@src/store';
import { delay, moveToCell, updateGameField } from '@src/utils';
import { IAppState } from '@src/App/model/IAppState';
import { PayloadAction } from '@reduxjs/toolkit';
import getOrderedChains from '../utils/getOrderedChains';
import { IOutdatedCells } from '@src/App/model/IOutdatedCells';

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

const getOutdatedCells = (chains: Array<Array<number>>) =>
  chains.reduce((rez, chain) => {
    return chain.reduce((acc: IOutdatedCells, cur) => {
      acc[cur] = true;
      return acc;
    }, rez);
  }, {});

export function* watchMoveToCell({ payload }: PayloadAction<number>): Generator {
  const app = yield select(getApp);
  const { selectedCell, gameFieldData, score } = app as unknown as IAppState;
  if (selectedCell != null) {
    let newGameFieldData = yield call(moveToCell, gameFieldData, selectedCell, payload);
    let orderedChains = yield call(
      getOrderedChains,
      payload,
      newGameFieldData as unknown as Array<number>
    );
    const outdatedCells = yield call(
      getOutdatedCells,
      orderedChains as unknown as Array<Array<number>>
    );
    yield put(appActions.updateGame({ gameFieldData: newGameFieldData, outdatedCells }));
    yield call(delay, 500);
    newGameFieldData = yield call(
      updateGameField,
      newGameFieldData as Array<number>,
      orderedChains as Array<Array<number>>
    );
    yield put(
      appActions.updateGame({
        gameFieldData: newGameFieldData,
        outdatedCells: undefined,
        selectedCell: undefined,
        score: score + Object.keys(outdatedCells as unknown as IOutdatedCells).length,
      })
    );
  }
  yield* watchPersist();
}

export function* appSaga() {
  yield takeEvery(actions.rehydrate.type, watchRehydrate);
  yield takeEvery(actions.setUserLevel.type, watchPersist);
  yield takeEvery(actions.moveToCell.type, watchMoveToCell);
  yield takeEvery(actions.resetApp.type, watchPersist);
}
