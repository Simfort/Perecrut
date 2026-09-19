export const getIntervalsHours = (interval: number) => {
  let time = "00:00";
  const hours = [time];

  while (Number(time.split(":")[0]) < 24) {
    const splitted = time.split(":");
    let first = Number(splitted[0]);
    const minutes = Number(splitted[1]);
    let last = minutes + interval;

    while (last >= 60) {
      const other = last - 60;
      last = other;
      first++;
    }
    if (first > 24) break;
    time = `${first < 10 ? "0" + first : first}:${last < 10 ? "0" + last : last} `;
    hours.push(time);
  }
  return hours;
};
