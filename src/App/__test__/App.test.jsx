import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import App from '@src/App';
import initialState from '@src/App/initialState';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test('render App', () => {
  const store = mockStore(initialState);
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
  const topPanel = screen.getByRole(/topPanel/gi);
  expect(topPanel).toBeInTheDocument();
  const gamePanel = screen.getByRole(/gamePanel/gi);
  expect(gamePanel).toBeInTheDocument();
  const bottomPanel = screen.getByRole(/bottomPanel/gi);
  expect(bottomPanel).toBeInTheDocument();
});
