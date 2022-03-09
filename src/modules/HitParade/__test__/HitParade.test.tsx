import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';

import HitParade from '@src/modules/HitParade';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockSelectors = (selector: any, store: any) => {
  return selector(store);
};

const userProfile = {
  login: 'user',
  password: '123',
  token: '123-123-123-123',
  loginTime: 1646851461537,
};

describe('Hit parade form', () => {
  it('render snapshot', () => {
    const { asFragment } = render(<HitParade />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('render panel without grid', () => {
    const mockStore = {
      app: { hitParade: undefined },
      auth: { userProfile },
    };
    (useSelector as jest.Mock).mockImplementation((selector) => mockSelectors(selector, mockStore));
    render(<HitParade />);
    const panel = screen.getByRole(/panelHitParade/gi);
    expect(panel).toBeInTheDocument();
    const grid = screen.getByRole(/rootGrid/gi);
    expect(grid).toBeInTheDocument();
    const title = screen.getByText(/Хит-парад/gi);
    expect(title).toBeInTheDocument();
  });

  it('render panel with grid', () => {
    const mockStore = {
      app: {
        hitParade: {
          1646851461537: { login: 'Игрок 1', ts: 1646851461537, score: 100 },
          1646855489093: { login: 'Игрок 2', ts: 1646855489093, score: 200 },
          1646859512749: { login: 'Игрок 3', ts: 1646859512749, score: 300 },
        },
      },
      auth: {
        userProfile: {
          login: 'user',
          password: '123',
          token: '123-123-123-123',
          loginTime: 1646851461537,
        },
      },
    };
    (useSelector as jest.Mock).mockImplementation((selector) => mockSelectors(selector, mockStore));
    render(<HitParade />);
    const panel = screen.getByRole(/panelHitParade/gi);
    expect(panel).toBeInTheDocument();
    const grid = screen.getByRole(/rootGrid/gi);
    expect(grid).toBeInTheDocument();
    const title = screen.getByText(/Хит-парад/gi);
    expect(title).toBeInTheDocument();
    const form = screen.getByRole(/hitParade/gi);
    expect(form).toBeInTheDocument();
  });
});
