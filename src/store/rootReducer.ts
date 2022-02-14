import { reducer as app } from '@src/App/appSlice';
import { reducer as auth } from '@src/modules/Auth/authSlice';
import { ReducersMapObject } from '@reduxjs/toolkit';

export const rootReducer: ReducersMapObject = { app, auth };
