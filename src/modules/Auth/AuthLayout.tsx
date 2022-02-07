import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { TRootState } from '@src/store';
import AuthStatus from '@src/modules/Auth/AuthStatus';
import { Outlet } from 'react-router-dom';
import Loading from '@src/components/Loading';

const Root = styled.div`
  display: flex;
`;

const AuthLayout: FC = () => {
  const { isLoading } = useSelector(({ app }: TRootState) => app);

  return (
    <Root>
      <AuthStatus />
      <Outlet />
      {isLoading && <Loading />}
    </Root>
  );
};

export default AuthLayout;
