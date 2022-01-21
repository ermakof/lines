import React, { FC, useContext } from 'react';
import store from '@src/store';
import AuthStatus from '@src/modules/Auth/AuthStatus';
import { Outlet } from 'react-router-dom';
import Loading from '@src/components/Loading';
import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
`;

const AuthLayout: FC = () => {
  const { state } = useContext(store);
  return (
    <Root>
      <AuthStatus />
      <Outlet />
      {state.isLoading && <Loading />}
    </Root>
  );
};

export default AuthLayout;
