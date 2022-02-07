import { getIndByPos } from '@src/utils';

describe('getIndByPos', () => {
  it('pos = [0, 0] => ind = 0', () => {
    const arr = getIndByPos([0, 0]);
    expect(arr).toBe(0);
  });

  it('pos = [8, 0] => ind = 8', () => {
    const arr = getIndByPos([8, 0]);
    expect(arr).toBe(8);
  });

  it('pos = [0, 1] => ind = 9', () => {
    const arr = getIndByPos([0, 1]);
    expect(arr).toBe(9);
  });

  it('pos = [8, 1] => ind = 17', () => {
    const arr = getIndByPos([8, 1]);
    expect(arr).toBe(17);
  });

  it('pos = [0, 2] => ind = 18', () => {
    const arr = getIndByPos([0, 2]);
    expect(arr).toBe(18);
  });

  it('pos = [8,8] => ind = 80', () => {
    const arr = getIndByPos([8, 8]);
    expect(arr).toBe(80);
  });
});
