import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authSlice from '@src/modules/Auth/authSlice';
import appSlice from '@src/App/appSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  return () => {
    const {
      actions: { logout },
    } = authSlice;
    const {
      actions: { initApp },
    } = appSlice;
    // @ts-ignore
    const from = location.state?.from?.pathname || '/';

    dispatch(logout());
    dispatch(initApp());
    navigate(from, { replace: true });
  };
};

export default useLogout;
