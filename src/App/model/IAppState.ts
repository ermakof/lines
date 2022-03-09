import { ICellsProps } from '@src/App/model/ICellsProps';
import { TUserList } from '@src/modules/HitParade/models';

export interface IAppState {
  isLoading?: boolean;
  gameFieldPercentFilled?: number;
  gameFieldData: Array<number>;
  highlightedCells?: ICellsProps;
  colorCells?: ICellsProps;
  score?: number;
  selectedCell?: number;
  userLevel?: string;
  hitParade?: TUserList;
}
