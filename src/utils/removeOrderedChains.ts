const removeOrderedChains = (props: { cells: Array<number>; chains: number[][] }) => {
  const { cells, chains } = props;
  const rez = [...cells];
  const hasChains = chains.length > 0;
  if (hasChains) {
    chains.forEach(
      (chain) =>
        chain &&
        chain.forEach((ind) => {
          rez[ind - 1] = 0;
        })
    );
  }
  return { cells: rez, hasChains };
};

export default removeOrderedChains;
