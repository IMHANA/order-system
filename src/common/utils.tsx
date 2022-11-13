export const checkTime = (time: string) => {
  if (time.length === 1) return "0" + time;
  return time;
};

export const dateFormat = (date: string) => {
  if (!date) return "";
  let newDate = new Date(date).toISOString().replace("T", "");
  let returnDate =
    newDate.substring(0, 10) +
    " " +
    checkTime(newDate.substring(11, 12)) +
    ":" +
    checkTime(newDate.substring(14, 15));
  return returnDate;
};
