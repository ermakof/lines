/**
 * Реализации алгоритма Ли
 * Алгоритм волновой трассировки (волновой алгоритм, алгоритм Ли) — алгоритм поиска пути,
 * алгоритм поиска кратчайшего пути на планарном графе.
 **/
import { getPosByInd } from '@src/utils/index';

const WALL = -1; // непроходимая ячейка
const BLANK = -2; // свободная непомеченная ячейка

const initLee = (dwf: Array<number>) => {
  /**
   * Размер дискретного рабочего поля
   */
  const SIZE = Array.isArray(dwf) && Math.sqrt(dwf.length);
  if (!SIZE) {
    return null;
  }

  /**
   * Создаем дискретное рабочее поле из игрового поля
   */
  const createGrid = () => {
    // массив grid заполнен значениями WALL и BLANK
    const grid: Array<Array<number>> = [];
    for (let i = 0; i < SIZE; i = i + 1) {
      const begin = SIZE * grid.length;
      const end = begin + SIZE;
      grid.push(dwf.slice(begin, end).map((j) => (j ? WALL : BLANK)));
    }
    return grid;
  };

  /**
   * Валидация произвольной точки внутри дискретного рабочего поля
   */
  const validateOutbounds = (x: number, y: number) => x >= 0 && x < SIZE && y >= 0 && y < SIZE;

  /**
   * Валидация начальной и конечной точки внутри дискретного рабочего поля
   */
  const validatePoints = (p1: Array<number>, p2: Array<number>) =>
    validateOutbounds(p2[0], p2[1]) && validateOutbounds(p1[0], p1[1]);

  return {
    SIZE,
    validatePoints,
    validateOutbounds,
    createGrid,
  };
};

// поиск пути из ячейки (ax, ay) в ячейку (bx, by)
export const lee = (
  gameField: Array<number>,
  from?: Array<number> | number,
  to?: Array<number> | number
) => {
  const self = initLee(gameField);
  if (!self || from == null || to == null) {
    return null;
  }
  const grid = self.createGrid();
  const ax: number = Array.isArray(from) ? from[0] : getPosByInd(from)[1];
  const ay: number = Array.isArray(from) ? from[1] : getPosByInd(from)[0];
  const bx: number = Array.isArray(to) ? to[0] : getPosByInd(to)[1];
  const by: number = Array.isArray(to) ? to[1] : getPosByInd(to)[0];
  const dx = [1, 0, -1, 0]; // смещения, соответствующие соседям ячейки
  const dy = [0, 1, 0, -1]; // справа, снизу, слева и сверху

  const px = Array(self.SIZE ** 2); // координаты ячеек по оси X, входящих  путь
  const py = Array(self.SIZE ** 2); // координаты ячеек по оси Y, входящих  путь
  let len: number; // длина пути
  let stop: boolean;

  // координаты начальной вне рабочего поля
  if (!self.validatePoints([ax, ay], [bx, by])) {
    return null;
  }

  // ячейка (ax, ay) или (bx, by) - стена
  if (grid[bx][by] === WALL) {
    return null;
  }

  // распространение волны
  let d: number = 0;
  grid[ax][ay] = 0; // стартовая ячейка помечена 0
  do {
    stop = true; // предполагаем, что все свободные клетки уже помечены
    for (let x = 0; x < self.SIZE; x = x + 1) {
      for (let y = 0; y < self.SIZE; y = y + 1) {
        // ячейка (x, y) помечена числом d
        if (grid[x][y] === d) {
          // проходим по всем непомеченным соседям
          for (let k = 0; k < 4; k = k + 1) {
            const ix = x + dx[k];
            const iy = y + dy[k];
            if (self.validateOutbounds(ix, iy) && grid[ix][iy] === BLANK) {
              stop = false; // найдены непомеченные клетки
              grid[ix][iy] = d + 1; // распространяем волну
            }
          }
        }
      }
    }
    d = d + 1;
  } while (!stop && grid[bx][by] === BLANK);

  if (grid[bx][by] === BLANK) {
    return null; // путь не найден
  }

  // восстановление пути
  len = grid[bx][by]; // длина кратчайшего пути из (ax, ay) в (bx, by)
  let x = bx;
  let y = by;
  d = len;
  while (d > 0) {
    px[d] = x;
    py[d] = y; // записываем ячейку (x, y) в путь
    d--;
    for (let k = 0; k < 4; ++k) {
      const iy = y + dy[k];
      const ix = x + dx[k];
      if (self.validateOutbounds(ix, iy) && grid[ix][iy] == d) {
        x = x + dx[k];
        y = y + dy[k]; // переходим в ячейку, которая на 1 ближе к старту
        break;
      }
    }
  }
  px[0] = ax; // теперь px[0..len]
  py[0] = ay; // и py[0..len] - координаты ячеек пути

  return px.reduce((accum, curr, ind) => {
    accum.push([py[ind], curr]);
    return accum;
  }, []);
};
