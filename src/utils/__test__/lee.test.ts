/* eslint-disable */
import { lee } from '@src/utils';

const gameField: Array<number> = [
  1, 0, 1, 0, 0, 0, 0, 0,
  1, 0, 1, 1, 1, 0, 1, 1,
  1, 0, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 0, 1, 1, 0, 1,
  0, 1, 0, 0, 1, 0, 0, 1,
  0, 1, 0, 1, 1, 0, 1, 1,
  0, 1, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 0, 1, 1, 1, 0,
];

describe('lee', () => {
  describe('point by address', () => {
    it('game field is undefined => route no exist', () => {
      const route = lee(undefined, [0, 1], [0, 3]);
      expect(route).toBeNull();
    });

    it('target point is undefined => route no exist', () => {
      const route = lee(gameField, [0, 1], undefined);
      expect(route).toBeNull();
    });

    it('target point is out of reach => route no exist', () => {
      const route = lee(gameField, [0, 1], [7, 0]);
      expect(route).toBeNull();
    });

    it('selected point is out of bounds => route no exist', () => {
      const route = lee(gameField, [8, 8], [1, 1]);
      expect(route).toBeNull();
    });

    it('selected point is undefined => route no exist', () => {
      const route = lee(gameField, undefined, [1, 1]);
      expect(route).toBeNull();
    });

    it('target point is out of bounds => route no exist', () => {
      const route = lee(gameField, [1, 1], [-1, -1]);
      expect(route).toBeNull();
    });

    it('target point is reachable => route is exist', () => {
      const route = lee(gameField, [0, 0], [0, 3]);
      expect(route).not.toBeNull();
    });
  });

  describe('point by ind', () => {
    it('game field is undefined => route no exist', () => {
      const route = lee(undefined, 1, 3);
      expect(route).toBeNull();
    });

    it('target point is out of reach => route no exist', () => {
      const route = lee(gameField, 1, 63);
      expect(route).toBeNull();
    });

    it('target point is undefined => route no exist', () => {
      const route = lee(gameField, 1, undefined);
      expect(route).toBeNull();
    });

    it('selected point is out of bounds => route no exist', () => {
      const route = lee(gameField, 8, 1);
      expect(route).toBeNull();
    });

    it('selected point is undefined => route no exist', () => {
      const route = lee(gameField, undefined, 1);
      expect(route).toBeNull();
    });

    it('target point is out of bounds => route no exist', () => {
      const route = lee(gameField, 1, -1);
      expect(route).toBeNull();
    });

    it('target point is reachable => route is exist', () => {
      const route = lee(gameField, 0, 3);
      expect(route).not.toBeNull();
    });
  });
});
