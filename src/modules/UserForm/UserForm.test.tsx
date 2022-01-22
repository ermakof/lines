import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import UserForm from '@src/modules/UserForm';
import { store } from '@src/store';

describe('UserForm', () => {
  it('Render <UserForm>', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
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
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    userEvent.click(screen.getByRole('buttonReset'));

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: 'APP__RESET',
      })
    );
  });

  it('Logout app <UserForm>', async () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    userEvent.click(screen.getByRole('buttonLogout'));

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: 'APP__LOGOUT',
      })
    );
  });

  it('Select level <UserForm>', async () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <UserForm />
        </Router>
      </Provider>
    );
    const select = screen.getByRole(/select/gi);
    userEvent.selectOptions(select, '2');
    const option = screen.getByRole('option', { name: 'Джедай' }) as HTMLOptionElement;
    expect(option.selected).toBe(true);

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        payload: { gameLevel: '2' },
        type: 'APP__SET_LEVEL',
      })
    );
  });
});
