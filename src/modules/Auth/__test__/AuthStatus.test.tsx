import React from 'react';
import { render, screen } from '@testing-library/react';
import GameTitle from '@src/components/GameTitle';

describe('AuthStatus', () => {
  it('Render <AuthStatus> without authorisation', () => {
    const { asFragment } = render(<GameTitle />);
    expect(asFragment()).toMatchSnapshot();
    const title = screen.getByText(/Lines/gi);
    expect(title).toBeInTheDocument();
  });
});
