import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import AppHeader from '@src/App/AppHeader';

export default {
  component: AppHeader,
  decorators: [withKnobs],
  title: 'Application/AppHeader',
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => <AppHeader {...args} />;

export const Static = Template.bind({});

Static.args = {
  onChangeFilter: action('changed'),
};
