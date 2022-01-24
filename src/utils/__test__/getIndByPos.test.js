import { getIndByPos } from '@src/utils';

describe('getIndByPos', () => {
  it('pos = [5,7] => ind = 59', () => {
    const arr = getIndByPos([5, 7], 9);
    expect(arr).toBe(59);
  });
});
