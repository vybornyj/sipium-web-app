type getUtcDateParams = (date: number | string | Date) => { y: string; m: string; d: string; h: string; mi: string; s: string; ms: string }

export const getUtcDateParams: getUtcDateParams = date => {
  const d = new Date(date).toISOString()
  return {
    y: d.substring(0, 4),
    m: d.substring(5, 7),
    d: d.substring(8, 10),
    h: d.substring(11, 13),
    mi: d.substring(14, 16),
    s: d.substring(17, 19),
    ms: d.substring(20, 23)
  }
}
