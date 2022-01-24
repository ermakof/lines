const removeOrderedChains = (props: { cells: Array<number>; chains: number[][] }) => {
  const { cells, chains } = props;
  const rez = [...cells];
  const isUpdated = chains.length > 0;
  if (isUpdated) {
    chains.forEach(
      (chain) =>
        chain &&
        chain.forEach((ind) => {
          rez[ind - 1] = 0;
        })
    );
  }
  return { cells: rez, isUpdated };
};

export default removeOrderedChains;
