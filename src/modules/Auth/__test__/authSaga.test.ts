import { call, put, takeEvery, select } from 'redux-saga/effects';
import { authSaga, watchLogout, watchRehydrate, watchSetUser } from '@src/modules/Auth/authSaga';
import { actions } from '@src/modules/Auth/authSlice';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';
import { getApp } from '@src/App/appSaga';

describe('authSlice', () => {
  it('call takeEvery 3 times', () => {
    const saga = authSaga();
    expect(saga.next().value).toEqual(takeEvery(actions.setUser.type, watchSetUser));
    expect(saga.next().value).toEqual(takeEvery(actions.logout.type, watchLogout));
    expect(saga.next().value).toEqual(takeEvery(actions.rehydrate.type, watchRehydrate));
    expect(saga.next().done).toBe(true);
  });

  it('watchRehydrate', () => {
    const saga = watchRehydrate();
    expect(saga.next().value).toEqual(
      call([localStorage, localStorage.getItem], 'lines:userProfile')
    );
    expect(saga.next().done).toBe(true);
  });

  it('watchSetUser', () => {
    const userInfo = { login: 'user', password: '123' };
    const saga = watchSetUser({ payload: userInfo, type: 'app/setUSer' });
    expect(saga.next().value).toEqual(put({ type: 'app/waitOn' }));
    expect(saga.next().value).toEqual(call(signIn, userInfo));
    expect(saga.next().value).toEqual(put({ type: 'app/waitOff' }));
    expect(saga.next().done).toBe(true);
  });

  it('watchLogout', () => {
    const saga = watchLogout({ payload: 0, type: 'auth/logout' });
    expect(saga.next().value).toEqual(put({ type: 'app/waitOn' }));
    expect(saga.next().value).toEqual(select(getApp));
    expect(saga.next({ hitParade: {} }).value).toEqual(call(signOut));
    expect(saga.next().value).toEqual(put({ type: 'app/initApp' }));
    expect(saga.next().value).toEqual(put({ type: 'app/waitOff' }));
    expect(saga.next().done).toBe(true);
  });
});
