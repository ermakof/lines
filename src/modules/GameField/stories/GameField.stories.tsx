import React from 'react';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentStory } from '@storybook/react';

import GameField from '@src/modules/GameField';
import { store } from '@src/store';

export default {
  component: GameField,
  decorators: [withKnobs],
  title: 'Modules/GameField',
};

const state = {
  gameLevel: '3',
  gameFieldPercentFilled: 30,
  gameFieldData: [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  selectedCell: 2,
};

const Template: ComponentStory<typeof GameField> = (args) => (
  <Provider store={store}>
    <GameField {...args} />
  </Provider>
);

export const Static = Template.bind({});

Static.args = {};
