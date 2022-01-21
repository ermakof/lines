import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';

import UserForm from '@src/modules/UserForm';
import Store from '@src/store';

const dispatch = () => null;

const state = {
  gameLevel: '1',
  gameFieldSize: 4,
  gameFieldPercentFilled: 10,
  gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
};

export default {
  component: UserForm,
  decorators: [withKnobs],
  title: 'Forms/UserForm',
} as ComponentMeta<typeof UserForm>;

const Template: ComponentStory<typeof UserForm> = (args) => (
  <Store.Provider value={{ dispatch, state }}>
    <Router>
      <UserForm {...args} />
    </Router>
  </Store.Provider>
);
export const Static = Template.bind({});

Static.args = {
  onSubmit: action('submitted'),
};
