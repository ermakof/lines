import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from '@src/App';
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

describe('App with init state', () => {
  beforeEach(() => {
    const mockStore = {
      app: appInitialState,
      auth: authInitialState,
    };
    (useSelector as jest.Mock).mockImplementation((selector) => mockSelectors(selector, mockStore));
    (useDispatch as jest.Mock).mockImplementation(jest.fn());
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  it('render snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('top panel to be in the document', () => {
    render(<App />);
    const panel = screen.getByRole(/topPanel/gi);
    expect(panel).toBeInTheDocument();
  });

  it('body panel to be in the document', () => {
    render(<App />);
    const panel = screen.getByRole(/bodyPanel/gi);
    expect(panel).toBeInTheDocument();
  });

  it('bottom panel to be in the document', () => {
    render(<App />);
    const panel = screen.getByRole(/bottomPanel/gi);
    expect(panel).toBeInTheDocument();
  });
});
