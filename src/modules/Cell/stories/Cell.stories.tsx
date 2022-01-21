import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Cell from '../index';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

export default {
  component: Cell,
  decorators: [withKnobs],
  title: 'Modules/Cell',
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Static = Template.bind({});

Static.args = {
  num: number('num', 3),
  isSelected: boolean('isSelected', false),
  isRight: boolean('isRight', true),
  isBottom: boolean('isBottom', true),
  isLeft: boolean('isLeft', true),
};

export const Dynamic: FC = () => {
  const status = boolean('isSelected', false);
  const num = number('num', 3);

  return (
    <Cell
      num={num}
      isSelected={status}
      isRight={boolean('isRight', true)}
      isBottom={boolean('isBottom', true)}
      isLeft={boolean('isLeft', true)}
    />
  );
};
