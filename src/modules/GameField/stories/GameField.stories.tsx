/* eslint-disable */
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import { ComponentStory, Story } from '@storybook/react';

import GameField from '@src/modules/GameField';
import { TRootState } from '@src/store';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

export default {
  component: GameField,
  decorators: [withKnobs],
  title: 'Modules/GameField',
};

const MockedStateWithoutSelected = {
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
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
  }
};

const MockedStateWithSelected = {
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
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
    selectedCell: 1,
  }
};

const MockedStateWithHighlighted = {
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
      0, 1, 3, 0, 0, 0, 3, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 3, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 0, 0, 3, 0,
      1, 0, 3, 0, 3, 3, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 2, 0, 1, 0, 0
    ],
    highlightedCells: {
      1: '#00000070',
    }
  }
};

const MockedStateWithDestroyedY = {
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
      0, 1, 3, 0, 0, 0, 3, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 3, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 0, 0, 3, 0,
      1, 0, 3, 3, 3, 3, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 2, 0, 1, 0, 0
    ],
    highlightedCells: {
      38: 'Y',
      39: 'Y',
      40: 'Y',
      41: 'Y',
    }
  }
};

const MockedStateWithDestroyedX = {
  app: {
    gameLevel: '2',
    gameFieldPercentFilled: 20,
    score: 150,
    gameFieldData: [
      0, 1, 3, 0, 0, 0, 3, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0,
      1, 3, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 2, 0, 0, 3, 0,
      1, 0, 3, 3, 3, 3, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 2, 0, 1, 0, 0
    ],
    highlightedCells: {
      18: 'X',
      27: 'X',
      36: 'X',
      45: 'X',
      54: 'X',
    }
  }
};

interface IMockStore {
  state: TRootState;
  children: React.ReactNode;
}
const MockStore:FC<IMockStore> = ({ state, children }) => {
  const app = createSlice({
    name: 'app',
    initialState: state.app,
    reducers: {},
  }).reducer;
  return <Provider
    store={ configureStore({
      reducer: combineReducers({app}),
    }) }
  >
    { children }
  </Provider>
};
const Template: ComponentStory<typeof GameField> = (args) => <GameField {...args} />;

export const GameFieldWithoutSelected: Story = Template.bind({});
GameFieldWithoutSelected.decorators = [
  (story) => <MockStore state={MockedStateWithoutSelected}>{story()}</MockStore>,
];

export const GameFieldWithSelected: Story = Template.bind({});
GameFieldWithSelected.decorators = [
  (story) => <MockStore state={MockedStateWithSelected}>{story()}</MockStore>,
];

export const GameFieldWithInaccessible: Story = Template.bind({});
GameFieldWithInaccessible.decorators = [
  (story) => <MockStore state={MockedStateWithHighlighted}>{story()}</MockStore>,
];

export const GameFieldWithDestroyedY: Story = Template.bind({});
GameFieldWithDestroyedY.decorators = [
  (story) => <MockStore state={MockedStateWithDestroyedY}>{story()}</MockStore>,
];

export const GameFieldWithDestroyedX: Story = Template.bind({});
GameFieldWithDestroyedX.decorators = [
  (story) => <MockStore state={MockedStateWithDestroyedX}>{story()}</MockStore>,
];
