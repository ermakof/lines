/* eslint-disable */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentStory } from '@storybook/react';

import PlayerListRow from '@src/modules/HitParade/PlayerListRow';

export default {
  component: PlayerListRow,
  decorators: [withKnobs],
  title: 'Modules/HitParade',
};

const Template: ComponentStory<typeof PlayerListRow> = (args) => <div style={{
  width: '35%',
  background: '#282c34',
  color: '#fff',
}}><PlayerListRow {...args}/></div>;

export const RowExampleFirstWinner = Template.bind({});
RowExampleFirstWinner.args = {
  winner: 1,
  user: {
    login: 'Игрок 1',
    ts: 1646851461537,
    score: 300,
  },
};

export const RowExampleSecondWinner = Template.bind({});
RowExampleSecondWinner.args = {
  winner: 2,
  user: {
    login: 'Игрок 2',
    ts: 1646850461537,
    score: 200,
  },
};

export const RowExampleThirdWinner = Template.bind({});
RowExampleThirdWinner.args = {
  winner: 3,
  user: {
    login: 'Игрок 3',
    ts: 1646840461537,
    score: 100,
  },
};

export const RowExampleNoWinner = Template.bind({});
RowExampleNoWinner.args = {
  winner: 4,
  user: {
    login: 'Игрок 4',
    ts: 1646740461537,
    score: 10,
  },
};

export const RowExampleSelected = Template.bind({});
RowExampleSelected.args = {
  winner: 4,
  highlighted: true,
  user: {
    login: 'Игрок 6',
    ts: 1646700461537,
    score: 10,
  },
};
