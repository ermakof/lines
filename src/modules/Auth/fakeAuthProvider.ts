import { IUserInfo } from '@src/modules/Auth/AuthForm';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import { uuidv4 } from '@src/utils';
import { LOCAL_STORAGE_AUTH_KEY } from '@src/store';

/**
 * This represents some generic auth provider API.
 */
const signIn = (userInfo: IUserInfo): Promise<IUserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let userProfile: IUserProfile = { ...userInfo, token: uuidv4() };
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(userProfile));
        resolve(userProfile);
      } catch (err) {
        reject(new Error('Ошибка получения данных!'));
      }
    }, 500); // fake async
  });
};

const signOut = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        resolve(true);
      } catch (err) {
        reject(new Error('Ошибка очистки данных!'));
      }
    }, 500); // fake async
  });
};

const getUserProfileFormLocalStorage = () => {
  const lsUserProfile = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (lsUserProfile) {
    const userProfile: IUserProfile = JSON.parse(lsUserProfile);
    if (userProfile.login && userProfile.password && userProfile.token) {
      return userProfile;
    }
  }
  return null;
};

export { getUserProfileFormLocalStorage, signIn, signOut };
