import React, { FC, memo } from 'react';
import moment from 'moment-timezone';

import { IUserInfo } from '@src/modules/HitParade/models';
import { ColScore, ColTime, ColUser, ColWinner, Row } from '@src/modules/HitParade/layout';

export interface IPlayerListRow {
  user: IUserInfo;
  winner: number;
  highlighted?: boolean;
}
const PlayerListRow: FC<IPlayerListRow> = ({ user, winner, highlighted = false }) => {
  const time = moment(user.ts).tz('Europe/Moscow').format('DD.MM.YYYY, HH:mm:ss');
  return (
    <Row role="row" winner={winner} highlighted={highlighted}>
      <ColTime role="col">{time}</ColTime>
      <ColUser role="col">{user.login}</ColUser>
      <ColScore role="col">{user.score}</ColScore>
      {winner && <ColWinner data-testid="colWinnerPlace" role="col" />}
    </Row>
  );
};

export default memo(PlayerListRow);
