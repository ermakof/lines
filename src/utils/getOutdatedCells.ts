import { ICellsProps } from '@src/App/model/ICellsProps';

export const getOutdatedCells = (chains: Array<Array<number>>, direction: 'X' | 'Y' | '' = 'X') =>
  chains.reduce((rez, chain) => {
    return chain.reduce((acc: ICellsProps, cur) => {
      acc[cur] = direction;
      return acc;
    }, rez);
  }, {});
