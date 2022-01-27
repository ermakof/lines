import { call, put, takeEvery, select } from 'redux-saga/effects';
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

function* watchPersist(): Generator {
  const app = yield select(({ app }) => app);
  yield call([localStorage, localStorage.setItem], LOCAL_STORAGE_APP_KEY, JSON.stringify(app));
}

export function* appSaga() {
  yield takeEvery(actions.rehydrate.type, watchRehydrate);
  yield takeEvery(actions.setUserLevel.type, watchPersist);
  yield takeEvery(actions.moveToCell.type, watchPersist);
  yield takeEvery(actions.resetApp.type, watchPersist);
}
