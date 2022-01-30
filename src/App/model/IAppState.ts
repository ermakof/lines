import { IOutdatedCells } from '@src/App/model/IOutdatedCells';

export interface IAppState {
  isLoading?: boolean;
  gameFieldPercentFilled: number;
  gameFieldData: Array<number>;
  outdatedCells?: IOutdatedCells;
  score: number;
  selectedCell?: number;
  userLevel: string;
  minChainLength: number;
}
