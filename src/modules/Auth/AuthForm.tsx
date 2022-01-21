import React, { FC, useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import { waitOn, waitOff } from '@src/App/actions';
import store from '@src/store';
import {
  fakeAuthProvider,
  getUserProfileFormLocalStorage,
} from '@src/modules/Auth/fakeAuthProvider';
import { IUserProfile } from '@src/model';
import useLogin from '@src/modules/Auth/useLogin';

const Root = styled.div`
  label {
    margin-right: 5px;
  }

  button {
    margin: 5px;
  }

  input {
    margin-right: 30px;
    width: 100px;
  }

  form {
    font-size: 14px;
    margin: 3vh 0;
  }
`;

export interface IUserFormProps {
  onSubmit: (values: IAuthData) => void;
}

export type IAuthData = {
  login: string;
  password: string;
};

const AuthForm: FC = () => {
  const { dispatch } = useContext(store);
  const login = useLogin();

  const [authData, setAuthData] = useState<IAuthData>({ login: '', password: '' });

  useEffect(() => {
    const userProfile = getUserProfileFormLocalStorage();
    if (userProfile) {
      login(userProfile);
    }
  }, []);

  const handleSubmit = () => {
    dispatch(waitOn());
    fakeAuthProvider.signIn(authData, (userProfile: IUserProfile) => {
      login(userProfile);
      dispatch(waitOff());
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setAuthData({ ...authData, [id]: value });
  };

  return (
    <Root role="authForm">
      <Formik initialValues={{ ...authData }} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="login">Имя</label>
          <Field
            role="login"
            id="login"
            name="login"
            placeholder="Введите логин"
            value={authData.login}
            onChange={handleChange}
          />

          <label htmlFor="password">Пароль</label>
          <Field
            role="password"
            id="password"
            name="password"
            placeholder="Введите пароль"
            value={authData.password}
            onChange={handleChange}
          />

          <button role="buttonLogin" disabled={!authData.login || !authData.password} type="submit">
            Войти
          </button>
        </Form>
      </Formik>
    </Root>
  );
};

export default AuthForm;
