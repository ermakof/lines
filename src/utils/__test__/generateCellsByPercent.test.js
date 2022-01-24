import { generateCellsByPercent } from '@src/utils';

describe('generateCellsByPercent', () => {
  it('generate 10% cells', () => {
    const arr = generateCellsByPercent(10)([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    expect(arr).toEqual([0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
