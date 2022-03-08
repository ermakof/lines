/* eslint-disable */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Percentage from '../Percentage';

export default {
  component: Percentage,
  decorators: [withKnobs],
  title: 'Components/Percentage',
} as Meta;

const Template: Story = (args) => <Percentage data={[]} {...args} />;

export const PercentageExample = Template.bind({});

PercentageExample.args = {
  data: [
    0, 1, 3, 0, 0, 0, 3, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 0, 0, 3, 0,
    1, 0, 3, 0, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 2, 0, 1, 0, 0
  ],
};
