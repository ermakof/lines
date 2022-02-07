import { all } from 'redux-saga/effects';
import { authSaga } from '@src/modules/Auth/authSaga';
import { appSaga } from '@src/App/appSaga';

export function* rootSaga() {
  yield all([authSaga(), appSaga()]);
}
