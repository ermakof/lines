import { removeOutdatedChains } from '@src/utils';

describe('removeOrderedChains', () => {
  it('cells = array(25), remove 1 chain', () => {
    const cells = [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chains = [[1, 2, 3, 4]];
    const arr = removeOutdatedChains(chains)(cells);
    expect(arr).toEqual({
      cells: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: true,
    });
  });

  it('cells = array(25), remove 2 chains', () => {
    const cells = [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chains = [
      [0, 1, 2, 3],
      [0, 4, 8, 12],
    ];
    const arr = removeOutdatedChains(chains)(cells);
    expect(arr).toEqual({
      cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: true,
    });
  });

  it('cells = array(25), no chains', () => {
    const cells = [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chains = [];
    const arr = removeOutdatedChains(chains)(cells);
    expect(arr).toEqual({
      cells: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: false,
    });
  });
});
