import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import AppBottom from '@src/App/AppBottom';
import { store } from '@src/store';
import { IAction } from '@src/model';

let dispatch: (action: IAction) => void;

describe('AppBottom', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('Render <AppBottom> without data', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const { asFragment } = render(
      <Provider store={store}>
        <AppBottom />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const dataMessage = screen.getByText(/Результат/gi);
    expect(dataMessage).toBeInTheDocument();
    const percentMessage = screen.getByText(/Процент заполнения/gi);
    expect(percentMessage).toBeInTheDocument();
  });
});
