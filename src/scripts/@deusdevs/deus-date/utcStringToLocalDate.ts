type utcStringToLocalDate = (date: string) => Date

export const utcStringToLocalDate: utcStringToLocalDate = date => {
  const utc = new Date(date)
  return new Date(
    utc.getUTCFullYear(),
    utc.getUTCMonth(),
    utc.getUTCDate(),
    utc.getUTCHours(),
    utc.getUTCMinutes(),
    utc.getUTCSeconds(),
    utc.getUTCMilliseconds()
  )
}
