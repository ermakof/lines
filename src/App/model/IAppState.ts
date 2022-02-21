import { ICellsProps } from '@src/App/model/ICellsProps';

export interface IAppState {
  isLoading?: boolean;
  gameFieldPercentFilled?: number;
  gameFieldData: Array<number>;
  highlightedCells?: ICellsProps;
  colorCells?: ICellsProps;
  score?: number;
  selectedCell?: number;
  userLevel?: string;
}
