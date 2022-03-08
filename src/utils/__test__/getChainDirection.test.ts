import { getChainDirection } from '@src/utils';

describe('getChainDirection', () => {
  it('[[1, 2, 3]] => Y direction', () => {
    const direction = getChainDirection([[1, 2, 3]], 3);
    expect(direction).toEqual('Y');
  });

  it('[[1, 4, 7]] => X direction', () => {
    const direction = getChainDirection([[1, 4, 7]], 3);
    expect(direction).toEqual('X');
  });

  it('[[1]] => direction not defined', () => {
    const direction = getChainDirection([[1]], 3);
    expect(direction).toEqual('');
  });

  it('[[1, 3]] => direction not defined', () => {
    const direction = getChainDirection([[1, 3]], 3);
    expect(direction).toEqual('');
  });

  it('[[1, 33]] => direction not defined', () => {
    const direction = getChainDirection([[1, 3]], 3);
    expect(direction).toEqual('');
  });
});
