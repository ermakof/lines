import React from 'react';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Score from '../Score';

export default {
  component: Score,
  decorators: [withKnobs],
  title: 'Components/Score',
} as Meta;

const Template: Story = (args) => <Score {...args} />;

export const ScoreExample = Template.bind({});

ScoreExample.args = {
  value: 10,
};
