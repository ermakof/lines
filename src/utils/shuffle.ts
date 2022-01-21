const shuffle = (array: Array<number>) => {
  const rez = [...array];
  for (let i = rez.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = rez[i];
    rez[i] = rez[j];
    rez[j] = temp;
  }
  return rez;
};

export default shuffle;
