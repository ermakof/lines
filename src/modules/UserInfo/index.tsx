/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo } from 'react';

import Title from '@src/layout/Title';
import Grid from '@src/layout/Grid';
import Section from '@src/layout/Section';
import styled from '@emotion/styled';

const Root = styled(Section)`
  background: #282c34;
`;

interface IUserInfo {
  login?: string;
}
const UserInfo: FC<IUserInfo> = ({ login }) => {
  return (
    <Root role="userInfo">
      <Grid role="grid">
        <Title>{`Игрок: ${login || ''}`}</Title>
      </Grid>
    </Root>
  );
};

export default memo(UserInfo);
