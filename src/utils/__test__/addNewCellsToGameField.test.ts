/* eslint-disable prettier/prettier */
import { addNewCellsToGameField } from '@src/utils';

describe('addNewCellsToGameField', () => {
  it('create new array', () => {
    const arr = addNewCellsToGameField([0, 0, 0],
      {0: '', 1: '', 2: ''});
    expect(Array.isArray(arr)).toBeTruthy();
  });

  it('create 3 cells', () => {
    const arr = addNewCellsToGameField([0, 0, 0],
      {0: '', 1: '', 2: ''});
    expect(arr.length).toBe(3);
  });

  it('all cells are truthy', () => {
    const arr = addNewCellsToGameField([0, 0, 0],
      {0: '', 1: '', 2: ''});
    expect(arr[0]).toBeTruthy();
    expect(arr[1]).toBeTruthy();
    expect(arr[2]).toBeTruthy();
  });
});
