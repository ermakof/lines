import React, { FC } from 'react';
import styled from '@emotion/styled';

const Title = styled.p`
  font-size: 32px;
  margin: auto 20px auto 0;
`;

interface IAuthStatus {
  login: string;
}
const AuthStatus: FC<IAuthStatus> = ({ login = '' }) => {
  if (!login) {
    return <Title>Lines</Title>;
  }

  return <Title>{`Lines ${login}`}</Title>;
};

export default AuthStatus;
