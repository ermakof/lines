const setCell =
  (ind: number | undefined, value: number = 1) =>
  (cells: Array<number> = []) => {
    if (ind != undefined && ind > -1 && ind < cells.length) {
      cells[ind] = value;
    }
    return [...cells];
  };

export default setCell;
