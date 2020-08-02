// use at client-side with string date received from server-side
// don't use at client-side with local Date
// use at server-side with any date

import { getUtcDateParams } from 'src/scripts/@deusdevs/deus-date'

type renderPrettyUtcDate = (date: number | string | Date, format?: 'withSeconds' | 'onlyDate' | 'onlyTime' | 'onlyTimeWithSeconds') => string

export const renderPrettyUtcDate: renderPrettyUtcDate = (date, format) => {
  const { y, m, d, h, mi, s } = getUtcDateParams(date)

  if (format === 'withSeconds') {
    return `${y}.${m}.${d} ${h}:${mi}:${s}`
  }

  if (format === 'onlyDate') {
    return `${y}.${m}.${d}`
  }

  if (format === 'onlyTime') {
    return `${h}:${mi}`
  }

  if (format === 'onlyTimeWithSeconds') {
    return `${h}:${mi}:${s}`
  }

  return `${y}.${m}.${d} ${h}:${mi}`
}
