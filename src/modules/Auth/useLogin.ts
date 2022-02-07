import { useNavigate } from 'react-router-dom';

import IUserProfile from '@src/modules/Auth/model/IUserProfile';
import authSlice from '@src/modules/Auth/authSlice';
import appSlice from '@src/App/appSlice';
import { useDispatch } from 'react-redux';

const useLogin = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (userProfile: IUserProfile) => {
    const {
      actions: { login },
    } = authSlice;
    const {
      actions: { resetApp },
    } = appSlice;

    dispatch(login(userProfile));
    dispatch(resetApp());
    navigate('/', { replace: true });
  };
};

export default useLogin;
