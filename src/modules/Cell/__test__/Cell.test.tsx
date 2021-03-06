import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

import Cell from '@src/modules/Cell';
import { TRootState } from '@src/store';

const mockStore = configureMockStore();
let store: TRootState;

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Cell', () => {
  beforeEach(() => {
    store = mockStore({
      gameFieldData: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      gameLevel: '1',
      gameFieldPercentFilled: 100,
    });
  });

  it('renders <Cell> using renderer cell with value=2', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Cell num={2} filled={1} isSelected={true} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const cellContainer = screen.getByRole(/cellContainer/gi);
    expect(cellContainer).toBeInTheDocument();
    const cellContent = screen.getByRole(/cellContent-2/gi);
    expect(cellContent).toBeInTheDocument();
  });

  it('Click on content cell', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isSelected={true} highlighted={''} filled={1} />
      </Provider>
    );
    const cellContent = screen.getByRole(/cellContent-2/i);
    fireEvent.click(cellContent);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(cellContent).toHaveStyle('background: #ff0000');
  });

  it('Highlight cell', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isSelected={true} highlighted={'#333'} filled={1} />
      </Provider>
    );
    const cellContent = screen.getByRole(/cellContent-2/i);
    expect(cellContent).toHaveStyle('background: #333');
  });

  it('Destroy cell X', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isSelected={false} highlighted="X" filled={1} />
      </Provider>
    );
    const cell = screen.getByRole(/cellDestroy-2-X/i);
    expect(cell).toHaveStyle('background: #666');
  });

  it('Destroy cell Y', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isSelected={false} highlighted="Y" filled={1} />
      </Provider>
    );
    const cell = screen.getByRole(/cellDestroy-2-Y/i);
    expect(cell).toHaveStyle('background: #666');
  });

  it('Click on container cell', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isSelected={false} filled={1} />
      </Provider>
    );
    const cellContainer = screen.getByRole(/cellContainer-2/i);
    fireEvent.click(cellContainer);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
