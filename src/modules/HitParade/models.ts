export interface IUserInfo {
  login: string;
  ts?: number;
  score: number;
}

export type TUserList = Record<number, IUserInfo>;
