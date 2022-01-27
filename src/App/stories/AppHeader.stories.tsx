import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import AppHeader from '@src/App/AppHeader';
import { store } from '@src/store';
import { authSlice } from '@src/modules/Auth/authSlice';

export default {
  component: AppHeader,
  decorators: [withKnobs],
  title: 'Application/AppHeader',
} as ComponentMeta<typeof AppHeader>;

store.dispatch(
  authSlice.actions.login({
    login: 'user',
    password: '123',
    token: '123-123-123-123',
  })
);

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <Provider store={store}>
    <AppHeader {...args} />;
  </Provider>
);

export const Static = Template.bind({});

Static.args = {
  onChangeFilter: action('changed'),
};
