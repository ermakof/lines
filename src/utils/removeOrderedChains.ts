import getChains from '@src/utils/getChains';

const updateCellsByChains = (chains: number[][], cells: Array<number>) => {
  const rez = [...cells];
  chains.forEach(
    (chain) =>
      chain &&
      chain.forEach((ind) => {
        rez[ind - 1] = 0;
      })
  );
  return rez;
};

const removeOrderedChains = (targetCell: number) => (gameFieldData: Array<number>) => {
  const chains = getChains(targetCell + 1, gameFieldData);
  return updateCellsByChains(chains, gameFieldData);
};

export default removeOrderedChains;
