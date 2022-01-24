import { filterChainsByInd } from '@src/utils';

describe('filterChainsByInd', () => {
  it('pos = 1, 2 chains = 2 => 2 chains', () => {
    const arr = filterChainsByInd(1)([[[1, 5, 9, 13]], [[1, 2, 3, 4]]]);
    expect(arr).toEqual([[1, 5, 9, 13], [1, 2, 3, 4]]);
  });

  it('pos = 11, 2 chains = 2 => 2 chains', () => {
    const arr = filterChainsByInd(11)([[[1, 5, 9, 13]], [[1, 2, 3, 4]]]);
    expect(arr).toEqual([]);
  });
});
