import React from 'react';
import { useDispatch } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';

import FormControls from '@src/modules/UserForm/FormControls';
import { TRootState } from '@src/store';

const mockStore = configureMockStore();

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

let store: TRootState;
let mockDispatch: jest.Mock;
const userProfile = { login: 'user', password: 'pwd', loginTime: 123 };

describe('FormControls', () => {
  beforeEach(() => {
    store = mockStore();
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('Render form', () => {
    const { asFragment } = render(
      <Router>
        <FormControls userLevel="1" userProfile={userProfile} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
    const userForm = screen.getByRole(/formControls/gi);
    expect(userForm).toBeInTheDocument();
    const buttonReset = screen.getByRole(/^buttonReset$/gi);
    expect(buttonReset).toBeInTheDocument();
    const select = screen.getByRole(/^select$/gi);
    expect(select).toBeInTheDocument();
  });

  it('Reset game', async () => {
    render(
      <Router>
        <FormControls userLevel="1" userProfile={userProfile} />
      </Router>
    );
    userEvent.click(screen.getByRole('buttonReset'));

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'app/resetApp',
      })
    );
  });

  it('Select level', async () => {
    render(
      <Router>
        <FormControls userLevel="1" userProfile={userProfile} />
      </Router>
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
