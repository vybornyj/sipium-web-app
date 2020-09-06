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

type sipiumGates = (personality: string) => Promise<sipiumGatesData>

export const sipiumGates: sipiumGates = async (personality) => {
  const designDateTime = await hdDateTime({ personality, planet: 'Sun' })
  const designPlanetsPositions = await planetsPositions(designDateTime)

  return mandalaActivations(designPlanetsPositions)
}
