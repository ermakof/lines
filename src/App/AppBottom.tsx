import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import Panel from '@src/layout/Panel';
import styled from '@emotion/styled';
import { TRootState } from '@src/store';

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
  const { gameFieldPercentFilled, userProfile } = useSelector(({ app }: TRootState) => app);

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
