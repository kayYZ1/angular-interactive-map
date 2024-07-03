
export function getCurrentDate() {
  const today = new Date();
  let date = today.toJSON().slice(0, 10);
  let nDate = date.slice(0, 4) + '-'
    + date.slice(5, 7) + '-'
    + date.slice(8, 10);

  return nDate;
}

export function addDaysToDate(date: string, month: number) {
  let formattedDate = convertToDate(date);
  let result = new Date();

  result.setMonth(month - 1)

  result.setDate(formattedDate.getDate() + 1);

  const newDate = convertToString(result);
  return newDate;
}

function convertToDate(dateString: string) {
  let dateFormat = dateString.split("/");
  let date = new Date(dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0]);
  return date;
}

function convertToString(date: Date) {
  let d = date.toJSON().slice(0, 10);
  let nDate = d.slice(0, 4) + '-'
    + d.slice(5, 7) + '-'
    + d.slice(8, 10);

  return nDate;
}

export function generateId() {
  return Math.floor(Math.random() * 10000);
}