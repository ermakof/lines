import { createContext } from 'react';
import initialState from '@src/initialState';
import { IAction } from '@src/model/';

export default createContext<{
  state: typeof initialState;
  dispatch: (action: IAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});
