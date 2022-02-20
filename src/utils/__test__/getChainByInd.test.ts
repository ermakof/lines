/* eslint-disable */
import { getChainByInd } from '@src/utils';

const cells = [
  1, 2, 2, 2, 0, 1, 1, 1, 1,
  1, 0, 2, 0, 0, 0, 0, 0, 1,
  1, 0, 2, 0, 0, 0, 0, 0, 1,
  2, 0, 3, 0, 0, 3, 2, 1, 1,
  0, 0, 0, 0, 0, 3, 0, 0, 1,
  1, 0, 0, 0, 0, 2, 2, 2, 0,
  1, 1, 1, 3, 3, 3, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
];

describe('getChainByInd', () => {
  describe('color Id = 1', () => {
    it('direction = V, x = 0, level = "1" => [[0, 9, 18], [45, 54, 63, 72]]', () => {
      const arr = getChainByInd('V', 0, '1', cells, 1);
      expect(arr).toEqual([[0, 9, 18], [45, 54, 63, 72]]);
    });

    it('direction = V, x = 35 => [45, 54, 63, 72]', () => {
      const arr = getChainByInd('V', 45, "1", cells, 1);
      expect(arr).toEqual([[45, 54, 63, 72]]);
    });

    it('direction = H, y = 0, level = "1" => [[5, 6, 7, 8]]', () => {
      const arr = getChainByInd('H', 0, "1", cells, 1);
      expect(arr).toEqual([[5, 6, 7, 8]]);
    });

    it('direction = H, y = 1, level = "1" => []', () => {
      const arr = getChainByInd('H', 1, "1", cells, 1);
      expect(arr).toEqual([]);
    });
  });

  describe('color Id = 2', () => {
    it('direction = V, x = 0, level = "1" => [[0, 9, 18, 27], [45, 54, 63, 72]]', () => {
      const arr = getChainByInd('V', 0, '1', cells, 2);
      expect(arr).toEqual([]);
    });

    it('direction = H, y = 0 => [1, 2, 3]', () => {
      const arr = getChainByInd('H', 0, "1", cells, 2);
      expect(arr).toEqual([[1, 2, 3]]);
    });

    it('direction = H, x = 0, level = "1" => [[5, 6, 7, 8]]', () => {
      const arr = getChainByInd('V', 0, "1", cells, 2);
      expect(arr).toEqual([]);
    });

    it('direction = H, y = 5, level = "1" => []', () => {
      const arr = getChainByInd('H', 5, "1", cells, 2);
      expect(arr).toEqual([[50, 51, 52]]);
    });
  });
});
