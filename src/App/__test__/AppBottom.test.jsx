import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import AppBottom from '@src/App/AppBottom';
import initialState from '@src/App/initialState';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('AppBottom', () => {
  it('Render <AppBottom> without data', () => {
    useSelector.mockReturnValue(initialState);
    const store = mockStore(initialState);
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
