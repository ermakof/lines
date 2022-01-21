import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import AppHeader from '@src/App/AppHeader';
import AppBottom from '@src/App/AppBottom';
import AppBody from '@src/App/AppBody';

const Root = styled.div`
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const appGlobal = css`
  body {
    background: #282c34;
    color: white;
    margin: 0;
    padding: 0;
    min-height: '100vh';
    max-width: '100vw';
  }
`;

interface IUser {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export type IUserList = Array<IUser>;

const App: FC = () => (
  <Root role="rootApp">
    <Global styles={appGlobal} />
    <AppHeader />
    <AppBody />
    <AppBottom />
  </Root>
);

export default App;
