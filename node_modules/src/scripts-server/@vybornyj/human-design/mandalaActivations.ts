const mandalaGatesSequence = [
  17,
  21,
  51,
  42,
  3,
  27,
  24,
  2,
  23,
  8,
  20,
  16,
  35,
  45,
  12,
  15,
  52,
  39,
  53,
  62,
  56,
  31,
  33,
  7,
  4,
  29,
  59,
  40,
  64,
  47,
  6,
  46,
  18,
  48,
  57,
  32,
  50,
  28,
  44,
  1,
  43,
  14,
  34,
  9,
  5,
  26,
  11,
  10,
  58,
  38,
  54,
  61,
  60,
  41,
  19,
  13,
  49,
  30,
  55,
  37,
  63,
  22,
  36,
  25
]

type MandalaActivations = (
  ephemeris: {
    name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'trueNode' | 'Chiron'
    pos: number
  }[]
) => any

export const mandalaActivations: MandalaActivations = ephemeris => {
  let planets = []

  ephemeris.forEach(({ pos }, planetKey) => {
    let planetLongitude = pos - 3.875
    if (planetKey === 1) planetLongitude += 180
    else if (planetKey === 3) planetLongitude += 180
    if (planetLongitude < 0) planetLongitude += 360
    else if (planetLongitude >= 360) planetLongitude -= 360

    let gateOver = 0
    for (let i = planetLongitude; i >= 0; i -= 5.625) gateOver = i
    const gateIndex = (planetLongitude - gateOver) / 5.625
    const gate = mandalaGatesSequence[gateIndex]
    const gatePercents = 100 / (5.625 / gateOver)

    const getMandalaProp = (prevPropPercents, isBase = false) => {
      const count = isBase ? 5 : 6
      let over = 0
      for (let i = prevPropPercents; i >= 0; i -= 100 / count) over = i
      const prop = (prevPropPercents - over) / (100 / count) + 1
      const propPercents = 100 / (100 / count / over)
      return [prop, propPercents]
    }

    const [line, linePercents] = getMandalaProp(gatePercents)
    const [color, colorPercents] = getMandalaProp(linePercents)
    const [tone, tonePercents] = getMandalaProp(colorPercents)
    const [base, basePercents] = getMandalaProp(tonePercents, true)

    planets = [
      ...planets,
      {
        gate: Number(gate.toFixed()),
        line: Number(line.toFixed()),
        color: Number(color.toFixed()),
        tone: Number(tone.toFixed()),
        base: Number(base.toFixed()),
        gatePercents: Number(gatePercents.toFixed(2)),
        linePercents: Number(linePercents.toFixed(2)),
        colorPercents: Number(colorPercents.toFixed(2)),
        tonePercents: Number(tonePercents.toFixed(2)),
        basePercents: Number(basePercents.toFixed(2))
      }
    ]
  })

  return planets
}
