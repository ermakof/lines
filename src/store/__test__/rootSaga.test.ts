import { rootSaga } from '@src/store/rootSaga';
import { all, call } from 'redux-saga/effects';
import { authSaga } from '@src/modules/Auth/authSaga';
import { appSaga } from '@src/App/appSaga';

describe('rootSaga', () => {
  it('call root saga', () => {
    const saga = rootSaga();
    expect(saga.next().value).toEqual(all([call(authSaga), call(appSaga)]));
    expect(saga.next().done).toBe(true);
  });
});
