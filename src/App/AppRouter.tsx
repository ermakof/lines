import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthForm from '@src/modules/Auth/AuthForm';
import UserForm from '@src/modules/UserForm';
import AuthLayout from '@src/modules/Auth/AuthLayout';
import RequireAuth from '@src/modules/Auth/RequireAuth';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <UserForm />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
