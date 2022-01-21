import React from 'react';
import Cell from '@src/modules/Cell';
import { render, screen, fireEvent } from '@testing-library/react';
import Store from '@src/store';
import { IAction, IState } from '@src/model';

let dispatch: (action: IAction) => void;
let state: IState;

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
      <Store.Provider value={{ dispatch, state }}>
        <Cell num={2} isFilled={1} isSelected={true} />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const cellContainer = screen.getByRole(/cellContainer/gi);
    expect(cellContainer).toBeInTheDocument();
    const cellContent = screen.getByRole(/cellContent-2/gi);
    expect(cellContent).toBeInTheDocument();
  });

  it('Click on cell', () => {
    render(
      <Store.Provider value={{ dispatch, state }}>
        <Cell num={2} isFilled={1} isSelected={true} />
      </Store.Provider>
    );
    const cellContainer = screen.getByRole(/cellContent-2/i);
    fireEvent.click(cellContainer);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(cellContainer).toHaveStyle('background: #ffff00');
  });
});
