type HotReplacer = (string: string) => string

export const hotReplacerEnName: HotReplacer = (string) => {
  return string.length > 0 && string[0] !== ' '
    ? string
        .replace(/[^. A-Za-z]/g, '')
        .replace(/ {2,}/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .slice(0, 32)
    : ''
}

export const hotReplacerHeightWeight: HotReplacer = (string) => {
  return string.length > 0 && string[0] !== ' ' ? string.replace(/[^0-9]/g, '').slice(0, 3) : ''
}

export const hotReplacerRu: HotReplacer = (string) => {
  return string.length > 0 && string[0] !== ' '
    ? string
        .replace(/[^\-‐‑‒–—―`!?@#$%^&*()+№:=<>{}'",. 0-9А-ЯЁа-яё]/g, '')
        .replace(/[-‐‑‒–—―]/g, '–')
        .replace(/ {2,}/g, ' ')
    : ''
}

export const hotReplacerUrl: HotReplacer = (string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/[^\-0-9a-z]/g, '-')
    .replace(/-{2,}/g, '-')
}

export const hotReplacerPrice: HotReplacer = (string) => {
  if (string && string[0] === '.') return ''
  if (string && string[0] === '0') {
    if (typeof string[1] === 'string') {
      return string[1]
    }
    return ''
  }
  let q = string
  if (q.includes('.')) {
    const arr = q.split('.')
    q = `${arr[0].replace(/[^0-9]/g, '')}.`
    if (arr[1][0]) q += arr[1][0].replace(/[^0-9]/g, '')
    if (arr[1][1]) q += arr[1][1].replace(/[^0-9]/g, '')
  } else {
    q = q.replace(/[^0-9]/g, '')
  }
  return q
}
