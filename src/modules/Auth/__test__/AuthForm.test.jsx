import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

import AuthForm from '@src/modules/Auth/AuthForm';

const mockStore = configureMockStore();

let store;
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const storageMock = (() => {
  let store = {};

  return {
    getItem(key = '') {
      return store[key] || null;
    },
    setItem(key = '', value = '') {
      store[key] = value.toString();
    },
    removeItem(key = '') {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: storageMock,
});

Object.defineProperty(window, 'crypto', {
  value: { getRandomValues: () => '123-123-123-123' },
});

describe('AuthForm', () => {
  beforeEach(() => {
    window.localStorage.clear();
    store = mockStore({
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    });
    jest.restoreAllMocks();
  });

  it('Render <AuthForm>', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const authForm = screen.getByRole(/authForm/gi);
    expect(authForm).toBeInTheDocument();
    const login = screen.getByRole(/^login$/gi);
    expect(login).toBeInTheDocument();
    const password = screen.getByRole(/password/gi);
    expect(password).toBeInTheDocument();
  });

  it('Submit <AuthForm>', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const login = screen.getByRole(/^login$/gi);
    userEvent.clear(login);
    userEvent.type(login, 'Иван');
    const password = screen.getByRole(/password/gi);
    userEvent.clear(password);
    userEvent.type(password, '123');

    userEvent.click(screen.getByRole('buttonLogin'));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'auth/setUser',
        payload: {
          login: 'Иван',
          password: '123',
        },
      })
    );
  });
});
