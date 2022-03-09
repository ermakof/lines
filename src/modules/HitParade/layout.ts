import styled from '@emotion/styled';

export const ColTime = styled.div`
  width: 50%;
`;

export const ColUser = styled.div`
  width: 30%;
`;

export const ColScore = styled.div`
  width: 15%;
`;

export const ColWinner = styled.div`
  width: 10%;
`;

interface IRow {
  winner?: number;
  highlighted?: boolean;
}
export const Row = styled.div<IRow>`
  display: flex;
  line-height: 40px;
  ${({ winner }) => (winner === 1 ? 'color: #ffff00;' : '')}
  ${({ winner }) => (winner === 2 ? 'color: #c0c0c0;' : '')}
  ${({ winner }) => (winner === 3 ? 'color: #a52a2a;' : '')}
  ${({ highlighted }) => (highlighted ? 'background: #aaaaaa45;' : '')}
`;
