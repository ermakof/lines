import React, { FC } from 'react';
import styled from '@emotion/styled';
import GameField from '@src/modules/GameField';

const Root = styled.div`
  height: 80vh;
  position: relative;
`;

const AppBody: FC = () => {
  return (
    <Root role="gamePanel">
      <GameField />
    </Root>
  );
};

export default AppBody;
