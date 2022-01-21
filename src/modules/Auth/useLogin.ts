import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import store from '@src/store';
import { IUserProfile } from '@src/model';
import { loginApp, resetApp } from '@src/App/actions';

const useLogin = () => {
  const { dispatch } = useContext(store);
  let navigate = useNavigate();
  let location = useLocation();

  return (userProfile: IUserProfile) => {
    // @ts-ignore
    const from = location.state?.from?.pathname || '/';

    dispatch(loginApp(userProfile));
    dispatch(resetApp());
    navigate(from, { replace: true });
  };
};

export default useLogin;
