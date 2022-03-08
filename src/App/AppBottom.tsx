import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import Panel from '@src/layout/Panel';
import styled from '@emotion/styled';
import { TRootState } from '@src/store';
import Percentage from '@src/components/Percentage';
import Score from '@src/components/Score';

interface IRoot {
  active: boolean;
}
const Root = styled.div<IRoot>`
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const AppBottom: FC = () => {
  const { gameFieldData, score = 0 } = useSelector(({ app }: TRootState) => app);
  const isAuthorised = useSelector(({ auth }: TRootState) => !!auth.userProfile);

  return (
    <Root active={isAuthorised}>
      <Panel role="bottomPanel">
        <Score value={score} />
        <Percentage data={gameFieldData} />
      </Panel>
    </Root>
  );
};

export default memo(AppBottom);
