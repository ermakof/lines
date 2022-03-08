/* eslint-disable */
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Story, Meta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

import AppHeader from '@src/App/AppHeader';
import { TRootState } from '@src/store';

export default {
  component: AppHeader,
  decorators: [withKnobs],
  title: 'Application/AppHeader',
} as Meta;

const MockedStateInit = {
  auth: {
    userProfile: undefined,
  },
  app: {
    gameLevel: '',
    gameFieldPercentFilled: 0,
    score: 0,
    gameFieldData: [],
  }
};

const MockedStateAuthorized = {
  auth: {
    userProfile: {
      login: 'user',
      password: '123',
      token: '123-123-123',
    }
  },
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
      0, 1, 3, 0, 0, 0, 3, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 3, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 0, 0, 3, 0,
      1, 0, 3, 0, 3, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 2, 0, 1, 0, 0
    ],
  }
};

interface IMockStore {
  state: TRootState;
  children: React.ReactNode;
}
const MockStore:FC<IMockStore> = ({ state, children }) => {
  const auth = createSlice({
    name: 'auth',
    initialState: state.auth,
    reducers: {},
  }).reducer;
  const app = createSlice({
    name: 'app',
    initialState: state.app,
    reducers: {},
  }).reducer;
  return <Provider
    store={ configureStore({
      reducer: combineReducers({auth, app}),
    }) }
  >
    { children }
  </Provider>
};

const Template = () => <AppHeader />;

export const WithAuthorized: Story = Template.bind({});
WithAuthorized.decorators = [
  (story) => <MockStore state={MockedStateAuthorized}>{story()}</MockStore>,
];

export const WithoutAuthorized: Story = Template.bind({});
WithoutAuthorized.decorators = [
  (story) => <MockStore state={MockedStateInit}>{story()}</MockStore>,
];
