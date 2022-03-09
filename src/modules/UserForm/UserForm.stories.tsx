/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, Meta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import FormControls from '@src/modules/UserForm/FormControls';
import { store } from '@src/store';
import { appSlice } from '@src/App/appSlice';

const payload = {
  gameLevel: '2',
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

export default {
  component: FormControls,
  decorators: [withKnobs],
  title: 'Forms/FormControls',
} as Meta;

export const ExampleControls: ComponentStory<typeof FormControls> = (args) => (
  <Provider store={store}>
    <FormControls {...args} />
  </Provider>
);

