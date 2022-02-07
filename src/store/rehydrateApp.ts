import { actions } from '@src/modules/Auth/authSlice';
import { store } from '@src/store/index';

export const rehydrateApp = () => {
  store.dispatch(actions.rehydrate());
};
