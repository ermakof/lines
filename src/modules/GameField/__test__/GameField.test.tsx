import React from 'react';
import GameField from '../index';
import { render, screen } from '@testing-library/react';
import Store from '@src/store';
import { IAction, IState } from '@src/model';

let dispatch: (action: IAction) => void;
let state: IState;

describe('GameField', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  });

  it('No render cells with gameFieldSize = 0', () => {
    state.gameFieldSize = 0;
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <GameField />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const message = screen.getByRole(/^noDataMessage$/gi);
    expect(message).toBeInTheDocument();
  });

  it('renders 9 cells from data:[9 items]', () => {
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <GameField />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const cellsGrid = screen.getByRole(/cellsGrid/gi);
    expect(cellsGrid).toBeInTheDocument();
    const cellContainer = screen.getAllByRole(/cellContainer/gi);
    expect(cellContainer.length).toBe(5);
  });
});
