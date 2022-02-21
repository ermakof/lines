import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import AppBody from '@src/App/AppBody';
import initialState from '@src/App/initialState';
import { TRootState } from '@src/store';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

let store: TRootState;
let mockDispatch;

describe('AppBody', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('Render <AppBody> without data', () => {
    (useSelector as jest.Mock).mockReturnValue(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <AppBody />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const dataMessage = screen.getByRole(/gamePanel/gi);
    expect(dataMessage).toBeInTheDocument();
  });

  it('Render <AppBody> with data', () => {
    (useSelector as jest.Mock).mockReturnValue({
      gameLevel: '1',
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
    const { asFragment } = render(
      <Provider store={store}>
        <AppBody />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const dataList = screen.getByRole(/gamePanel/gi);
    expect(dataList).toBeInTheDocument();
    const dataItems = screen.getAllByRole(/cellContainer/gi);
    expect(dataItems.length).toBe(9);
  });
});
