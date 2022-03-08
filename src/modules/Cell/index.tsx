import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { CELL_SIZE } from '@src/modules/Cell/constatnts';
import { actions } from '@src/App/appSlice';
import { ICellsProps } from '@src/App/model/ICellsProps';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }

  70% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, -5px,0);
  }
`;

const color: ICellsProps = {
  1: '#ff0000',
  2: '#ffff00',
  3: '#00ff00',
};
const getColor = (id: number, opacity = ''): string => `${color[id]}${opacity ? opacity : ''}`;

interface IContainer {
  isRight?: boolean;
  isLeft?: boolean;
}
const Container = styled.div<IContainer>`
  position: relative;
  display: block;
  width: ${({ isRight }) => CELL_SIZE - (isRight ? 2 : 1)}px;
  height: ${CELL_SIZE - 1}px;
  text-align: center;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: ${({ isRight }) => `1px solid ${isRight ? '#ddd' : ''};`}
  border-bottom: 1px solid;
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
  filled: number;
}
const Content = styled.div<IContent>`
  cursor: pointer;
  background: #ffff00;
  border-radius: 50%;
  background: ${({ selected, highlighted, filled }) =>
    highlighted && highlighted.substring(0, 1) === '#'
      ? highlighted
      : selected
      ? getColor(filled)
      : getColor(filled, 'a0')};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 10px;
  border: 0.2vh solid transparent;
  border-color: ${({ selected }) => (selected ? '#555' : '#9e9e9e')};

  animation: ${({ selected }) => (selected ? bounce : '')} 1s ease infinite;

  ${({ highlighted, filled }) => (!highlighted ? `:hover {background: ${getColor(filled)};}` : '')}
`;

interface IDestroy {
  direction: string;
}
const Destroy = styled.div<IDestroy>`
  margin-left: -4px;
  height: 2px;
  width: 57px;
  padding: 0;
  position: absolute;
  top: 22px;
  background: #666666;
  ${({ direction }) => (direction === 'X' ? 'transform: rotate(-90deg)' : '')}
`;

export interface CellProps {
  num?: number;
  filled?: number;
  isSelected?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  highlighted?: string;
}

const Cell: React.FC<CellProps> = ({
  num = 0,
  filled = 0,
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
      {filled > 0 && filled < 4 && (
        <>
          <Content
            role={`cellContent-${num}`}
            selected={isSelected}
            onClick={handleSelectCell}
            highlighted={highlighted}
            filled={filled}
          />
          {highlighted && highlighted.substring(0, 1) !== '#' && (
            <Destroy
              role={`cellDestroy-${num}-${highlighted.substring(0, 1)}`}
              direction={highlighted}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Cell;
