import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthForm from '@src/modules/Auth/AuthForm';
import Store from '@src/store';

const dispatch = () => null;

const state = {
  gameLevel: '1',
  gameFieldSize: 4,
  gameFieldPercentFilled: 10,
  gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
};

export default {
  component: AuthForm,
  decorators: [withKnobs],
  title: 'Forms/AuthForm',
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <Store.Provider value={{ dispatch, state }}>
    <Router>
      <AuthForm {...args} />
    </Router>
  </Store.Provider>
);

export const Static = Template.bind({});

Static.args = {};
