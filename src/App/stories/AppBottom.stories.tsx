/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import AppBottom from '@src/App/AppBottom';
import { store } from '@src/store';
import { appSlice } from '@src/App/appSlice';
import { authSlice } from '@src/modules/Auth/authSlice';

export default {
  component: AppBottom,
  decorators: [withKnobs],
  title: 'Application/AppBottom',
} as ComponentMeta<typeof AppBottom>;

const payload = {
  gameLevel: '1',
  gameFieldPercentFilled: 10,
  score: 15,
  gameFieldData: [
    0, 1, 0, 0, 0, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

store.dispatch(appSlice.actions.updateGame(payload));
store.dispatch(authSlice.actions.login({
  login: 'user',
  password: '123',
  token: '123-123-123',
}));

const Template: ComponentStory<typeof AppBottom> = (args) => (
  <Provider store={store}>
    <AppBottom {...args} />;
  </Provider>
);

export const Static = Template.bind({});

Static.args = {
  countUsers: number('num', 50),
};
