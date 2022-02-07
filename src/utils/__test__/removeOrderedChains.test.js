import { removeOrderedChains } from '@src/utils';

describe('removeOrderedChains', () => {
  it('cells = array(25), 1 chain', () => {
    const props = {
      cells: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chains: [[1, 2, 3, 4]],
    };
    const arr = removeOrderedChains(props);
    expect(arr).toEqual({
      cells: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: true,
    });
  });

  it('cells = array(25), 2 chains', () => {
    const props = {
      cells: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chains: [
        [1, 2, 3, 4],
        [6, 7, 8, 9],
      ],
    };
    const arr = removeOrderedChains(props);
    expect(arr).toEqual({
      cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: true,
    });
  });

  it('cells = array(25), no chains', () => {
    const props = {
      cells: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chains: [],
    };
    const arr = removeOrderedChains(props);
    expect(arr).toEqual({
      cells: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hasChains: false,
    });
  });
});
