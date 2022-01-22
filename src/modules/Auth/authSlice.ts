import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '@src/store/initialState';
import IUserProfile from '@src/modules/Auth/model/IUserProfile';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IUserProfile>) => {
      state.userProfile = payload;
    },
    logout: (state) => {
      state.userProfile = undefined;
    },
  },
});

export default authSlice;
