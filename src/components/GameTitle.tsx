import React, { FC } from 'react';
import styled from '@emotion/styled';

const Title = styled.p`
  font-size: 28px;
  line-height: 36px;
  margin: auto 20px;
  width: 34%;
`;

const GameTitle: FC = () => <Title role="gameTitle">Lines</Title>;

export default GameTitle;
