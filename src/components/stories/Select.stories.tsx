import React from 'react';
import { Meta, Story } from '@storybook/react';
import Select from '../Select';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  component: Select,
  decorators: [withKnobs],
  title: 'Components/Select',
} as Meta;

const Template: Story = (args) => <Select {...args} />;

export const SelectLevelExample = Template.bind({});

SelectLevelExample.args = {
  onSelect: action('selected'),
  selectedLevel: '2',
  options: [
    { id: '1', name: 'Падаван' },
    { id: '2', name: 'Джедай' },
    {
      id: '3',
      name: 'Член Совета Силы',
    },
  ],
};
