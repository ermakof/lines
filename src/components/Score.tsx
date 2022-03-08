import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

const Message = styled.p`
  margin: auto 20px;
`;

interface IScore {
  value?: number;
}
const Score: FC<IScore> = ({ value = 0 }) => (
  <Message role="messageResult">{`Результат: ${value}`}</Message>
);

export default memo(Score);
