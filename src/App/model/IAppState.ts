import { IHighlightedCells } from '@src/App/model/IHighlightedCells';

export interface IAppState {
  isLoading?: boolean;
  gameFieldPercentFilled: number;
  gameFieldData: Array<number>;
  highlightedCells?: IHighlightedCells;
  score: number;
  selectedCell?: number;
  userLevel: string;
}
