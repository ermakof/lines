import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from '@src/App';
import { store } from '@src/store';

test('render App', () => {
  const state = {
    gameLevel: '1',
    gameFieldSize: 3,
    gameFieldPercentFilled: 10,
    gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const dispatch = jest.fn();
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
