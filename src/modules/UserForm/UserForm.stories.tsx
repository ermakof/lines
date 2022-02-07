import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';

import UserForm from '@src/modules/UserForm';
import { store } from '@src/store';

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
  <Provider store={store}>
    <Router>
      <UserForm {...args} />
    </Router>
  </Provider>
);
export const Static = Template.bind({});

Static.args = {
  onSubmit: action('submitted'),
};
