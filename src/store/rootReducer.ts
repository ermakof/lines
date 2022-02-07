import appSlice from '@src/App/appSlice';
import authSlice from '@src/modules/Auth/authSlice';

const rootReducer: any = {
  app: appSlice.reducer,
  auth: authSlice.reducer,
};

export default rootReducer;
