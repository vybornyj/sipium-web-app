type getDateIsoString = (date: Date, without?: 'withoutSeconds' | 'withoutMilliseconds') => string

export const localDateToUtcString: getDateIsoString = (date, without) => {
  const utc = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    without === 'withoutSeconds' ? 0 : date.getSeconds(),
    without === 'withoutSeconds' || without === 'withoutMilliseconds' ? 0 : date.getMilliseconds()
  )

  return new Date(utc).toISOString()
}
