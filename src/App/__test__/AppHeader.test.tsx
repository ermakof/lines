import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from '@src/App/AppHeader';
import Store from '@src/store';
import { IAction } from '@src/model';

let dispatch: (action: IAction) => void;

describe('AppHeader', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('Render authorised <AppHeader>', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      userProfile: { login: '123', password: '123', token: '7a0cbf93-aa13-4b50-8a41-97ddbfba00d5' },
    };
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <AppHeader />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const title = screen.getByText(/Lines/gi);
    expect(title).toBeInTheDocument();
    const button = screen.getByRole(/^buttonLogout$/gi);
    expect(button).toBeInTheDocument();
    const select = screen.getByRole(/select/gi);
    expect(select).toBeInTheDocument();
  });

  it('Render unauthorised <AppHeader>', () => {
    const state = {
      gameLevel: '1',
      gameFieldSize: 3,
      gameFieldPercentFilled: 10,
      gameFieldData: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    const { asFragment } = render(
      <Store.Provider value={{ dispatch, state }}>
        <AppHeader />
      </Store.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    const title = screen.getByText(/Lines/gi);
    expect(title).toBeInTheDocument();
    const button = screen.getByRole(/buttonLogin/gi);
    expect(button).toBeInTheDocument();
  });
});
