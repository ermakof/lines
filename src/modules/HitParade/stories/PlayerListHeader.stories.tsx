/* eslint-disable */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Story } from '@storybook/react';

import PlayerListHeader from '@src/modules/HitParade/PlayerListHeader';

export default {
  component: PlayerListHeader,
  decorators: [withKnobs],
  title: 'Modules/HitParade',
};

const Template: Story = (args) => <div style={{
  width: '35%',
  background: '#282c34',
  color: '#fff'
}}><PlayerListHeader {...args} /></div>;

export const HeaderExample = Template.bind({});
