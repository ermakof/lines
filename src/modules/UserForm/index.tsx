/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Panel from '@src/layout/Panel';
import Button from '@src/components/Button';
import { actions as appActions } from '@src/App/appSlice';
import { actions as authActions } from '@src/modules/Auth/authSlice';
import Select from '@src/components/Select';
import { TRootState } from '@src/store';

const UserForm: FC = () => {
  const { userLevel } = useSelector(({ app }: TRootState) => app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.rehydrate());
  }, []);

  const handleReset = () => {
    dispatch(appActions.resetApp());
  };

  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    dispatch(appActions.setUserLevel(value));
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Panel role="userForm">
      <Button role="buttonReset" onClick={handleReset} title="Сброс" />
      <Select onSelect={handleSelectLevel} selectedLevel={userLevel} />
      <Button role="buttonLogout" onClick={handleLogout} title="Выйти" />
    </Panel>
  );
};

export default memo(UserForm);
