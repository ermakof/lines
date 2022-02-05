import { IHighlightedCells } from '@src/App/model/IHighlightedCells';

export const getHighlightedCells = (cells: Array<number>) => {
  const highlightedCells: IHighlightedCells = {};
  cells.forEach((id) => {
    highlightedCells[id] = true;
  });
  return highlightedCells;
};
