/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentStory } from '@storybook/react';

import GameField from '@src/modules/GameField';
import { store } from '@src/store';
import { appSlice } from '@src/App/appSlice';

export default {
  component: GameField,
  decorators: [withKnobs],
  title: 'Modules/GameField',
};

const payload = {
  gameLevel: '1',
  gameFieldPercentFilled: 30,
  gameFieldData: [
    0, 2, 0, 0, 0, 1, 1, 2, 3,
    1, 2, 0, 0, 0, 0, 2, 0, 1,
    2, 0, 3, 0, 0, 0, 0, 1, 3,
    2, 0, 2, 2, 0, 0, 0, 0, 1,
    0, 0, 1, 0, 0, 0, 2, 0, 3,
    1, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 1, 3, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 2, 0, 0,
    1, 1, 0, 2, 0, 0, 3, 0, 0,
  ],
  selectedCell: 1,
};

store.dispatch(appSlice.actions.updateGame(payload));

const Template: ComponentStory<typeof GameField> = (args) => (
  <Provider store={store}>
    <GameField {...args} />
  </Provider>
);

export const Static = Template.bind({});

Static.args = {};
