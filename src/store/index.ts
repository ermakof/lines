import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from '@src/store/rootReducer';
import rehydrateState from '@src/store/rehydrateState';
import persistApp from '@src/store/persistApp';

export const LOCAL_STORAGE_APP_KEY = 'lines:app';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      ()
      // prepend and concat calls can be chained
      .concat(logger),
});

store.subscribe(() => {
  persistApp();
});

rehydrateState();

type TRootState = ReturnType<typeof store.getState>;

export { store, TRootState };
