import React from 'react';
import { render, screen } from '@testing-library/react';
import UserStatus from '@src/components/UserStatus';

describe('AuthStatus', () => {
  it('Render <AuthStatus> without authorisation', () => {
    const { asFragment } = render(<UserStatus />);
    expect(asFragment()).toMatchSnapshot();
    const authForm = screen.getByText(/Lines/gi);
    expect(authForm).toBeInTheDocument();
  });

  it('Render <AuthStatus> with authorisation', () => {
    const { asFragment } = render(<UserStatus login="user name" />);
    expect(asFragment()).toMatchSnapshot();
    const authForm = screen.getByText(/user name/gi);
    expect(authForm).toBeInTheDocument();
  });
});
