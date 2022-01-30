export default (ind: number | undefined, value: number = 1) =>
  (cells: Array<number> = []) => {
    const rez = [...cells];
    if (ind != undefined && ind > -1 && ind < cells.length) {
      rez[ind] = value;
    }
    return rez;
  };
