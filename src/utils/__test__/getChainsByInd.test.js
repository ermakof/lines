import { getChainsByInd } from '@src/utils';

describe('getChainsByInd', () => {
  it('pos = 1, cells = array(16)', () => {
    const arr = getChainsByInd(1)([1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]);
    expect(arr).toEqual([[[1, 5, 9, 13]], [[1, 2, 3, 4]]]);
  });
});
