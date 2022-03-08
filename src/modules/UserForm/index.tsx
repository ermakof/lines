/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Panel from '@src/layout/Panel';
import { actions as appActions } from '@src/App/appSlice';
import { TRootState } from '@src/store';
import FormControls from '@src/modules/UserForm/FormControls';

const UserForm: FC = () => {
  const { userLevel } = useSelector(({ app }: TRootState) => app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.rehydrate());
  }, []);

  return (
    <Panel role="userForm">
      <FormControls userLevel={userLevel} />
    </Panel>
  );
};

export default memo(UserForm);
