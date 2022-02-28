import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthStatus from '@src/modules/Auth/AuthStatus';

describe('AuthStatus', () => {
  it('Render <AuthStatus> without authorisation', () => {
    const { asFragment } = render(<AuthStatus />);
    expect(asFragment()).toMatchSnapshot();
    const authForm = screen.getByText(/Lines/gi);
    expect(authForm).toBeInTheDocument();
  });

  it('Render <AuthStatus> with authorisation', () => {
    const { asFragment } = render(<AuthStatus login="user name" />);
    expect(asFragment()).toMatchSnapshot();
    const authForm = screen.getByText(/user name/gi);
    expect(authForm).toBeInTheDocument();
  });
});
