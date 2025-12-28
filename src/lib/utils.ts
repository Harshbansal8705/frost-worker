export function adjustForWeekend(date: Date, allowWeekends: boolean): Date {
  if (allowWeekends) return date;

  const d = new Date(date);
  const day = d.getDay();

  // 0 = Sunday, 6 = Saturday
  if (day === 0) {
    // Sunday -> Monday (+1 day)
    d.setDate(d.getDate() + 1);
  } else if (day === 6) {
    // Saturday -> Monday (+2 days)
    d.setDate(d.getDate() + 2);
  }

  return d;
}

export function getScheduleTime(timeStr: string = "09:00", allowWeekends: boolean = false): Date {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);

  const targetDate = new Date(now);
  targetDate.setUTCHours(hours || 0, minutes || 0, 0, 0);

  // If target time for today has already passed, move to tomorrow
  if (targetDate <= now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  // Check for weekends
  return adjustForWeekend(targetDate, allowWeekends);
}
