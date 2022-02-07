import React, { FC } from 'react';
import styled from '@emotion/styled';

const Title = styled.p`
  font-size: 20px;
  line-height: 30px;
  margin-right: 20px;
`;

interface IAuthStatus {
  login: string;
}
const AuthStatus: FC<IAuthStatus> = ({ login = '' }) => {
  if (!login) {
    return <Title>Lines</Title>;
  }

  return <Title>{`Игрок: ${login}`}</Title>;
};

export default AuthStatus;
