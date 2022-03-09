import React, { FC } from 'react';
import styled from '@emotion/styled';

import { ICellInfo } from '@src/modules/Cell/models';
import Cell from '@src/modules/Cell';
import { TRootState } from '@src/store';
import { useSelector } from 'react-redux';
import { GAME_FIELD_SIZE } from '@src/App/initialState';
import Section from '@src/layout/Section';

interface IFieldContainer {
  active?: boolean;
}
export const FieldContainer = styled.section<IFieldContainer>`
  margin: auto;
  min-width: 525px;
  z-index: 999;
`;

const Root = styled(Section)`
  background: '#282c34';
`;

const MessageNoData = styled.p`
  height: 80vh;
  position: relative;
  text-align: center;
`;

const GameField: FC = () => {
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
    <Root>
      <FieldContainer role="cellsGrid">
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
    </Root>
  );
};

export default GameField;
