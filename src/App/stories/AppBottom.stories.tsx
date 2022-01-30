import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import AppBottom from '@src/App/AppBottom';
import { store } from '@src/store';
import { appSlice } from '@src/App/appSlice';

export default {
  component: AppBottom,
  decorators: [withKnobs],
  title: 'Application/AppBottom',
} as ComponentMeta<typeof AppBottom>;

const payload = {
  gameLevel: '1',
  gameFieldPercentFilled: 10,
  gameFieldData: [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
};

store.dispatch(appSlice.actions.rehydrate());

const Template: ComponentStory<typeof AppBottom> = (args) => (
  <Provider store={store}>
    <AppBottom {...args} />;
  </Provider>
);

export const Static = Template.bind({});

Static.args = {
  countUsers: number('num', 50),
};
