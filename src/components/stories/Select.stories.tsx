import React, { FC } from 'react';
import { ComponentStory } from '@storybook/react';
import Select, { ISelect } from '../Select';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  component: Select,
  decorators: [withKnobs],
  title: 'Components/Select',
} as ISelect;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Static = Template.bind({});

Static.args = {
  onSelect: action('selected'),
};

export const Dynamic: FC = () => {
  return <Select />;
};
