import { IAuthData } from '@src/modules/Auth/AuthForm';
import IUserProfile from '@src/modules/Auth/model/IUserProfile';
import { uuidv4 } from '@src/utils';

/**
 * This represents some generic auth provider API.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(authData: IAuthData, callback: (userProfile: IUserProfile) => void) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(() => {
      let userProfile: IUserProfile = { ...authData, token: uuidv4() };
      localStorage.setItem('lines:userProfile', JSON.stringify(userProfile));
      callback(userProfile);
    }, 500); // fake async
  },
  signOut(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    localStorage.removeItem('lines:userProfile');
    setTimeout(callback, 100);
  },
};

const getUserProfileFormLocalStorage = () => {
  const lsUserProfile = localStorage.getItem('lines:userProfile');
  if (lsUserProfile) {
    const userProfile: IUserProfile = JSON.parse(lsUserProfile);
    if (userProfile.login && userProfile.password && userProfile.token) {
      return userProfile;
    }
  }
  return null;
};

export { fakeAuthProvider, getUserProfileFormLocalStorage };
