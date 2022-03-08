import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '../Button';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  component: Button,
  decorators: [withKnobs],
  title: 'Components/Button',
} as Meta;

const Template: Story = (args) => <Button {...args} />;

export const ResetExample = Template.bind({});
ResetExample.args = {
  title: 'Сброс',
  onClick: action('clicked'),
  role: 'buttonReset',
};

export const LogoutExample = Template.bind({});
LogoutExample.args = {
  title: 'Выйти',
  onClick: action('clicked'),
  role: 'buttonLogout',
};
