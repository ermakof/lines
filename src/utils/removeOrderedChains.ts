const removeOrderedChains = (chains: Array<Array<number>>) => (cells: Array<number>) => {
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
  return { cells: rez, hasChains };
};

export default removeOrderedChains;
