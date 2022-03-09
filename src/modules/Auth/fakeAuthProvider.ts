import { IUserInfo } from '@src/modules/Auth/AuthForm';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import { uuidv4 } from '@src/utils';

const LOCAL_STORAGE_AUTH_KEY = 'lines:userProfile';

/**
 * This represents some generic auth provider API.
 */
const signIn = (userInfo: IUserInfo | undefined): Promise<IUserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!userInfo) {
          throw 'Нет данных о пользователе!';
        }
        const loginTime = new Date().getTime();
        let userProfile: IUserProfile = { ...userInfo, token: uuidv4(), loginTime };
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(userProfile));
        resolve(userProfile);
      } catch (err) {
        reject(err as string);
      }
    }, 500); // fake async
  });
};

const signOut = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      resolve(true);
    }, 500); // fake async
  });
};

export { signIn, signOut };
