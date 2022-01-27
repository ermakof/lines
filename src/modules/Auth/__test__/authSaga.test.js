import { call, put, takeEvery } from 'redux-saga/effects';
import { authSaga, watchLogout, watchRehydrate, watchSetUser } from '@src/modules/Auth/authSaga';
import { actions } from '@src/modules/Auth/authSlice';
import { LOCAL_STORAGE_AUTH_KEY } from '@src/store';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';

describe('authSlice', () => {
  it('call takeEvery 3 times', () => {
    const saga = authSaga();
    expect(saga.next().value).toEqual(takeEvery(actions.setUser.type, watchSetUser));
    expect(saga.next().value).toEqual(takeEvery(actions.logout.type, watchLogout));
    expect(saga.next().value).toEqual(takeEvery(actions.rehydrate.type, watchRehydrate));
    expect(saga.next().done).toBe(true);
  });

  it('watchRehydrate - with data', () => {
    const saga = watchRehydrate();
    expect(saga.next().value).toEqual(
      call([localStorage, localStorage.getItem], LOCAL_STORAGE_AUTH_KEY)
    );
    const persistedProfile =
      '{"login":"user","password":"123","token":"5ca6c554-4c6f-4baf-b011-f33a87136533"}';
    expect(saga.next(persistedProfile).value).toEqual(
      put({
        type: 'auth/login',
        payload: { login: 'user', password: '123', token: '5ca6c554-4c6f-4baf-b011-f33a87136533' },
      })
    );
    expect(saga.next().done).toBe(true);
  });

  it('watchSetUser', () => {
    const userInfo = { payload: { login: 'user', password: '123' } };
    const saga = watchSetUser(userInfo);
    expect(saga.next().value).toEqual(put({ type: 'app/waitOn' }));
    const userProfile = {
      login: 'ermaboa',
      password: '123',
      token: '5ca6c554-4c6f-4baf-b011-f33a87136533',
    };
    expect(saga.next(userProfile).value).toEqual(call(signIn, userInfo.payload));
    expect(saga.next().value).toEqual(put({ type: 'auth/login' }));
    expect(saga.next().value).toEqual(put({ type: 'app/resetApp' }));
    expect(saga.next().value).toEqual(put({ type: 'app/waitOff' }));
    expect(saga.next().done).toBe(true);
  });

  it('watchLogout', () => {
    const saga = watchLogout();
    expect(saga.next().value).toEqual(put({ type: 'app/waitOn' }));
    expect(saga.next().value).toEqual(call(signOut));
    expect(saga.next().value).toEqual(put({ type: 'app/initApp' }));
    expect(saga.next().value).toEqual(put({ type: 'app/waitOff' }));
    expect(saga.next().done).toBe(true);
  });
});
