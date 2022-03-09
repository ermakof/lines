import React from 'react';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import GameTitle from '../GameTitle';

export default {
  component: GameTitle,
  decorators: [withKnobs],
  title: 'Components/GameTitle',
} as Meta;

const Template: Story = (args) => <GameTitle {...args} />;

export const GameTitleExample = Template.bind({});
