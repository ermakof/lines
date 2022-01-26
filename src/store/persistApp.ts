import { LOCAL_STORAGE_APP_KEY, store } from '@src/store/index';

export const persistApp = () => {
  const { app, auth } = store.getState();
  if (auth?.userProfile) {
    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(app));
  }
};
