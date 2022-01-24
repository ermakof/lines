import { generateCellsByCount } from '@src/utils';

describe('generateCellsByCount', () => {
  it('generate 3 cells', () => {
    const arr = generateCellsByCount(3)([1, 3, 5, 6, 7, 8, 9]);
    expect(arr).toEqual([0, 1, 0, 1, 0, 1, 0]);
  });
});
