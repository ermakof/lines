import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { CELL_SIZE } from '@src/modules/Cell/constatnts';
import { actions } from '@src/App/appSlice';

interface IContainer {
  isRight?: boolean;
  isLeft?: boolean;
  isBottom?: boolean;
}
const Container = styled.div<IContainer>`
  display: block;
  width: ${({ isRight }) => CELL_SIZE - (isRight ? 2 : 1)}px;
  height: ${({ isBottom }) => CELL_SIZE - (isBottom ? 2 : 1)}px;
  text-align: center;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: ${({ isRight }) => `1px solid ${isRight ? '#ddd' : ''};`}
  border-bottom: ${({ isBottom }) => `1px solid ${isBottom ? '#ddd' : ''};`}
  float: left;
  ${({ isLeft }) => (isLeft ? 'clear: both;' : '')}
  transition-property: background;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  background: #555;
  background: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: white #9e9e9e #9e9e9e white;  
`;

interface IContent {
  selected?: boolean;
  highlighted?: string;
}
const Content = styled.div<IContent>`
  cursor: pointer;
  background: #ffff00;
  border-radius: 50%;
  background: ${({ selected, highlighted }) =>
    !highlighted ? '#ffff0070' : selected ? '#ffff00' : highlighted};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 0.6vh solid transparent;
  border-color: ${({ selected }) => (selected ? '#555' : '#9e9e9e')};

  ${({ highlighted }) => (!highlighted ? ':hover {background: #ffff00;}' : '')}
`;

export interface CellProps {
  num: number;
  isFilled?: number;
  isSelected: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  isBottom?: boolean;
  highlighted: string;
}

const Cell: React.FC<CellProps> = ({
  num,
  isFilled = 0,
  isSelected = false,
  isLeft = true,
  isRight = true,
  highlighted = '',
}) => {
  const dispatch = useDispatch();

  const handleSelectCell = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!highlighted) {
      dispatch(actions.setSelectedCell(!isSelected ? num : undefined));
    }
  };

  const handleSelectContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isSelected && !highlighted) {
      dispatch(actions.startGameSteps(num));
    }
  };

  return (
    <Container
      role={`cellContainer-${num}`}
      isRight={isRight}
      isLeft={isLeft}
      onClick={handleSelectContainer}
    >
      {!!isFilled && (
        <Content
          role={`cellContent-${num}`}
          selected={isSelected}
          onClick={handleSelectCell}
          highlighted={highlighted}
        />
      )}
    </Container>
  );
};

export default Cell;
