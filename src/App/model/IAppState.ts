export interface IAppState {
  isLoading?: boolean;
  gameFieldSize: number;
  gameFieldPercentFilled: number;
  gameFieldData: Array<number>;
  selectedCell?: number;
  userLevel: string;
}
