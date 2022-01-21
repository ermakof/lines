const createIndexArrayBySize = (size: number = 0) =>
  Object.keys([...Array(size)]).map((v) => parseInt(v));

export default createIndexArrayBySize;
