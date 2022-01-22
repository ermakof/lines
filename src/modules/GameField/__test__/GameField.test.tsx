import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { store } from '@src/store';
import { IAction, IState } from '@src/model';
import GameField from '../index';

let dispatch: (action: IAction) => void;
let state: IState;

describe('GameField', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    state = {
      userLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  });

  it('No render cells with gameFieldSize = 0', () => {
    state.gameFieldSize = 0;
    const { asFragment } = render(
      <Provider store={store}>
        <GameField />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const message = screen.getByRole(/^noDataMessage$/gi);
    expect(message).toBeInTheDocument();
  });

  it('renders 9 cells from data:[9 items]', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <GameField />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const cellsGrid = screen.getByRole(/cellsGrid/gi);
    expect(cellsGrid).toBeInTheDocument();
    const cellContainer = screen.getAllByRole(/cellContainer/gi);
    expect(cellContainer.length).toBe(5);
  });
});
