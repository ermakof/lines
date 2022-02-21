import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux';

import GameField from '../index';
import initialState from '@src/App/initialState';
import { TRootState } from '@src/store';

const mockStore = configureMockStore();
let store: TRootState;

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('GameField', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('No render cells, game field size = 0', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockReturnValue({
      gameFieldData: [],
    });
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
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockReturnValue({
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    });
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
