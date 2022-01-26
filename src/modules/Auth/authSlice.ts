import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import { IUserInfo } from '@src/modules/Auth/AuthForm';

interface IAuthState {
  userProfile: IUserProfile | undefined;
}
const initialState: IAuthState = {
  userProfile: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate: (state) => state,
    setUser: (state, { payload }: PayloadAction<IUserInfo | undefined>) => state,
    login: (state, { payload }: PayloadAction<IUserProfile | undefined>) => {
      state.userProfile = payload;
    },
    logout: (state) => {
      state.userProfile = undefined;
    },
  },
});

const { actions, reducer } = authSlice;

export { authSlice, actions, reducer };
