import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthForm from '@src/modules/Auth/AuthForm';
import UserForm from '@src/modules/UserForm';
import AuthLayout from '@src/modules/Auth/AuthLayout';
import RequireAuth from '@src/modules/Auth/RequireAuth';
import { TRootState } from '@src/store';

const AppRouter = () => {
  const { userProfile } = useSelector(({ auth }: TRootState) => auth);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout login={userProfile?.login} />}>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/"
            element={
              <RequireAuth login={userProfile?.login}>
                <UserForm />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
