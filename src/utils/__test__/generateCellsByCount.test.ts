import { generateCellsByCount } from '@src/utils';

describe('generateCellsByCount', () => {
  it('generate new array', () => {
    const arr = generateCellsByCount(3)([1, 3, 5, 6, 7, 8, 9]);
    expect(Array.isArray(arr)).toBeTruthy();
  });

  it('generate new array with length 7', () => {
    const arr = generateCellsByCount(3)([1, 3, 5, 6, 7, 8, 9]);
    expect(arr.length).toBe(7);
  });

  it('generate 3 cells', () => {
    const arr = generateCellsByCount(3)([1, 3, 5, 6, 7, 8, 9]);
    expect(arr[1]).toBeTruthy();
    expect(arr[3]).toBeTruthy();
    expect(arr[5]).toBeTruthy();
  });
});
