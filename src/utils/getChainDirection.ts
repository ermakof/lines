const getChainDirection = (chains: Array<Array<number>>, fieldSize: number) => {
  let rez: 'X' | 'Y' | '' = '';
  if (Array.isArray(chains) && chains.length) {
    const chain = chains[0];
    if (Array.isArray(chain) && chain.length > 1) {
      rez = chain[0] + 1 === chain[1] ? 'Y' : chain[0] + fieldSize === chain[1] ? 'X' : '';
      return rez;
    }
  }
  return rez;
};

export default getChainDirection;
