import shuffle from '@src/utils/shuffle';

describe('Shuffle', () => {
  it('check length', () => {
    const arr = [1, 2, 3, 4, 5];
    const rez = shuffle(arr);
    expect(rez.length).toBe(5);
  });

  it('check shuffle', () => {
    const arr = [1, 2, 3, 4, 5];
    const rez = shuffle(arr);
    expect(rez).not.toEqual(arr);
  });

  it('check content', () => {
    const arr = [1, 2, 3, 4, 5];
    const rez = shuffle(arr);
    expect(arr).toEqual(rez.sort());
  });
});
