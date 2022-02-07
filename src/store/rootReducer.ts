import { reducer as app } from '@src/App/appSlice';
import { reducer as auth } from '@src/modules/Auth/authSlice';

export const rootReducer: any = { app, auth };
