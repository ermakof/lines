import React, { FC, memo } from 'react';
import moment from 'moment';

import { IUserInfo } from '@src/modules/HitParade/models';
import { ColScore, ColTime, ColUser, ColWinner, Row } from '@src/modules/HitParade/layout';

export interface IPlayerListRow {
  user: IUserInfo;
  winner: number;
  highlighted: boolean;
}
const PlayerListRow: FC<IPlayerListRow> = ({ user, winner, highlighted = false }) => (
  <Row role="row" winner={winner} highlighted={highlighted}>
    <ColTime role="col">{moment(user.ts).format('DD.MM.YYYY, HH:mm:ss')}</ColTime>
    <ColUser role="col">{user.login}</ColUser>
    <ColScore role="col">{user.score}</ColScore>
    <ColWinner role="col">{winner ? winner : ''}</ColWinner>
  </Row>
);

export default memo(PlayerListRow);
