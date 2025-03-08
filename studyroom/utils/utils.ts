function timeToDate(timeString: string) {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
}

export function sortSlots(slots: any) {
  if (!slots) {
    return;
  }

  return slots.sort((a, b) => {
    if (a.from === "12:00 AM") return 1;
    if (b.from === "12:00 AM") return -1;

    const timeA = timeToDate(a.from);
    const timeB = timeToDate(b.from);

    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;

    // If 'from' times are equal, compare 'to' times
    const endA = timeToDate(a.to);
    const endB = timeToDate(b.to);

    if (endA < endB) return -1;
    if (endA > endB) return 1;

    return 0;
  });
}
