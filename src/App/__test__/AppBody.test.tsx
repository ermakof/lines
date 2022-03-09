import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';

import AppBody from '@src/App/AppBody';
import appInitialState from '@src/App/initialState';
import authInitialState from '@src/modules/Auth/initialState';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockSelectors = (selector: any, store: any) => {
  return selector(store);
};

describe('AppBody', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(jest.fn());
  });

  it('Render <AppBody> without data', () => {
    const mockStore = {
      app: appInitialState,
      auth: authInitialState,
    };
    (useSelector as jest.Mock).mockImplementation((selector) => mockSelectors(selector, mockStore));
    const { asFragment } = render(<AppBody />);
    expect(asFragment()).toMatchSnapshot();
    const dataMessage = screen.getByRole(/bodyPanel/gi);
    expect(dataMessage).toBeInTheDocument();
  });

  it('Render <AppBody> with data', () => {
    const mockStore = {
      app: {
        gameLevel: '1',
        gameFieldPercentFilled: 10,
        gameFieldData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      auth: authInitialState,
    };
    (useSelector as jest.Mock).mockImplementation((selector) => mockSelectors(selector, mockStore));
    const { asFragment } = render(<AppBody />);
    expect(asFragment()).toMatchSnapshot();
    const dataList = screen.getByRole(/bodyPanel/gi);
    expect(dataList).toBeInTheDocument();
    const dataItems = screen.getAllByRole(/cellContainer/gi);
    expect(dataItems.length).toBe(9);
  });
});
