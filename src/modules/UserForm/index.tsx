/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Panel from '@src/layout/Panel';
import { actions as appActions } from '@src/App/appSlice';
import FormControls from '@src/modules/UserForm/FormControls';
import { getApp } from '@src/App/appSaga';
import { getAuth } from '@src/modules/Auth/authSaga';
import styled from '@emotion/styled';
import { actions as authActions } from '@src/modules/Auth/authSlice';
import Button from '@src/components/Button';

const Root = styled(Panel)`
  width: 66%;
  justify-content: left;
`;

const LogoutButton = styled(Button)`
  margin-left: auto;
`;

const UserForm: FC = () => {
  const { userLevel } = useSelector(getApp);
  const { userProfile } = useSelector(getAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.rehydrate());
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout(userProfile.loginTime));
  };

  return (
    <Root role="userForm">
      <FormControls userLevel={userLevel} userProfile={userProfile} />
      <LogoutButton role="buttonLogout" onClick={handleLogout} title="Выйти" />
    </Root>
  );
};

export default memo(UserForm);
