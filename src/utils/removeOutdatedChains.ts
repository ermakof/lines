const removeOutdatedChains = (cells: Array<number>, chains: Array<Array<number>>) => {
  const rez = [...cells];
  const hasChains = chains.length > 0;
  if (hasChains) {
    chains.forEach(
      (chain) =>
        chain &&
        chain.forEach((ind) => {
          rez[ind] = 0;
        })
    );
  }
  return rez;
};

export default removeOutdatedChains;
