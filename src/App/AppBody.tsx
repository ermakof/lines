import React, { FC } from 'react';
import styled from '@emotion/styled';
import GameField from '@src/modules/GameField';
import { useSelector } from 'react-redux';
import { TRootState } from '@src/store';

interface IRoot {
  active?: boolean;
}
const Root = styled.div<IRoot>`
  height: 80vh;
  position: relative;
  overflow: auto;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const AppBody: FC = () => {
  const userIsLogged = useSelector(({ auth }: TRootState) => !!auth.userProfile);
  return (
    <Root role="gamePanel" active={userIsLogged}>
      <GameField />
    </Root>
  );
};

export default AppBody;
