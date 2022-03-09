import React from 'react';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import UserInfo from '../UserInfo/index';

export default {
  component: UserInfo,
  decorators: [withKnobs],
  title: 'Components/UserInfo',
} as Meta;

const Template: Story = (args) => <UserInfo {...args} />;

export const WithoutAuthExample = Template.bind({});

WithoutAuthExample.args = {
  login: undefined,
};

export const WithAuthExample = Template.bind({});
WithAuthExample.args = {
  login: 'Иванов Иван',
};
