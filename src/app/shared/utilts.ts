export function getCurrentDate() {
  const today = new Date();
  let date = today.toJSON().slice(0, 10);
  let nDate = date.slice(8, 10) + '/'
    + date.slice(5, 7) + '/'
    + date.slice(0, 4);

  return nDate;
}