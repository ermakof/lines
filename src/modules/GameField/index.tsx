import React, { FC } from 'react';
import styled from '@emotion/styled';

import { ICellInfo } from '@src/modules/Cell/models';
import Cell from '@src/modules/Cell';
import { TRootState } from '@src/store';
import { useSelector } from 'react-redux';
import { GAME_FIELD_SIZE } from '@src/App/initialState';

interface IFieldContainer {
  active?: boolean;
}
export const FieldContainer = styled.section<IFieldContainer>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
  width: fit-content;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  min-width: 550px;
  min-height: 550px;
`;

const MessageNoData = styled.p`
  height: 80vh;
  position: relative;
  text-align: center;
`;

const GameField: FC = () => {
  const userIsLogged = useSelector(({ auth }: TRootState) => !!auth.userProfile);
  const {
    gameFieldData,
    selectedCell,
    highlightedCells = {},
  } = useSelector(({ app }: TRootState) => app);
  const widthMinus1 = GAME_FIELD_SIZE - 1;

  if (!gameFieldData.length) {
    return <MessageNoData role="noDataMessage">Нет данных!</MessageNoData>;
  }

  return (
    <FieldContainer role="cellsGrid" active={userIsLogged}>
      {gameFieldData.map((item: ICellInfo, index: number) => {
        const y = Math.floor(index / GAME_FIELD_SIZE);
        const x = index % GAME_FIELD_SIZE;
        const isRight = x === widthMinus1;
        const isLeft = x === 0;
        return (
          <Cell
            key={`${y}-${x}`}
            num={index}
            filled={item}
            isSelected={selectedCell === index}
            isLeft={isLeft}
            isRight={isRight}
            highlighted={highlightedCells[index]}
          />
        );
      })}
      <div style={{ clear: 'both' }} />
    </FieldContainer>
  );
};

export default GameField;
