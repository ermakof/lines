import React from 'react';
import { render, screen } from '@testing-library/react';

import AppBody from '@src/App/AppBody';
import Store from '@src/store';
import { IAction } from '@src/model';

let dispatch: (action: IAction) => void;

describe('AppBody', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('Render <AppBody> without data', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <AppBody />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const dataMessage = screen.getByRole(/gamePanel/gi);
    expect(dataMessage).toBeInTheDocument();
  });

  it('Render <AppBody> with data', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 4,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <AppBody />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const dataList = screen.getByRole(/gamePanel/gi);
    expect(dataList).toBeInTheDocument();
    const dataItems = screen.getAllByRole(/cellContainer/gi);
    expect(dataItems.length).toBe(9);
  });
});
