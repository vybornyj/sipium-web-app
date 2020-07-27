type with0 = (num: string | number) => string

const with0: with0 = num => `${num > 9 ? '' : 0}${num}`

type PrettyYmdhm = (date: number | string | Date) => string

export const prettyYmdhm: PrettyYmdhm = date => {
  const d = new Date(date)
  return `${d.getFullYear()}.${with0(d.getMonth() + 1)}.${with0(d.getDate())} ${with0(d.getHours())}:${with0(d.getMinutes())}`
}
