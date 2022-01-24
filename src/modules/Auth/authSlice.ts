import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUserProfile from '@src/modules/Auth/model/IUserProfile';

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
    login: (state, { payload }: PayloadAction<IUserProfile | undefined>) => {
      state.userProfile = payload;
    },
    logout: (state) => {
      state.userProfile = undefined;
    },
  },
});

export default authSlice;
