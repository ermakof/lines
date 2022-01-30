const getPosByInd = (ind: number, size: number): [number, number] => {
  const y = Math.ceil(ind / size) - 1;
  const x = ind - y * size;
  return [x, y];
};

export default getPosByInd;
