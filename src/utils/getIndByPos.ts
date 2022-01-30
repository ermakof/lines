const getIndByPos = (pos: [number, number], size: number): number => {
  return pos[0] + pos[1] * size;
};

export default getIndByPos;
