import { planetsPositions } from 'src/scripts-server/@vybornyj/human-design/ephemeris'
import { hdDateTime } from 'src/scripts-server/@vybornyj/human-design/hdDateTime'
import { mandalaActivations } from 'src/scripts-server/@vybornyj/human-design/mandalaActivations'

export type sipiumGatesData = {
  gate: number
  line: number
  color: number
  tone: number
  base: number
  gatePercents: number
  linePercents: number
  colorPercents: number
  tonePercents: number
  basePercents: number
}[]

interface props {
  day: number
  month: number
  year: number
  hours: number
  minutes: number
}

type sipiumGates = (props: props) => Promise<sipiumGatesData>

export const sipiumGates: sipiumGates = async ({ day, month, year, hours, minutes }) => {
  const p = new Date(Date.UTC(year, month - 1, day, hours, minutes))

  const designDateTime = await hdDateTime({ trueDateTime: p, planet: 'Sun' })
  const designPlanetsPositions = await planetsPositions(designDateTime)
  return mandalaActivations(designPlanetsPositions)
}
