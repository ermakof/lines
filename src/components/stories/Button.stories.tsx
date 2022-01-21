import React, { FC } from 'react';
import { ComponentStory } from '@storybook/react';
import Button, { IButton } from '../Button';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  component: Button,
  decorators: [withKnobs],
  title: 'Components/Button',
} as IButton;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Static = Template.bind({});

Static.args = {
  title: 'Reset',
  onClick: action('clicked'),
};

export const Dynamic: FC = () => {
  return <Button title="Reset" />;
};
