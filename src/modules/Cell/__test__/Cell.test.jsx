import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

import Cell from '@src/modules/Cell';

const mockStore = configureMockStore();
let store;

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
        <Cell num={2} isFilled={1} isSelected={true} isOutdated={false} />
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
    useDispatch.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isFilled={1} isSelected={true} isOutdated={false} />
      </Provider>
    );
    const cellContent = screen.getByRole(/cellContent-2/i);
    fireEvent.click(cellContent);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(cellContent).toHaveStyle('background: #ffff00');
  });

  it('Click on container cell', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell num={2} isFilled={1} isSelected={false} isOutdated={false} />
      </Provider>
    );
    const cellContainer = screen.getByRole(/cellContainer-2/i);
    fireEvent.click(cellContainer);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
