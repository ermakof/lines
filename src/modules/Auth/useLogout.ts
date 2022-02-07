import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authSlice from '@src/modules/Auth/authSlice';
import appSlice from '@src/App/appSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return () => {
    const {
      actions: { logout },
    } = authSlice;
    const {
      actions: { initApp },
    } = appSlice;

    dispatch(logout());
    dispatch(initApp());
    navigate('/', { replace: true });
  };
};

export default useLogout;
