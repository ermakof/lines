import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '@src/App';
import Store from '@src/store';

test('render App', () => {
  const state = {
    gameLevel: '1',
    gameFieldSize: 3,
    gameFieldPercentFilled: 10,
    gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const dispatch = jest.fn();
  const { asFragment } = render(
    <Store.Provider value={{ dispatch, state }}>
      <App />
    </Store.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
  const topPanel = screen.getByRole(/topPanel/gi);
  expect(topPanel).toBeInTheDocument();
  const gamePanel = screen.getByRole(/gamePanel/gi);
  expect(gamePanel).toBeInTheDocument();
  const bottomPanel = screen.getByRole(/bottomPanel/gi);
  expect(bottomPanel).toBeInTheDocument();
});
