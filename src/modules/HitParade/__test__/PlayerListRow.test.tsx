import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerListRow from '@src/modules/HitParade/PlayerListRow';

const user = { login: 'Игрок 1', ts: 1646851461537, score: 100 };

describe('PlayerListRow', () => {
  it('Render time 1646851461537 => 09.03.2022, 21:44:21', () => {
    render(<PlayerListRow user={user} winner={1} />);
    const row = screen.getByText(/^09.03.2022, 21:44:21/gi);
    expect(row).toBeInTheDocument();
  });

  it('Render login => Игрок 1', () => {
    render(<PlayerListRow user={user} winner={1} />);
    const row = screen.getByText(/^Игрок 1/gi);
    expect(row).toBeInTheDocument();
  });

  it('Render row => to be in the document', () => {
    render(<PlayerListRow user={user} winner={1} />);
    const row = screen.getByRole(/^row/gi);
    expect(row).toBeInTheDocument();
  });

  it('Render first winner', () => {
    render(<PlayerListRow user={user} winner={1} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.backgroundColor).toBe('');
    expect(styles.color).toBe('rgb(255, 255, 0)');
    const col = screen.queryByTestId(/^colWinnerPlace/gi);
    expect(col).toBeInTheDocument();
  });

  it('Render second winner', () => {
    render(<PlayerListRow user={user} winner={2} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.backgroundColor).toBe('');
    expect(styles.color).toBe('rgb(192, 192, 192)');
    const col = screen.queryByTestId(/^colWinnerPlace/gi);
    expect(col).toBeInTheDocument();
  });

  it('Render third winner', () => {
    render(<PlayerListRow user={user} winner={3} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.backgroundColor).toBe('');
    expect(styles.color).toBe('rgb(165, 42, 42)');
    const col = screen.queryByTestId(/^colWinnerPlace/gi);
    expect(col).toBeInTheDocument();
  });

  it('Render with winner 4', () => {
    render(<PlayerListRow user={user} winner={4} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.backgroundColor).toBe('');
    expect(styles.color).toBe('');
    const col = screen.queryByTestId(/^colWinnerPlace/gi);
    expect(col).toBeInTheDocument();
  });

  it('Render with winner 0', () => {
    render(<PlayerListRow user={user} winner={0} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.backgroundColor).toBe('');
    expect(styles.color).toBe('');
    const col = screen.queryByTestId(/^colWinnerPlace/gi);
    expect(col).not.toBeInTheDocument();
  });

  it('Render selected row', () => {
    render(<PlayerListRow user={user} winner={4} highlighted={true} />);
    const row = screen.getByRole(/^row/gi);
    const styles = getComputedStyle(row);
    expect(styles.color).toBe('');
    expect(styles.backgroundColor).toBe('rgba(170, 170, 170, 0.271)');
  });
});
