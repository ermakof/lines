import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerList from '@src/modules/HitParade/PlayerList';

const playerList = {
  1646851461537: { login: 'Игрок 1', ts: 1646851461537, score: 100 },
  1646855489093: { login: 'Игрок 2', ts: 1646855489093, score: 200 },
  1646859512749: { login: 'Игрок 3', ts: 1646859512749, score: 300 },
};

describe('PlayerList', () => {
  it('Render snapshot', () => {
    const { asFragment } = render(<PlayerList list={playerList} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render form and grid', () => {
    render(<PlayerList list={playerList} />);
    const grid = screen.getByRole(/grid/gi);
    expect(grid).toBeInTheDocument();
    const header = screen.getByRole(/^header$/gi);
    expect(header).toBeInTheDocument();
    const rows = screen.getAllByRole(/^row$/gi);
    expect(rows).toHaveLength(3);
  });

  it('Render header values', () => {
    render(<PlayerList list={playerList} />);
    const headerTime = screen.getByText(/Время/gi);
    expect(headerTime).toBeInTheDocument();
    const headerLogin = screen.getByText(/Имя/gi);
    expect(headerLogin).toBeInTheDocument();
    const headerScore = screen.getByText(/Счет/gi);
    expect(headerScore).toBeInTheDocument();
    const headerWin = screen.getByText(/Место/gi);
    expect(headerWin).toBeInTheDocument();
  });

  it('Render grid values', () => {
    render(<PlayerList list={playerList} />);
    const player1 = screen.getByText(/Игрок 1/gi);
    expect(player1).toBeInTheDocument();
    const player2 = screen.getByText(/Игрок 2/gi);
    expect(player2).toBeInTheDocument();
    const player3 = screen.getByText(/Игрок 3/gi);
    expect(player3).toBeInTheDocument();
    const score1 = screen.getByText(/100/gi);
    expect(score1).toBeInTheDocument();
    const score2 = screen.getByText(/200/gi);
    expect(score2).toBeInTheDocument();
    const score3 = screen.getByText(/300/gi);
    expect(score3).toBeInTheDocument();
    const time1 = screen.getByText(/09.03.2022, 23:58:32/gi);
    expect(time1).toBeInTheDocument();
    const time2 = screen.getByText(/09.03.2022, 22:51:29/gi);
    expect(time2).toBeInTheDocument();
    const time3 = screen.getByText(/09.03.2022, 21:44:21/gi);
    expect(time3).toBeInTheDocument();
  });
});
