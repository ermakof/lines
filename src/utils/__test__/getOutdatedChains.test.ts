/* eslint-disable */
import { getOutdatedChains } from '@src/utils';

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

describe('getOutdatedChains', () => {
  it('pos = 0, level = "1"', () => {
    const arr = getOutdatedChains(0, '1', cells);
    expect(arr).toEqual([[0, 9, 18, 27]]);
  });

  it('pos = 3, level = "1" => []', () => {
    const arr = getOutdatedChains(3, '1', cells);
    expect(arr).toEqual([]);
  });

  it('pos = 7, level = "2" => [[5, 6, 7, 8]]', () => {
    const arr = getOutdatedChains(7, '2', cells);
    expect(arr).toEqual([[5, 6, 7, 8]]);
  });
});
