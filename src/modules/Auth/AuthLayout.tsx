/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { TRootState } from '@src/store';
import GameTitle from '@src/components/GameTitle';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '@src/components/Loading';

const Root = styled.div`
  display: flex;
  width: 100%;
`;

interface IAuthLayout {
  login: string;
}
const AuthLayout: FC<IAuthLayout> = ({ login = '' }) => {
  const { isLoading } = useSelector(({ app }: TRootState) => app);
  let navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate('/', { replace: true });
    }
  }, [login]);

  return (
    <Root>
      <GameTitle />
      <Outlet />
      {isLoading && <Loading />}
    </Root>
  );
};

export default AuthLayout;
