import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AuthForm from '@src/modules/Auth/AuthForm';
import userEvent from '@testing-library/user-event';
import Store from '@src/store';
import { BrowserRouter as Router } from 'react-router-dom';

interface ILocalStorage {
  [key: string]: string;
}

const storageMock = (() => {
  let store: ILocalStorage = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value = '') {
      store[key] = value.toString();
    },
    removeItem(key: string) {
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
    jest.restoreAllMocks();
  });

  it('Render <AuthForm>', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <Router>
          <AuthForm />
        </Router>
      </Store.Provider>
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
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    render(
      <Store.Provider value={{ dispatch, state }}>
        <Router>
          <AuthForm />
        </Router>
      </Store.Provider>
    );
    const login = screen.getByRole(/^login$/gi);
    userEvent.clear(login);
    userEvent.type(login, 'Иван');
    const password = screen.getByRole(/password/gi);
    userEvent.clear(password);
    userEvent.type(password, '123');

    userEvent.click(screen.getByRole('buttonLogin'));

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: 'APP__RESET',
      })
    );
  });

  it('Auto login <AuthForm>', async () => {
    window.localStorage.setItem(
      'lines:userProfile',
      JSON.stringify({
        login: 'user',
        password: '123',
        token: '8b23774d-ea51-4e64-aaf3-e3db309b9efc',
      })
    );
    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    render(
      <Store.Provider value={{ dispatch, state }}>
        <Router>
          <AuthForm />
        </Router>
      </Store.Provider>
    );
    expect(getItemSpy).toBeCalledWith('lines:userProfile');
  });
});
