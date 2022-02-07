/* eslint-disable */
import { getChainByInd } from '@src/utils';

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

describe('getChainByInd', () => {
  it('direction = V, x = 0, level = "1" => [[0, 9, 18, 27], [45, 54, 63, 72]]', () => {
    const arr = getChainByInd('V', 0, '1', cells);
    expect(arr).toEqual([[0, 9, 18, 27], [45, 54, 63, 72]]);
  });

  it('direction = V, x = 35 => [45, 54, 63, 72]', () => {
    const arr = getChainByInd('V', 45, "1", cells);
    expect(arr).toEqual([[45, 54, 63, 72]]);
  });

  it('direction = H, y = 0, level = "1" => [[5, 6, 7, 8]]', () => {
    const arr = getChainByInd('H', 0, "1", cells);
    expect(arr).toEqual([[5, 6, 7, 8]]);
  });

  it('direction = H, y = 1, level = "1" => []', () => {
    const arr = getChainByInd('H', 1, "1", cells);
    expect(arr).toEqual([]);
  });
});
