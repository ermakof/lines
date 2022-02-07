const getPosByInd = (ind: number, size: number): [number, number] => {
  const y = Math.ceil(ind / size);
  const x = ind - (y - 1) * size;
  return [x, y];
};

export default getPosByInd;
