import { getNewCells } from '@src/utils';

describe('addNewCells', () => {
  it('do not generate new cells', () => {
    const cells = [1, 1, 1, 1, 1, 1, 1];
    const arr = getNewCells(cells, '3');
    expect(arr).toHaveLength(0);
  });

  it('add 5 new cells', () => {
    const cells = [0, 0, 0, 0, 0, 0, 0];
    const arr = getNewCells(cells, '3');
    expect(arr).toHaveLength(5);
  });
});
