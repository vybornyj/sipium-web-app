import { getUtcDateParams } from 'src/scripts/@deusdevs/deus-date'

type renderPrettyUtcDate = (date: number | string | Date) => string

export const renderPrettyUtcDate: renderPrettyUtcDate = date => {
  const { y, m, d, h, mi } = getUtcDateParams(date)
  return `${y}.${m}.${d} ${h}:${mi}`
}
