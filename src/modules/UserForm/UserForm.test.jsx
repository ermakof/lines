import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';

import UserForm from '@src/modules/UserForm';
import initialState from '@src/App/initialState';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

let store;
let mockDispatch;

describe('UserForm', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(initialState);
  });

  it('Render <UserForm>', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const userForm = screen.getByRole(/userForm/gi);
    expect(userForm).toBeInTheDocument();
    const buttonReset = screen.getByRole(/^buttonReset$/gi);
    expect(buttonReset).toBeInTheDocument();
    const select = screen.getByRole(/^select$/gi);
    expect(select).toBeInTheDocument();
    const buttonLogout = screen.getByRole(/^buttonLogout$/gi);
    expect(buttonLogout).toBeInTheDocument();
  });

  it('Reset game <UserForm>', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    userEvent.click(screen.getByRole('buttonReset'));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'app/resetApp',
      })
    );
  });

  it('Logout app <UserForm>', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    userEvent.click(screen.getByRole('buttonLogout'));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'auth/logout',
      })
    );
  });

  it('Select level <UserForm>', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    const select = screen.getByRole(/select/gi);
    userEvent.selectOptions(select, '2');

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'app/setUserLevel',
        payload: '2',
      })
    );
  });
});
