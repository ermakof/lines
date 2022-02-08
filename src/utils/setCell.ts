export default (ind: number | undefined, value: number = 1) =>
  (cells: Array<number> = []) => {
    const rez = [...cells];
    if (ind != null && ind > -1 && ind < cells.length) {
      rez[ind] = value;
    }
    return rez;
  };
