/* eslint-disable */
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentStory, Story } from '@storybook/react';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

import HitParade from '@src/modules/HitParade/';
import { TRootState } from '@src/store';

export default {
  component: HitParade,
  decorators: [withKnobs],
  title: 'Modules/HitParade',
};

const MockedStateWithPlayers = {
  app: {
    hitParade: {
      1646851461537: { login: 'Игрок 1', ts: 1646851461537, score: 300 },
      1646855489093: { login: 'Игрок 2', ts: 1646855489093, score: 200 },
      1646859512749: { login: 'Игрок 3', ts: 1646859512749, score: 100 },
      1646841512749: { login: 'Игрок 4', ts: 1646841512749, score: 50 },
    },
  },
  auth: { userProfile: {login: 'Игрок 4', loginTime: 1646841512749, password: 'pwd', token: '1-2-3-4'}}
};

const MockedStateWithoutPlayers = {
  app: {},
  auth: { userProfile: {login: 'Игрок 4', loginTime: 1646841512749, password: 'pwd', token: '1-2-3-4'}}
};

interface IMockStore {
  state: TRootState;
  children: React.ReactNode;
}
const MockStore:FC<IMockStore> = ({ state, children }) => {
  const app = createSlice({
    name: 'app',
    initialState: state.app,
    reducers: {},
  }).reducer;
  const auth = createSlice({
    name: 'auth',
    initialState: state.auth,
    reducers: {},
  }).reducer;
  return <Provider
    store={ configureStore({
      reducer: combineReducers({app, auth}),
    }) }
  >
    { children }
  </Provider>
};
const Template: ComponentStory<typeof HitParade> = (args) => <HitParade {...args} />;

export const HitParadeWithoutPlayers: Story = Template.bind({});
HitParadeWithoutPlayers.decorators = [
  (story) => <MockStore state={MockedStateWithoutPlayers}>{story()}</MockStore>,
];

export const HitParadeWithPlayers: Story = Template.bind({});
HitParadeWithPlayers.decorators = [
  (story) => <MockStore state={MockedStateWithPlayers}>{story()}</MockStore>,
];
