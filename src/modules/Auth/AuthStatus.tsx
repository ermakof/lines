import React from 'react';
import { TRootState } from '@src/store';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const Title = styled.p`
  font-size: 32px;
  margin: auto 20px auto 0;
`;

const AuthStatus = () => {
  const { userProfile } = useSelector(({ auth }: TRootState) => auth);

  if (!userProfile) {
    return <Title>Lines</Title>;
  }

  return <Title>{`Lines ${userProfile.login}`}</Title>;
};

export default AuthStatus;
