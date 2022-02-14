/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { store } from '@src/store';
import AppBody from '@src/App/AppBody';
import { appSlice } from '@src/App/appSlice';

export default {
  component: AppBody,
  decorators: [withKnobs],
  title: 'Application/AppBody',
} as ComponentMeta<typeof AppBody>;

const payload = {
  gameLevel: '1',
  gameFieldPercentFilled: 30,
  gameFieldData: [
    0, 1, 0, 0, 0, 2, 1, 3, 3,
    1, 0, 0, 0, 0, 0, 0, 0, 1,
    2, 0, 0, 0, 0, 0, 0, 0, 1,
    2, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 3,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 1, 3, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  selectedCell: 1,
};

store.dispatch(appSlice.actions.updateGame(payload));

const Template: ComponentStory<typeof AppBody> = (args) => (
  <Provider store={store}>
    <AppBody {...args} />
  </Provider>
);

export const Static = Template.bind({});

Static.args = {};
