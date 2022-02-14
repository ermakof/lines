import { ICellsProps } from '@src/App/model/ICellsProps';

export const addNewCellsToGameField = (gameData: Array<number>, highlightedCells: ICellsProps) => {
  const gameFieldData: Array<number> = [...gameData];
  Object.keys(highlightedCells).forEach((num) => {
    gameFieldData[num as unknown as number] = Math.floor(Math.random() * 3 + 1);
  });
  return gameFieldData;
};
