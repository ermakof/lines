import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, Meta } from '@storybook/react';
import Cell from '../index';
import { withKnobs } from '@storybook/addon-knobs';
import { store } from '@src/store';

export default {
  component: Cell,
  decorators: [withKnobs],
  title: 'Modules/Cell',
} as Meta;

const Template: ComponentStory<typeof Cell> = (args) => (
  <Provider store={store}>
    <Cell {...args} />
  </Provider>
);

export const EmptyCell = Template.bind({});

export const RedCell = Template.bind({});
RedCell.args = {
  filled: 1,
};

export const YellowCell = Template.bind({});
YellowCell.args = {
  num: 1,
  filled: 2,
};

export const GreenCell = Template.bind({});
GreenCell.args = {
  filled: 3,
};

export const InaccessibleCell = Template.bind({});
InaccessibleCell.args = {
  filled: 1,
  highlighted: '#333333A0',
};

export const SelectedCell = Template.bind({});
SelectedCell.args = {
  filled: 1,
  isSelected: true,
};

export const DestroyedCellY = Template.bind({});
DestroyedCellY.args = {
  filled: 1,
  highlighted: 'Y',
};

export const DestroyedCellX = Template.bind({});
DestroyedCellX.args = {
  filled: 1,
  highlighted: 'X',
};

export const DynamicCell = Template.bind({});
DynamicCell.args = {
  num: 1,
  filled: 1,
  isSelected: true,
  isRight: true,
  isLeft: true,
  highlighted: '',
};
