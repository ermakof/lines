import createArrayBySize from '@src/utils/createArrayBySize';

describe('createArrayBySize', () => {
  it('without size', () => {
    const arr = createArrayBySize();
    expect(arr).toEqual([]);
  });

  it('with size 5', () => {
    const arr = createArrayBySize(5);
    expect(arr).toEqual([0, 1, 2, 3, 4]);
  });
});
