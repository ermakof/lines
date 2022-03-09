import React, { FC, memo } from 'react';
import { TUserList } from '@src/modules/HitParade/models';
import Grid from '@src/layout/Grid';
import { sortByScore } from '@src/modules/HitParade/utils';
import PlayerListHeader from '@src/modules/HitParade/PlayerListHeader';
import PlayerListRow from '@src/modules/HitParade/PlayerListRow';

interface IPlayerList {
  list: TUserList;
  loginTime?: number;
}
const PlayerList: FC<IPlayerList> = ({ list, loginTime }) => {
  const userList = Object.values(list).sort(sortByScore);
  return (
    <Grid role="grid">
      <PlayerListHeader />
      {userList.map((user, ind) => {
        return (
          <PlayerListRow
            key={user.ts}
            user={user}
            winner={ind + 1}
            highlighted={user.ts === loginTime}
          />
        );
      })}
    </Grid>
  );
};

export default memo(PlayerList);
