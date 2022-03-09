/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { store } from '@src/store';
import AppBody from '@src/App/AppBody';
import { appSlice } from '@src/App/appSlice';
import { authSlice } from '@src/modules/Auth/authSlice';

export default {
  component: AppBody,
  decorators: [withKnobs],
  title: 'Application/AppBody',
} as ComponentMeta<typeof AppBody>;

const payload = {
  gameLevel: '2',
  gameFieldPercentFilled: 20,
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
  selectedCell: undefined,
};

store.dispatch(authSlice.actions.login({login: 'user', password: '123', token: '1-2-3'}));
store.dispatch(appSlice.actions.updateGame(payload));

const Template: ComponentStory<typeof AppBody> = (args) => (
  <Provider store={store}>
    <div style={{  background: '#282c34' }}><AppBody {...args} /></div>
  </Provider>
);

export const GameExample = Template.bind({});
