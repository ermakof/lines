import { getChainByInd } from '@src/utils';

describe('getChainByInd', () => {
  it('direction = V, x = 1, cells = array(16)', () => {
    const arr = getChainByInd('V', 1, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]);
    expect(arr).toEqual([[1, 5, 9, 13]]);
  });

  it('direction = H, y = 1, cells = array(16)', () => {
    const arr = getChainByInd('H', 1, [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(arr).toEqual([[1, 2, 3, 4]]);
  });

  it('direction = H, y = 2, cells = array(25), 2 chains => 1 chain', () => {
    const arr = getChainByInd(
      'H',
      1,
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    expect(arr).toEqual([[1, 2, 3, 4]]);
  });
});
