const filterChainByX = (chains: number[][] | undefined, ind: number) =>
  chains && chains.filter((chain) => chain.indexOf(ind) > -1)[0];

const filterChainByY = (chains: number[][] | undefined, ind: number) =>
  chains && chains.filter((chain) => chain.indexOf(ind) > -1)[0];

const filterChainsByInd = (ind: number) => (chains: number[][][]) => {
  const lineX = filterChainByX(chains[0], ind);
  const lineY = filterChainByY(chains[1], ind);
  const rez = [];
  if (lineX) {
    rez.push(lineX);
  }
  if (lineY) {
    rez.push(lineY);
  }
  return rez;
};

export default filterChainsByInd;
