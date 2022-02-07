import React from 'react';
import { TRootState } from '@src/store';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector(({ auth }: TRootState) => auth);
  let location = useLocation();

  if (!auth.userProfile) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
