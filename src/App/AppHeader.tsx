import React, { FC, memo } from 'react';
import Panel from '@src/layout/Panel';
import AppRouter from '@src/App/AppRouter';
import styled from '@emotion/styled';

const Root = styled(Panel)`
  width: 100%;
`;

const AppHeader: FC = () => (
  <Root role="topPanel">
    <AppRouter />
  </Root>
);

export default memo(AppHeader);
