import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';

import Panel from '@src/layout/Panel';
import Button from '@src/components/Button';
import appSlice from '@src/App/appSlice';
import Select from '@src/components/Select';
import { fakeAuthProvider } from '@src/modules/Auth/fakeAuthProvider';
import useWait from '@src/App/useWait';
import useLogout from '@src/modules/Auth/useLogout';

const UserForm: FC = () => {
  const dispatch = useDispatch();
  const wait = useWait();
  const logout = useLogout();
  const {
    actions: { resetApp, setUserLevel },
  } = appSlice;

  const handleReset = () => {
    dispatch(resetApp());
  };

  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    dispatch(setUserLevel(value));
  };

  const handleLogout = () => {
    wait();
    fakeAuthProvider.signOut(() => {
      logout();
      wait(false);
    });
  };

  return (
    <Panel role="userForm">
      <Button role="buttonReset" onClick={handleReset} title="Reset" />
      <Select onSelect={handleSelectLevel} />
      <Button role="buttonLogout" onClick={handleLogout} title="Выйти" />
    </Panel>
  );
};

export default memo(UserForm);
