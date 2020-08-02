// use at client-side, before send to server-side
// use at server-side to convert Date to string (maybe sometimes, but maybe better: date.toISOString())

type getDateIsoString = (date: Date, format?: 'withoutSeconds' | 'withoutMilliseconds') => string

export const localDateToUtcString: getDateIsoString = (date, format) => {
  const utc = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    format === 'withoutSeconds' ? 0 : date.getSeconds(),
    format === 'withoutSeconds' || format === 'withoutMilliseconds' ? 0 : date.getMilliseconds()
  )

  return new Date(utc).toISOString()
}
