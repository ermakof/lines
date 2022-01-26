import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash.throttle';

import { rootReducer } from '@src/store/rootReducer';
import { rehydrateApp } from '@src/store/rehydrateApp';
import { persistApp } from '@src/store/persistApp';
import { rootSaga } from '@src/store/rootSaga';

export const LOCAL_STORAGE_APP_KEY = 'lines:app';
export const LOCAL_STORAGE_AUTH_KEY = 'lines:userProfile';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      ()
      // prepend and concat calls can be chained
      .concat(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(rootSaga);

store.subscribe(
  throttle(() => {
    persistApp();
  }, 1000)
);

rehydrateApp();

type TRootState = ReturnType<typeof store.getState>;

export { store, TRootState };
