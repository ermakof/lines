import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  appSaga,
  getApp,
  watchStartGameSteps,
  watchPersist,
  watchRehydrate,
} from '@src/App/appSaga';
import { actions } from '@src/App/appSlice';
import { IAppState } from '@src/App/model/IAppState';

describe('appSaga', () => {
  it('call takeEvery 4 times', () => {
    const saga = appSaga();
    expect(saga.next().value).toEqual(takeEvery(actions.rehydrate.type, watchRehydrate));
    expect(saga.next().value).toEqual(takeEvery(actions.setUserLevel.type, watchPersist));
    expect(saga.next().value).toEqual(takeEvery(actions.startGameSteps.type, watchStartGameSteps));
    expect(saga.next().value).toEqual(takeEvery(actions.resetApp.type, watchPersist));
    expect(saga.next().done).toBe(true);
  });

  it('watchRehydrate', () => {
    const saga = watchRehydrate();
    expect(saga.next().value).toEqual(put({ type: 'app/waitOn' }));
    expect(saga.next().value).toEqual(call([localStorage, localStorage.getItem], 'lines:app'));
    expect(saga.next().value).toEqual(put({ type: 'app/waitOff' }));
    expect(saga.next().done).toBe(true);
  });

  it('watchPersist', () => {
    const saga = watchPersist();
    expect(saga.next().value).toEqual(select(getApp));
    const persistApp =
      '{"userLevel":"1","gameFieldPercentFilled":10,"gameFieldData":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],"isLoading":true}';
    expect(saga.next(persistApp as unknown as IAppState).value).toEqual(
      call(
        [localStorage, localStorage.setItem],
        'lines:app',
        '"{\\"userLevel\\":\\"1\\",\\"gameFieldPercentFilled\\":10,\\"gameFieldData\\":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],\\"isLoading\\":true}"'
      )
    );
    expect(saga.next().done).toBe(true);
  });
});
