import createGameField from '@src/utils/createGameField';

describe('createGameField', () => {
  it('check array type', () => {
    const rez = createGameField(0, 50);
    expect(rez).toEqual(expect.arrayContaining([]));
  });

  it('check length', () => {
    const rez = createGameField(16, 50);
    expect(rez.length).toBe(16);
  });

  it('check fill percent', () => {
    const rez = createGameField(16, 30);
    const countCellsFilled = rez.filter((v) => !!v).length;
    expect(countCellsFilled).toBe(5);
    const countCellsUnfilled = rez.filter((v) => !v).length;
    expect(countCellsUnfilled).toBe(11);
  });
});
