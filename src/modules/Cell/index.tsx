import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { CELL_SIZE } from '@src/modules/Cell/constatnts';
import store from '@src/store';
import { setSelectedCell } from '@src/modules/Cell/actions';
import ICellInfo from '@src/model/ICellInfo';

interface IContainer {
  isRight?: boolean;
  isLeft?: boolean;
  isBottom?: boolean;
  frameColor?: string;
}
const Container = styled.div<IContainer>`
  display: block;
  width: ${({ isRight }) => CELL_SIZE - (isRight ? 2 : 1)}px;
  height: ${({ isBottom }) => CELL_SIZE - (isBottom ? 2 : 1)}px;
  text-align: center;
  border-top: ${({ frameColor }) => `1px solid ${frameColor}`};
  border-left: ${({ frameColor }) => `1px solid ${frameColor}`};
  border-right: ${({ isRight, frameColor }) => `1px solid ${isRight ? frameColor : ''};`}
  border-bottom: ${({ isBottom, frameColor }) => `1px solid ${isBottom ? frameColor : ''};`}
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
}
const Content = styled.div<IContent>`
  cursor: pointer;
  background: #ffff00;
  border-radius: 50%;
  background: ${({ selected }) => (selected ? '#ffff00' : '#ffff0070')};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 0.6vh solid transparent;
  border-color: ${({ selected }) => (selected ? '#555' : '#9e9e9e')};

  :hover {
    background: #ffff00;
  }
`;

export interface CellProps {
  num: number;
  isFilled?: ICellInfo;
  isSelected?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  isBottom?: boolean;
}

const Cell: React.FC<CellProps> = ({
  num,
  isFilled = 0,
  isSelected = false,
  isLeft = true,
  isRight = true,
}) => {
  const { dispatch } = useContext(store);

  const handleClick = () => {
    dispatch(setSelectedCell(!isSelected ? num : undefined));
  };
  const frameColor = '#ddd';

  return (
    <Container
      role={`cellContainer-${num}`}
      isRight={isRight}
      isLeft={isLeft}
      frameColor={frameColor}
    >
      {!!isFilled && (
        <Content role={`cellContent-${num}`} selected={isSelected} onClick={handleClick} />
      )}
    </Container>
  );
};

export default Cell;
