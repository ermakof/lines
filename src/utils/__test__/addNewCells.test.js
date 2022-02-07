import { addNewCells } from '@src/utils';

describe('addNewCells', () => {
  it('do not add 2 balls this chains', () => {
    const cells = [0, 0, 0, 0, 0];
    const arr = addNewCells(2)({ cells, hasChains: true });
    expect(arr).toEqual(cells);
  });

  it('add 2 balls without chains', () => {
    const cells = [1, 0, 0, 0, 0];
    const arr = addNewCells(2)({ cells, hasChains: false });
    const newCounts = arr.filter((num) => num).length;
    expect(newCounts).toBe(3);
  });
});
