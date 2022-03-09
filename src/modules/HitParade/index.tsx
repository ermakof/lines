/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import Title from '@src/layout/Title';
import Grid from '@src/layout/Grid';
import Section from '@src/layout/Section';
import { TRootState } from '@src/store';
import { TUserList } from '@src/modules/HitParade/models';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';
import PlayerList from '@src/modules/HitParade/PlayerList';
import styled from '@emotion/styled';

const Root = styled(Section)`
  background: #282c34;
`;

const HitParade: FC = () => {
  const hitParade: TUserList = useSelector(({ app }: TRootState) => app.hitParade);
  const userProfile: IUserProfile = useSelector(({ auth }: TRootState) => auth.userProfile || {});

  return (
    <Root role="panelHitParade">
      <Grid role="rootGrid">
        <Title>Хит-парад</Title>
        {hitParade && <PlayerList list={hitParade} loginTime={userProfile.loginTime} />}
      </Grid>
    </Root>
  );
};

export default memo(HitParade);
