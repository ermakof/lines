import { call, put, takeEvery } from 'redux-saga/effects';
import { actions as appActions, actions } from '@src/App/appSlice';
import { LOCAL_STORAGE_APP_KEY } from '@src/store';

function* watchRehydrate(): Generator {
  yield put(appActions.waitOn());
  const persistedApp = yield call([localStorage, localStorage.getItem], LOCAL_STORAGE_APP_KEY);
  if (persistedApp) {
    const dataApp = JSON.parse(persistedApp as string);
    yield put(actions.restoreGame(dataApp));
  }
  yield put(appActions.waitOff());
}

export function* appSaga() {
  yield takeEvery(actions.rehydrate.type, watchRehydrate);
}
