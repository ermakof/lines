import React, { FC } from 'react';
import styled from '@emotion/styled';
import GameField from '@src/modules/GameField';
import { useSelector } from 'react-redux';
import HitParade from '@src/modules/HitParade';
import UserInfo from '@src/modules/UserInfo';
import { getAuth } from '@src/modules/Auth/authSaga';
import { IAuthState } from '@src/modules/Auth/model/IAuthState';

interface IRoot {
  active?: boolean;
}
const Root = styled.div<IRoot>`
  display: flex;
  height: 80vh;
  position: relative;
  overflow: auto;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const AppBody: FC = () => {
  const auth: IAuthState = useSelector(getAuth);
  return (
    <Root role="bodyPanel" active={!!auth.userProfile}>
      <HitParade />
      <GameField />
      <UserInfo login={auth.userProfile?.login} />
    </Root>
  );
};

export default AppBody;
