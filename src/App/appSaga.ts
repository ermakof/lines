import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actions as appActions, actions } from '@src/App/appSlice';
import { LOCAL_STORAGE_APP_KEY, TRootState } from '@src/store';
import { delay, getOutdatedCells, moveToCell, updateGameField } from '@src/utils';
import { IAppState } from '@src/App/model/IAppState';
import { PayloadAction } from '@reduxjs/toolkit';
import getOutdatedChains from '../utils/getOutdatedChains';
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

export function* watchMoveToCell({ payload }: PayloadAction<number>): Generator {
  const app = yield select(getApp);
  const { selectedCell, gameFieldData, score, userLevel } = app as unknown as IAppState;
  if (selectedCell != null) {
    let newGameFieldData = yield call(moveToCell, gameFieldData, selectedCell, payload);
    yield put(appActions.updateGame({ gameFieldData: newGameFieldData }));
    yield call(delay, 250);
    let outdatedChains = yield call(
      getOutdatedChains,
      payload,
      userLevel,
      newGameFieldData as unknown as Array<number>
    );
    const outdatedCells = yield call(
      getOutdatedCells,
      outdatedChains as unknown as Array<Array<number>>
    );
    yield put(appActions.updateGame({ outdatedCells }));
    yield call(delay, 250);
    newGameFieldData = yield call(
      updateGameField,
      newGameFieldData as Array<number>,
      outdatedChains as Array<Array<number>>
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
