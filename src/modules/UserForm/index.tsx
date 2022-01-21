import React, { FC, memo, useContext } from 'react';
import Panel from '@src/layout/Panel';
import Button from '@src/components/Button';
import store from '@src/store';
import { clearGameField, logoutApp, resetApp, setLevel, waitOff, waitOn } from '@src/App/actions';
import Select from '@src/components/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import { fakeAuthProvider } from '@src/modules/Auth/fakeAuthProvider';

const UserForm: FC = () => {
  const { dispatch } = useContext(store);

  let navigate = useNavigate();
  let location = useLocation();

  // @ts-ignore
  const from = location.state?.from?.pathname || '/';

  const handleReset = () => {
    dispatch(resetApp());
  };

  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    dispatch(setLevel(value));
  };

  const handleLogout = () => {
    dispatch(waitOn());
    fakeAuthProvider.signOut(() => {
      dispatch(logoutApp());
      dispatch(clearGameField());
      navigate(from, { replace: true });
      dispatch(waitOff());
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
