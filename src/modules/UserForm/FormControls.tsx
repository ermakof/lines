/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@src/components/Button';
import { actions as appActions } from '@src/App/appSlice';
import Select from '@src/components/Select';
import styled from '@emotion/styled';
import { IUserProfile } from '@src/modules/Auth/model/IUserProfile';

const Root = styled.div`
  display: flex;
  width: 100%;
`;

interface IFormControls {
  userLevel?: string;
  userProfile: IUserProfile;
}
const FormControls: FC<IFormControls> = ({ userLevel, userProfile }) => {
  const dispatch = useDispatch();

  const handleReset = useCallback(() => {
    dispatch(
      appActions.updateHitParadeInfo({
        login: userProfile.login,
        ts: userProfile.loginTime,
        score: 0,
      })
    );
    dispatch(appActions.resetApp());
  }, [userProfile]);

  const handleSelectLevel = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      dispatch(
        appActions.updateHitParadeInfo({
          login: userProfile.login,
          ts: userProfile.loginTime,
          score: 0,
        })
      );
      dispatch(appActions.setUserLevel(value));
    },
    [userProfile]
  );

  return (
    <Root role="formControls">
      <Button role="buttonReset" onClick={handleReset} title="Сброс" />
      <Select onSelect={handleSelectLevel} selectedLevel={userLevel} />
    </Root>
  );
};

export default memo(FormControls);
