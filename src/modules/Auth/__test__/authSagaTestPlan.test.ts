/* eslint-disable */
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { combineReducers } from '@reduxjs/toolkit';

import { watchLogout, watchRehydrate, watchSetUser } from '@src/modules/Auth/authSaga';
import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';

import { actions as authActions } from '@src/modules/Auth/authSlice';
import { actions as appActions, reducer } from '@src/App/appSlice';

describe('authSaga test plan', () => {
  it('Authorise success', () => {
    expect.assertions(0);
    const userInfo = { login: 'user', password: '123' };
    const userProfile = { login: 'user', password: '123', token: '123-123-123-123' };
    return expectSaga(watchSetUser, { payload: { ...userInfo }, type: '' })
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
    return expectSaga(watchSetUser, { payload: userInfo, type: 'auth/setUser' })
      .put(appActions.waitOn())
      .provide([[call(signIn, userInfo), userProfile]])
      .put(appActions.waitOff())
      .run();
  });

  it('logout without hit parade => do not update hit parade', () => {
    expect.assertions(0);
    return expectSaga(watchLogout, { payload: 0, type: 'auth/logout' })
      .withReducer(
        combineReducers({
          app: reducer,
        }),
        {
          app: {
            gameFieldData: [],
            hitParade: undefined,
          },
        }
      )
      .put(appActions.waitOn())
      .provide([[matchers.call.fn(signOut), true]])
      .put(appActions.initApp())
      .put(appActions.waitOff())
      .hasFinalState({
        app: {
          gameFieldData: [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
          ],
          isLoading: false,
          gameFieldPercentFilled: 0,
          userLevel: '1',
          score: 0,
          hitParade: undefined,
        },
      })
      .run();
  });

  it('logout with user score 0 => update hit parade', () => {
    expect.assertions(0);
    return expectSaga(watchLogout, { payload: 123, type: 'auth/logout' })
      .withReducer(
        combineReducers({
          app: reducer,
        }),
        {
          app: {
            gameFieldData: [],
            hitParade: {
              123: { ts: 123, login: 'user1', score: 0 },
              456: { ts: 456, login: 'user2', score: 200 },
            },
          },
        }
      )
      .put(appActions.waitOn())
      .provide([[matchers.call.fn(signOut), true]])
      .put(appActions.deleteUserFromHitParade(123))
      .put(appActions.initApp())
      .put(appActions.waitOff())
      .hasFinalState({
        app: {
          gameFieldData: [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
          ],
          isLoading: false,
          gameFieldPercentFilled: 0,
          userLevel: '1',
          score: 0,
          hitParade: {
            456: { ts: 456, login: 'user2', score: 200 },
          },
        },
      })
      .run();
  });

  it('logout with user score > 0 => do not update hit parade', () => {
    expect.assertions(0);
    return expectSaga(watchLogout, { payload: 123, type: 'auth/logout' })
      .withReducer(
        combineReducers({
          app: reducer,
        }),
        {
          app: {
            gameFieldData: [],
            hitParade: {
              123: { ts: 123, login: 'user1', score: 100 },
              456: { ts: 456, login: 'user2', score: 200 },
            },
          },
        }
      )
      .put(appActions.waitOn())
      .provide([[matchers.call.fn(signOut), true]])
      .put(appActions.initApp())
      .put(appActions.waitOff())
      .hasFinalState({
        app: {
          gameFieldData: [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
          ],
          isLoading: false,
          gameFieldPercentFilled: 0,
          userLevel: '1',
          score: 0,
          hitParade: {
            123: { ts: 123, login: 'user1', score: 100 },
            456: { ts: 456, login: 'user2', score: 200 },
          },
        },
      })
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
