import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Store from '@src/store';
import AppBody from '@src/App/AppBody';

export default {
  component: AppBody,
  decorators: [withKnobs],
  title: 'Application/AppBody',
} as ComponentMeta<typeof AppBody>;

const state = {
  gameLevel: '1',
  gameFieldSize: 4,
  gameFieldPercentFilled: 10,
  gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
};

const dispatch = () => null;

const Template: ComponentStory<typeof AppBody> = (args) => (
  <Store.Provider value={{ dispatch, state }}>
    <AppBody {...args} />
  </Store.Provider>
);

export const Static = Template.bind({});

Static.args = {};
