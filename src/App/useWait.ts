import { actions } from '@src/App/appSlice';
import { useDispatch } from 'react-redux';

const useWait = () => {
  const dispatch = useDispatch();

  return (flag: boolean = true) => {
    dispatch(flag ? actions.waitOn() : actions.waitOff());
  };
};

export default useWait;
