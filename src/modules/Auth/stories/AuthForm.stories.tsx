import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthForm from '@src/modules/Auth/AuthForm';
import { store } from '@src/store';

export default {
  component: AuthForm,
  decorators: [withKnobs],
  title: 'Forms/AuthForm',
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <Provider store={store}>
    <Router>
      <AuthForm {...args} />
    </Router>
  </Provider>
);

export const Static = Template.bind({});

Static.args = {};
