import IUserProfile from '@src/modules/Auth/model/IUserProfile';

export interface IState {
  isLoading?: boolean;
  gameFieldSize: number;
  gameFieldPercentFilled: number;
  gameFieldData: Array<number>;
  selectedCell?: number;
  userLevel: string;
  userProfile?: IUserProfile;
}
