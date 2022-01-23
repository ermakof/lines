const generateCellsByCount = (countFilledCells: number) => (randomArray: Array<number>) => {
  const rez = randomArray.map(() => 0);
  for (let i = 0; i < countFilledCells; i = i + 1) {
    rez[randomArray[i]] = 1;
  }
  return rez;
};

export default generateCellsByCount;
