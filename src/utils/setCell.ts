export default (ind: number | undefined, value: Readonly<number> = 1) =>
  (cells: ReadonlyArray<number> = []) => {
    const rez = [...cells];
    if (ind != null && ind > -1 && ind < cells.length) {
      rez[ind] = value;
    }
    return rez;
  };
