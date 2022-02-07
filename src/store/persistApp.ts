import { LOCAL_STORAGE_APP_KEY, store } from '@src/store/index';

const persistApp = () => {
  const app = store.getState().app;
  localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(app));
};

export default persistApp;
