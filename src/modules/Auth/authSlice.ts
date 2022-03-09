import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import { IUserInfo } from '@src/modules/Auth/AuthForm';
import initialState from '@src/modules/Auth/initialState';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate: (state) => state,
    setUser: (state, { payload }: PayloadAction<IUserInfo | undefined>) => state,
    login: (state, { payload }: PayloadAction<IUserProfile | undefined>) => {
      state.userProfile = payload;
    },
    logout: (state, { payload }: PayloadAction<number | undefined>) => {
      state.userProfile = undefined;
    },
  },
});

const { actions, reducer } = authSlice;

export { authSlice, actions, reducer };
