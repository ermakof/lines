import React, { FC, memo } from 'react';
import Panel from '@src/layout/Panel';
import AppRouter from '@src/App/AppRouter';

const AppHeader: FC = () => (
  <Panel role="topPanel">
    <AppRouter />
  </Panel>
);

export default memo(AppHeader);
