import { getPosByInd } from '@src/utils';

describe('getPosByInd', () => {
  it('ind = 0 => pos = [0,0]', () => {
    const arr = getPosByInd(0);
    expect(arr).toEqual([0, 0]);
  });

  it('ind = 8 => pos = [8, 0]', () => {
    const arr = getPosByInd(8);
    expect(arr).toEqual([8, 0]);
  });

  it('ind = 9 => pos = [0, 1]', () => {
    const arr = getPosByInd(9);
    expect(arr).toEqual([0, 1]);
  });

  it('ind = 17 => pos = [8, 1]', () => {
    const arr = getPosByInd(17);
    expect(arr).toEqual([8, 1]);
  });

  it('ind = 18 => pos = [0, 2]', () => {
    const arr = getPosByInd(17);
    expect(arr).toEqual([8, 1]);
  });

  it('ind = 80 => pos = [8, 8]', () => {
    const arr = getPosByInd(80);
    expect(arr).toEqual([8, 8]);
  });

  it('ind = -1 => pos = [0, 0]', () => {
    const arr = getPosByInd(-1);
    expect(arr).toEqual([0, 0]);
  });

  it('ind = 81 => pos = [0,0]', () => {
    const arr = getPosByInd(81);
    expect(arr).toEqual([8, 8]);
  });
});
