import { getPosByInd } from '@src/utils';

describe('getPosByInd', () => {
  it('ind = 59 => pos = [5,7]', () => {
    const arr = getPosByInd(59, 9);
    expect(arr).toEqual([5, 7]);
  });
});
