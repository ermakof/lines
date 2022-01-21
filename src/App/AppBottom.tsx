import React, { FC, memo, useContext } from 'react';
import Panel from '@src/layout/Panel';
import styled from '@emotion/styled';
import store from '@src/store';

interface IRoot {
  active: boolean;
}
const Root = styled.div<IRoot>`
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const Message = styled.p`
  margin: auto 20px;
`;

const AppBottom: FC = () => {
  const { state } = useContext(store);
  const { gameFieldPercentFilled, userProfile } = state;

  return (
    <Root active={!!userProfile}>
      <Panel role="bottomPanel">
        <Message role="messageResult">Результат:</Message>
        <Message role="messagePercentFilled">{`Процент заполнения: ${gameFieldPercentFilled}`}</Message>
      </Panel>
    </Root>
  );
};

export default memo(AppBottom);
