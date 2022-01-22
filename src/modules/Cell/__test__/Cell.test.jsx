import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import Cell from '@src/modules/Cell';
import { store } from '@src/store';

let dispatch = () => null;
let state;

describe('Cell', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    state = {
      gameFieldSize: 3,
      gameFieldData: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      gameLevel: '1',
      gameFieldPercentFilled: 100,
    };
  });

  it('renders <Cell> using renderer cell with value=2', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Cell num={2} isFilled={1} isSelected={true} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const cellContainer = screen.getByRole(/cellContainer/gi);
    expect(cellContainer).toBeInTheDocument();
    const cellContent = screen.getByRole(/cellContent-2/gi);
    expect(cellContent).toBeInTheDocument();
  });

  it('Click on cell', () => {
    render(
      <Provider store={store}>
        <Cell num={2} isFilled={1} isSelected={true} />
      </Provider>
    );
    const cellContainer = screen.getByRole(/cellContent-2/i);
    fireEvent.click(cellContainer);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(cellContainer).toHaveStyle('background: #ffff00');
  });
});
