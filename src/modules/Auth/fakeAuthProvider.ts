import { IAuthData } from '@src/modules/Auth/AuthForm';
import { IUserProfile } from '@src/model';

function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

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
