import { IHighlightedCells } from '@src/App/model/IHighlightedCells';

export const addNewCellsToGameField = (
  gameData: Array<number>,
  highlightedCells: IHighlightedCells
) => {
  const gameFieldData: Array<number> = [...gameData];
  Object.keys(highlightedCells).forEach((num) => {
    gameFieldData[num as unknown as number] = 1;
  });
  return gameFieldData;
};
