import React, { useContext } from 'react';
import store from '@src/store';
import styled from '@emotion/styled';

const Title = styled.p`
  font-size: 32px;
  margin: auto 20px auto 0;
`;

const AuthStatus = () => {
  const { state } = useContext(store);

  if (!state.userProfile) {
    return <Title>Lines</Title>;
  }

  return <Title>{`Lines ${state.userProfile.login}`}</Title>;
};

export default AuthStatus;
