export function getDateUtcFormat(date: Date): Date {
  console.log('Data: ' + date);
  const dateUtc = new Date(date.getTime() + date.getTimezoneOffset());
  console.log('Nova Data: ' + dateUtc);

  return dateUtc;
}
