type urlJoiner = (base: string, params: [string, string][]) => string

export const urlJoiner: urlJoiner = (base, params) => {
  let joinedParams: string[] = []

  params.map(el => (joinedParams = [...joinedParams, el.join('=')]))

  return [base, joinedParams.join('&')].join('?')
}
