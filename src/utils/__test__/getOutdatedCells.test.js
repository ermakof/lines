/* eslint-disable */
import { getOutdatedCells } from '@src/utils';

describe('getOutdatedCells', () => {
  it('Convert 1 chain [5, 6, 7, 8] to object {5: true, 6: true, 7: true, 8: true}', () => {
    const outdatedCells = getOutdatedCells([[5, 6, 7, 8]]);
    expect(outdatedCells).toEqual({5: true, 6: true, 7: true, 8: true});
  });

  it('Convert 2 chains [[5, 6], [7, 8]] to object {5: true, 6: true, 7: true, 8: true}', () => {
    const outdatedCells = getOutdatedCells([[5, 6], [7, 8]]);
    expect(outdatedCells).toEqual({5: true, 6: true, 7: true, 8: true});
  });
});
