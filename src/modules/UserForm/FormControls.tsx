/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@src/components/Button';
import { actions as appActions } from '@src/App/appSlice';
import { actions as authActions } from '@src/modules/Auth/authSlice';
import Select from '@src/components/Select';
import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
`;

interface IFormControls {
  userLevel?: string;
}
const FormControls: FC<IFormControls> = ({ userLevel }) => {
  const dispatch = useDispatch();

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
    <Root>
      <Button role="buttonReset" onClick={handleReset} title="Сброс" />
      <Select onSelect={handleSelectLevel} selectedLevel={userLevel} />
      <Button role="buttonLogout" onClick={handleLogout} title="Выйти" />
    </Root>
  );
};

export default memo(FormControls);
