import { IOutdatedCells } from '@src/App/model/IOutdatedCells';

export const getOutdatedCells = (chains: Array<Array<number>>) =>
  chains.reduce((rez, chain) => {
    return chain.reduce((acc: IOutdatedCells, cur) => {
      acc[cur] = true;
      return acc;
    }, rez);
  }, {});
