import React, { FC, memo } from 'react';
import { ColScore, ColTime, ColUser, ColWinner, Row } from '@src/modules/HitParade/layout';

const PlayerListHeader: FC = () => (
  <Row role="header">
    <ColTime role="col">Время</ColTime>
    <ColUser role="col">Имя</ColUser>
    <ColScore role="col">Счет</ColScore>
    <ColWinner role="col">Место</ColWinner>
  </Row>
);

export default memo(PlayerListHeader);
