import IPayload from './IPayload';
import { IState } from '@src/model/IState';

export interface IAction {
  type: string;
  payload?: IPayload | IState;
}
