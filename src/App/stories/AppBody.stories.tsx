import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { store } from '@src/store';
import AppBody from '@src/App/AppBody';
import { appSlice } from '@src/App/appSlice';

export default {
  component: AppBody,
  decorators: [withKnobs],
  title: 'Application/AppBody',
} as ComponentMeta<typeof AppBody>;

store.dispatch(appSlice.actions.rehydrate());

const Template: ComponentStory<typeof AppBody> = (args) => (
  <Provider store={store}>
    <AppBody {...args} />
  </Provider>
);

export const Static = Template.bind({});

Static.args = {};
