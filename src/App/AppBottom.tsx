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
  const { gameFieldData, score = 0 } = useSelector(({ app }: TRootState) => app);
  const isAuthorised = useSelector(({ auth }: TRootState) => !!auth.userProfile);

  const getCurrentPercent = () => {
    const countFilled = gameFieldData.filter((value: number) => !!value).length;
    const countAll = gameFieldData.length;
    return ((countFilled / countAll) * 100).toFixed(2);
  };

  return (
    <Root active={isAuthorised}>
      <Panel role="bottomPanel">
        <Message role="messageResult">{`Результат: ${score}`}</Message>
        <Message role="messagePercentFilled">{`Процент заполнения: ${getCurrentPercent()}`}</Message>
      </Panel>
    </Root>
  );
};

export default memo(AppBottom);
