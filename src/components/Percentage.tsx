import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

const Message = styled.p`
  margin: auto 20px;
`;

interface IPercentage {
  data: Array<number>;
}
const Percentage: FC<IPercentage> = ({ data = [] }) => {
  const getCurrentPercent = () => {
    const countFilled = data.filter((value: number) => !!value).length;
    const countAll = data.length;
    return ((countFilled / countAll) * 100 || 0).toFixed(2);
  };

  return (
    <Message role="messagePercentFilled">{`Процент заполнения: ${getCurrentPercent()}`}</Message>
  );
};

export default memo(Percentage);
