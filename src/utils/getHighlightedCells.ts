import { ICellsProps } from '@src/App/model/ICellsProps';

export const getHighlightedCells = (cells: Array<number>): ICellsProps => {
  const highlightedCells: ICellsProps = {};
  cells.forEach((id) => {
    highlightedCells[id] = '';
  });
  return highlightedCells;
};
