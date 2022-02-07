import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { watchLogout, watchRehydrate, watchSetUser } from '@src/modules/Auth/authSaga';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';

import { actions as authActions } from '@src/modules/Auth/authSlice';
import { actions as appActions } from '@src/App/appSlice';

describe('authSaga test plan', () => {
  it('Authorise success', () => {
    expect.assertions(0);
    const userInfo = { login: 'user', password: '123' };
    const userProfile = { login: 'user', password: '123', token: '123-123-123-123' };
    return expectSaga(watchSetUser, { payload: { ...userInfo } })
      .put(appActions.waitOn())
      .provide([[call(signIn, userInfo), userProfile]])
      .put(authActions.login(userProfile))
      .put(appActions.waitOff())
      .run();
  });

  it('Authorise fail', () => {
    expect.assertions(0);
    const userInfo = { login: 'user', password: '123' };
    const userProfile = undefined;
    return expectSaga(watchSetUser, { payload: userInfo })
      .put(appActions.waitOn())
      .provide([[call(signIn, userInfo), userProfile]])
      .put(appActions.waitOff())
      .run();
  });

  it('logout', () => {
    expect.assertions(0);
    return expectSaga(watchLogout)
      .put(appActions.waitOn())
      .provide([[matchers.call.fn(signOut), true]])
      .put(appActions.initApp())
      .put(appActions.waitOff())
      .run();
  });

  it('Rehydrate success', () => {
    expect.assertions(0);
    const persistedAuth = '{ login: "user", password: "123", token: "123-123-123-123" }';
    const userProfile = { login: 'user', password: '123', token: '123-123-123-123' };
    return expectSaga(watchRehydrate)
      .provide([
        [matchers.call.fn(localStorage.getItem), persistedAuth],
        [matchers.call.fn(JSON.parse), userProfile],
      ])
      .put(authActions.login(userProfile))
      .run();
  });

  it('Rehydrate fail', () => {
    expect.assertions(0);
    return expectSaga(watchRehydrate)
      .provide([[matchers.call.fn(localStorage.getItem), undefined]])
      .run();
  });
});
