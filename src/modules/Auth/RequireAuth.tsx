import React, { useContext } from 'react';
import store from '@src/store';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { state } = useContext(store);
  let location = useLocation();

  if (!state.userProfile) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
