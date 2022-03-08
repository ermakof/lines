import React from 'react';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import UserStatus from '../UserStatus';

export default {
  component: UserStatus,
  decorators: [withKnobs],
  title: 'Components/UserStatus',
} as Meta;

const Template: Story = (args) => <UserStatus {...args} />;

export const WithoutAuthExample = Template.bind({});

WithoutAuthExample.args = {
  login: undefined,
};

export const WithAuthExample = Template.bind({});
WithAuthExample.args = {
  login: 'Иванов Иван',
};
