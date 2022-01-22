import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@src/store';
import App from '@src/App';

const Root = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
};

export default Root;
