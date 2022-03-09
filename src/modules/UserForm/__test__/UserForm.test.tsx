import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import UserForm from '@src/modules/UserForm';
import appInitialState from '@src/App/initialState';

const userProfile = { login: 'user', password: 'pwd', loginTime: 123 };

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockSelectors = (selector: any, store: any) => {
  return selector(store);
};

let mockDispatch: jest.Mock;

describe('UserForm', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) =>
      mockSelectors(selector, {
        app: appInitialState,
        auth: { userProfile },
      })
    );
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  it('Render form', () => {
    const { asFragment } = render(
      <Router>
        <UserForm />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
    const userForm = screen.getByRole(/userForm/gi);
    expect(userForm).toBeInTheDocument();
    const formControls = screen.getByRole(/^formControls$/gi);
    expect(formControls).toBeInTheDocument();
    const buttonLogout = screen.getByRole(/^buttonLogout$/gi);
    expect(buttonLogout).toBeInTheDocument();
  });

  it('Logout app', async () => {
    render(
      <Router>
        <UserForm />
      </Router>
    );
    userEvent.click(screen.getByRole('buttonLogout'));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'auth/logout',
        payload: 123,
      })
    );
  });
});
