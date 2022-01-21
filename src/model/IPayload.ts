import { IUserProfile } from '@src/model/IUserProfile';

interface IPayload {
  selectedCell?: number;
  cellId?: number;
  gameFieldSize?: number;
  gameLevel?: string;
  userProfile?: IUserProfile;
}

export default IPayload;
