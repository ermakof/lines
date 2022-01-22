import React from 'react';
import { TRootState } from '@src/store';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLogged = useSelector(({ auth }: TRootState) => !!auth.userProfile);
  let location = useLocation();

  if (!isLogged) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
