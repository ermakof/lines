import React from 'react';
import styled from '@emotion/styled';
import { FC } from 'react';

const Root = styled.button`
  height: 30px;
  margin: auto 20px;
`;

export interface IButton {
  title?: string;
  onClick?: () => void;
  role?: string;
}
const Button: FC<IButton> = ({ title = 'Button', onClick, role = 'button' }) => {
  return (
    <Root role={role} onClick={onClick}>
      {title}
    </Root>
  );
};

export default Button;
