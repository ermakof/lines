import { ICellsProps } from '@src/App/model/ICellsProps';

export const addNewCellsToGameField = (
  gameData: Array<number>,
  highlightedCells: ICellsProps
): Array<number> => {
  const gameFieldData: Array<number> = [...gameData];
  Object.keys(highlightedCells).forEach((num) => {
    gameFieldData[Number(num)] = Math.floor(Math.random() * 3 + 1);
  });
  return gameFieldData;
};
