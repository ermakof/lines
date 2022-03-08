import React from 'react';
import styled from '@emotion/styled';
import { FC } from 'react';

const levelList = [
  { id: '1', name: 'Падаван' },
  { id: '2', name: 'Джедай' },
  {
    id: '3',
    name: 'Член Совета Силы',
  },
];

const Root = styled.div`
  display: flex;

  select {
    height: 30px;
    margin: auto 5px;
  }

  p {
    margin: auto 0;
  }
`;

export interface ISelect {
  onSelect?: (level: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedLevel?: string;
  options?: Array<{ id: string; name: string }>;
}
const Select: FC<ISelect> = ({ onSelect, selectedLevel, options = levelList }) => {
  return (
    <Root>
      <p>Уровень</p>
      <select value={selectedLevel} role="select" name="select" onChange={onSelect}>
        {options.map((level) => (
          <option key={level.id} role="option" value={level.id}>
            {level.name}
          </option>
        ))}
      </select>
    </Root>
  );
};

export default Select;
