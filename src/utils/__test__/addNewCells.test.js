import { getNewCells } from '@src/utils';
import { GAME_LEVEL_SETTINGS } from '@src/App/initialState';

describe('addNewCells', () => {
  it('do not generate new cells', () => {
    const cells = [1, 1, 1, 1, 1, 1, 1];
    const arr = getNewCells(cells, '3');
    expect(arr.length).toBe(0);
  });

  it('add 5 new cells', () => {
    const cells = [0, 0, 0, 0, 0, 0, 0];
    const arr = getNewCells(cells, '3');
    expect(arr.length).toBe(GAME_LEVEL_SETTINGS['3'].increase);
  });
});
