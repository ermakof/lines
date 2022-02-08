import { generateCellsByPercent } from '@src/utils';

describe('generateCellsByPercent', () => {
  it('get random array', () => {
    const arr = generateCellsByPercent(10)([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    expect(Array.isArray(arr)).toBeTruthy();
  });

  it('get random array with length 10', () => {
    const arr = generateCellsByPercent(10)([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    expect(arr.length).toEqual(10);
  });

  it('generate 10% cells', () => {
    const arr = generateCellsByPercent(10)([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    expect(arr[1]).toBeTruthy();
  });
});
