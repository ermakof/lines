import appSlice from '@src/App/appSlice';
import { LOCAL_STORAGE_APP_KEY, store } from '@src/store/index';

const rehydrateState = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_APP_KEY);
    if (persistedState) {
      const payload = JSON.parse(persistedState);
      store.dispatch(appSlice.actions.hydrate(payload));
    }
  } catch (e) {
    console.log(e);
  }
};

export default rehydrateState;
