import { sortByScore } from '@src/modules/HitParade/utils';

describe('addNewCellsToGameField', () => {
  it('100 and 100 => 0', () => {
    const rez = sortByScore({ login: '1', ts: 1, score: 100 }, { login: '1', ts: 1, score: 100 });
    expect(rez).toBe(0);
  });

  it('100 and 10 => -1', () => {
    const rez = sortByScore({ login: '1', ts: 1, score: 100 }, { login: '1', ts: 1, score: 10 });
    expect(rez).toBe(-1);
  });

  it('10 and 100 => 1', () => {
    const rez = sortByScore({ login: '1', ts: 1, score: 10 }, { login: '1', ts: 1, score: 100 });
    expect(rez).toBe(1);
  });
});
