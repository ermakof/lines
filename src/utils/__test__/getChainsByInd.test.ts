/* eslint-disable */
import { getChainsByInd } from '@src/utils';

const cells = [
  1, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
];

describe('getChainsByInd', () => {
  it('pos = 0, level = "1"', () => {
    const arr = getChainsByInd(0, '1')(cells);
    expect(arr).toEqual([
      [[0, 9, 18, 27], [45, 54, 63, 72]],
      [[5, 6, 7, 8]]
    ]);
  });

  it('pos = 3, level = "1"', () => {
    const arr = getChainsByInd(3, '1')(cells);
    expect(arr).toEqual([]);
  });

  it('pos = 0, level = "3"', () => {
    const arr = getChainsByInd(0, '3')(cells);
    expect(arr).toEqual([]);
  });
});
