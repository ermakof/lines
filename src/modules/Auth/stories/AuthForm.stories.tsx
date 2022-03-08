import React from 'react';
import { Provider } from 'react-redux';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthForm from '@src/modules/Auth/AuthForm';
import { store } from '@src/store';

export default {
  component: AuthForm,
  decorators: [withKnobs],
  title: 'Forms/AuthForm',
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <Router>
      <AuthForm {...args} />
    </Router>
  </Provider>
);

export const ExampleForm = Template.bind({});
