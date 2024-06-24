
export function getCurrentDate() {
  const today = new Date();
  let date = today.toJSON().slice(0, 10);
  let nDate = date.slice(0, 4) + '-'
    + date.slice(5, 7) + '-'
    + date.slice(8, 10);

  return nDate;
}

export function swapElements(arr: [number, number][], x: number, y: number) {
  [arr[x], arr[y]] = [arr[y], arr[x]];

  return arr;
};
