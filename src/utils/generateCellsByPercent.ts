import generateCellsByCount from '@src/utils/generateCellsByCount';

const generateCellsByPercent = (fillPercent: number) => (randomArray: Array<number>) => {
  let countFilledCells = parseInt(((randomArray.length * fillPercent) / 100).toFixed(), 10);
  return generateCellsByCount(countFilledCells)(randomArray);
};

export default generateCellsByPercent;
