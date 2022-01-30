import { IOutdatedCells } from '@src/App/model/IOutdatedCells';

export interface IAppState {
  isLoading?: boolean;
  gameFieldSize: number;
  gameFieldPercentFilled: number;
  gameFieldData: Array<number>;
  outdatedCells?: IOutdatedCells;
  score: number;
  selectedCell?: number;
  userLevel: string;
  minChainLength: number;
}
