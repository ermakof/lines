import { call, put, takeEvery } from 'redux-saga/effects';
import { actions as authActions } from '@src/modules/Auth/authSlice';
import { actions as appActions } from '@src/App/appSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';
import { IUserInfo } from '@src/modules/Auth/AuthForm';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import { LOCAL_STORAGE_AUTH_KEY } from '@src/store';

function* watchSetUser({ payload }: PayloadAction<IUserInfo>): Generator {
  yield put(appActions.waitOn());
  let userProfile = yield call(signIn, payload);
  yield put(authActions.login(userProfile as IUserProfile));
  yield put(appActions.resetApp());
  yield put(appActions.waitOff());
}

function* watchLogout(): Generator {
  yield put(appActions.waitOn());
  yield call(signOut);
  yield put(appActions.initApp());
  yield put(appActions.waitOff());
}

function* watchRehydrate(): Generator {
  const persistedAuth = yield call([localStorage, localStorage.getItem], LOCAL_STORAGE_AUTH_KEY);
  if (persistedAuth) {
    const userProfile = JSON.parse(persistedAuth as string);
    yield put(authActions.login(userProfile as IUserProfile));
  }
}

export function* authSaga() {
  yield takeEvery(authActions.setUser.type, watchSetUser);
  yield takeEvery(authActions.logout.type, watchLogout);
  yield takeEvery(authActions.rehydrate.type, watchRehydrate);
}
