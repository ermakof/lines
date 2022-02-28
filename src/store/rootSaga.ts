import { all, call } from 'redux-saga/effects';
import { authSaga } from '@src/modules/Auth/authSaga';
import { appSaga } from '@src/App/appSaga';

export function* rootSaga() {
  yield all([call(authSaga), call(appSaga)]);
}
