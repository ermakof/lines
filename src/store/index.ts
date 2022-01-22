import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from '@src/store/rootReducer';

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

type TRootState = ReturnType<typeof store.getState>;

export { store, TRootState };
