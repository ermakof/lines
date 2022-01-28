import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { watchRehydrate } from '@src/App/appSaga';

import { actions as appActions } from '@src/App/appSlice';

describe('appSaga test plan', () => {
  it('Rehydrate success', () => {
    expect.assertions(0);
    const persistedApp =
      '{"userLevel":"1","gameFieldSize":4,"gameFieldPercentFilled":10,"gameFieldData":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],"isLoading":true}';
    const dataApp = {
      userLevel: '1',
      gameFieldSize: 4,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      isLoading: false,
    };
    return expectSaga(watchRehydrate)
      .put(appActions.waitOn())
      .provide([
        [matchers.call.fn(localStorage.getItem), persistedApp],
        [matchers.call.fn(JSON.parse), dataApp],
      ])
      .put(appActions.restoreGame(dataApp))
      .put(appActions.waitOff())
      .run();
  });

  it('Rehydrate fail', () => {
    expect.assertions(0);
    return expectSaga(watchRehydrate)
      .put(appActions.waitOn())
      .provide([[matchers.call.fn(localStorage.getItem), undefined]])
      .put(appActions.waitOff())
      .run();
  });
});
