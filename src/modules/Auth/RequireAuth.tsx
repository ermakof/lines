import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
  login: string;
  children: JSX.Element;
}
const RequireAuth: FC<IRequireAuth> = ({ children, login }) => {
  let location = useLocation();

  if (!login) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
