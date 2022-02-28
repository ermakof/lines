import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '@src/store/rootReducer';
import { rootSaga } from '@src/store/rootSaga';
import { actions } from '@src/modules/Auth/authSlice';

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

store.dispatch(actions.rehydrate());

type TRootState = ReturnType<typeof store.getState>;

export { store, TRootState };
