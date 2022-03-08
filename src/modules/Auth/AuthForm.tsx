/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';
import { actions } from '@src/modules/Auth/authSlice';

const Root = styled.div`
  display: flex;
  font-size: 16px;

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
    margin: auto 0;
  }
`;

export interface IUserFormProps {
  onSubmit: (values: IUserInfo) => void;
}

export type IUserInfo = {
  login: string;
  password: string;
};

const AuthForm: FC = () => {
  const dispatch = useDispatch();
  const { setUser } = actions;

  const [userInfo, setUserInfo] = useState<IUserInfo>({ login: '', password: '' });

  const handleSubmit = () => {
    dispatch(setUser(userInfo));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const isDisabled = !userInfo.login.trim() || !userInfo.password.trim();

  return (
    <Root role="authForm">
      <Formik initialValues={{ ...userInfo }} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="login">Имя</label>
          <Field
            role="login"
            id="login"
            name="login"
            placeholder="Введите логин"
            value={userInfo.login}
            onChange={handleChange}
          />

          <label htmlFor="password">Пароль</label>
          <Field
            role="password"
            id="password"
            name="password"
            placeholder="Введите пароль"
            value={userInfo.password}
            onChange={handleChange}
          />

          <button role="buttonLogin" disabled={isDisabled} type="submit">
            Войти
          </button>
        </Form>
      </Formik>
    </Root>
  );
};

export default AuthForm;
