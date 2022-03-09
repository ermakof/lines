import { IUserInfo } from '@src/modules/HitParade/models';

export const sortByScore = (a: IUserInfo, b: IUserInfo) => {
  return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
};
