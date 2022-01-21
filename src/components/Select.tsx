import React from 'react';
import styled from '@emotion/styled';
import { FC } from 'react';

const Root = styled.select`
  height: 30px;
  margin: auto 20px;
`;

export interface ISelect {
  onSelect?: (level: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: FC<ISelect> = ({ onSelect }) => {
  return (
    <Root role="select" name="select" onChange={onSelect}>
      <option role="option" value="1" defaultValue="1">
        Падаван
      </option>
      <option role="option" value="2">
        Джедай
      </option>
      <option role="option" value="3">
        Мастер-джедай
      </option>
      <option role="option" value="4">
        Член Совета Силы
      </option>
    </Root>
  );
};

export default Select;
