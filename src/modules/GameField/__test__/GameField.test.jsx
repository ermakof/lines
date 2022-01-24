import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux';

import GameField from '../index';
import initialState from "@src/store/initialState";

const mockStore = configureMockStore();
let store;

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

  it('No render cells with gameFieldSize = 0', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      gameFieldData: [],
      gameFieldSize: 0,
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
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      gameFieldSize: 3,
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
