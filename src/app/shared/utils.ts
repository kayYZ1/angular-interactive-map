
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

export function addDaysToDate(date: string) {
  let formattedDate = convertToDate(date);
  let result = new Date();
  result.setDate(formattedDate.getDate() + 1);
  console.log(result)

  let d = result.toJSON().slice(0, 10);
  let nDate = d.slice(0, 4) + '-'
    + d.slice(5, 7) + '-'
    + d.slice(8, 10);

  console.log(nDate)
  return nDate;
}

function convertToDate(dateString: string) {
  let d = dateString.split("/");
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return dat;
}

export function generateId() {
  return Math.floor(Math.random() * 10000);
}