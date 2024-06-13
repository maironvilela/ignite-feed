export function getDateUtcFormat(date: Date): Date {
  const dateUtc = new Date(date.getTime() + date.getTimezoneOffset());

  return dateUtc;
}
