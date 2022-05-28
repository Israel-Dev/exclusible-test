export const genRandomRef = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};
