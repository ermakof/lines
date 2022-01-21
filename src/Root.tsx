import React, { StrictMode, useReducer } from 'react';
import reducer from '@src/reducer';
import initialState from '@src/initialState';
import Store from '@src/store';
import App from '@src/App';

const Root = () => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StrictMode>
      <Store.Provider value={{ dispatch, state }}>
        <App />
      </Store.Provider>
    </StrictMode>
  );
};

export default Root;
