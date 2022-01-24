import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import AppBottom from '@src/App/AppBottom';
import initialState from "@src/store/initialState";

const mockStore = configureMockStore();

describe('AppBottom', () => {
  it('Render <AppBottom> without data', () => {
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
