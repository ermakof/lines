import { IHighlightedCells } from '@src/App/model/IHighlightedCells';

export const getOutdatedCells = (chains: Array<Array<number>>) =>
  chains.reduce((rez, chain) => {
    return chain.reduce((acc: IHighlightedCells, cur) => {
      acc[cur] = '#00ff00';
      return acc;
    }, rez);
  }, {});
