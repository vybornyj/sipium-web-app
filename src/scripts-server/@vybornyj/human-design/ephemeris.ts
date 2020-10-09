import childProcess from 'child_process'
import { getUtcDateParams } from 'deus-date'
import { logger } from 'src/scripts-server/logger/logger'
import util from 'util'

const exec = util.promisify(childProcess.exec)

type planetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'trueNode' | 'Chiron'

const planetNumByName = {
  Sun: '0',
  Moon: '1',
  Mercury: '2',
  Venus: '3',
  Mars: '4',
  Jupiter: '5',
  Saturn: '6',
  Uranus: '7',
  Neptune: '8',
  Pluto: '9',
  trueNode: 't',
  Chiron: 'D',
}

type GetParams = (date: Date | string) => { hms: string; dmy: string; path: string; exe: string }
const getParams: GetParams = (date) => {
  const { y, m, d, h, mi, s } = getUtcDateParams(date)
  return {
    hms: `${h}:${mi}:${s}`,
    dmy: `${d}.${m}.${y}`,
    path: process.env.PATH_SWE,
    exe: process.env.PATH_SWE_EXE,
  }
}

type PlanetsPositions = (date: Date | string) => Promise<{ name: planetName; pos: number }[]>

export const planetsPositions: PlanetsPositions = async (date) => {
  const { hms, dmy, path, exe } = getParams(date)

  try {
    const { stdout } = await exec(`${exe} -emos -eswe -p00tt123456789 -fPl -head -g, -edir${path} -b${dmy} -ut${hms}`)

    const stdoutArray = stdout.split(/\r?\n/)

    let planets = []

    stdoutArray.forEach((planet) => {
      const [name, pos] = planet.split(',')
      if (Number(pos)) {
        planets = [
          ...planets,
          {
            name: name.replace(/\s/g, ''),
            pos: Number(pos),
          },
        ]
      }
    })

    return planets
  } catch (err) {
    logger.error(`scripts-server/hd/ephemeris.ts [planetsPositions]: ${err}`)
    return null
  }
}

type PlanetPosition = (planetName: planetName, date: Date | string) => Promise<number | null>

export const planetPosition: PlanetPosition = async (planetName, date) => {
  const p = planetNumByName[planetName]

  const { hms, dmy, path, exe } = getParams(date)

  try {
    const { stdout } = await exec(`${exe} -emos -eswe -p${p} -fl -head -g, -edir${path} -b${dmy} -ut${hms}`)
    return Number(stdout)
  } catch (err) {
    logger.error(`scripts-server/hd/ephemeris.ts [planetPosition]: ${err}`)
    return null
  }
}
