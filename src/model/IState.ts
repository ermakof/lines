import ICellInfo from '@src/model/ICellInfo';
import { IUserProfile } from '@src/model/IUserProfile';

export interface IState {
  gameFieldSize: number;
  gameFieldPercentFilled: number;
  gameFieldData: Array<ICellInfo>;
  gameLevel: string;
  selectedCell?: number;
  userProfile?: IUserProfile;
  isLoading?: boolean;
}
