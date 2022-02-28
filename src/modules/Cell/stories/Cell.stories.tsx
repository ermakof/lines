import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Cell from '../index';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { store } from '@src/store';
import { actions } from '@src/App/appSlice';

export default {
  component: Cell,
  decorators: [withKnobs],
  title: 'Modules/Cell',
} as ComponentMeta<typeof Cell>;

store.dispatch(actions.rehydrate());

const Template: ComponentStory<typeof Cell> = (args) => (
  <Provider store={store}>
    <Cell {...args} />
  </Provider>
);

export const Static = Template.bind({});

Static.args = {
  num: number('num', 3),
  isSelected: boolean('isSelected', false),
  isRight: boolean('isRight', true),
  isLeft: boolean('isLeft', true),
};

export const Dynamic: FC = () => {
  const num = number('num', 3);

  return (
    <Provider store={store}>
      <Cell
        num={num}
        filled={number('filled', 1)}
        isSelected={boolean('status', true)}
        isRight={boolean('isRight', true)}
        isLeft={boolean('isLeft', true)}
        highlighted=""
      />
    </Provider>
  );
};
