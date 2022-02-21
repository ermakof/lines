import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import AppHeader from '@src/App/AppHeader';
import initialState from '@src/App/initialState';
import { TRootState } from '@src/store';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

let store: TRootState;
let mockDispatch;

describe('AppHeader', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('Render authorised <AppHeader>', () => {
    (useSelector as jest.Mock).mockReturnValue({
      userProfile: { login: '123', password: '123', token: '7a0cbf93-aa13-4b50-8a41-97ddbfba00d5' },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <AppHeader />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const title = screen.getByText(/Игрок/gi);
    expect(title).toBeInTheDocument();
    const button = screen.getByRole(/^buttonLogout$/gi);
    expect(button).toBeInTheDocument();
    const select = screen.getByRole(/select/gi);
    expect(select).toBeInTheDocument();
  });

  it('Render unauthorised <AppHeader>', () => {
    (useSelector as jest.Mock).mockReturnValue({});
    const { asFragment } = render(
      <Provider store={store}>
        <AppHeader />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const title = screen.getByText(/Lines/gi);
    expect(title).toBeInTheDocument();
    const button = screen.getByRole(/buttonLogin/gi);
    expect(button).toBeInTheDocument();
  });
});
