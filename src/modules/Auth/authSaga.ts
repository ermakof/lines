import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeEvery,
} from 'redux-saga/effects';
import { actions as authActions } from '@src/modules/Auth/authSlice';
import { actions as appActions } from '@src/App/appSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';
import { IUserInfo } from '@src/modules/Auth/AuthForm';
import { TRootState } from '@src/store';
import { getApp } from '@src/App/appSaga';

export const getAuth = (state: TRootState) => state.auth;

export function* watchSetUser({
  payload,
}: PayloadAction<IUserInfo>): Generator<SelectEffect | PutEffect | CallEffect, void, TRootState> {
  yield put(appActions.waitOn());
  let userProfile = yield call(signIn, payload);
  if (userProfile) {
    yield put(authActions.login(userProfile));
    yield put(appActions.resetApp());
  }
  yield put(appActions.waitOff());
}

export function* watchLogout({
  payload,
}: PayloadAction<number>): Generator<SelectEffect | PutEffect | CallEffect, void, TRootState> {
  yield put(appActions.waitOn());
  const { hitParade } = yield select(getApp);
  if (hitParade && payload && !hitParade[payload].score) {
    yield put(appActions.deleteUserFromHitParade(payload));
  }
  yield call(signOut);
  yield put(appActions.initApp());
  yield put(appActions.waitOff());
}

export function* watchRehydrate(): Generator<PutEffect | CallEffect, void, TRootState> {
  const persistedAuth = yield call([localStorage, localStorage.getItem], 'lines:userProfile');
  if (persistedAuth) {
    const userProfile = yield call([JSON, JSON.parse], persistedAuth);
    yield put(authActions.login(userProfile));
  }
}

export function* authSaga() {
  yield takeEvery(authActions.setUser.type, watchSetUser);
  yield takeEvery(authActions.logout.type, watchLogout);
  yield takeEvery(authActions.rehydrate.type, watchRehydrate);
}
