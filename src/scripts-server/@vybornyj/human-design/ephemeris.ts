import childProcess from 'child_process'
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
  Chiron: 'D'
}

type with0 = (num: string | number) => string

const with0: with0 = num => `${num > 9 ? '' : 0}${num}`

type GetParams = (date: Date) => { hms: string; dmy: string; path: string; exe: string }

const getParams: GetParams = date => ({
  hms: `${with0(date.getHours())}:${with0(date.getMinutes())}:${with0(date.getSeconds())}`,
  dmy: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
  path: process.env.PATH_SWE,
  exe: process.env.PATH_SWE_EXE
})

type PlanetsPositions = (date: Date) => Promise<{ name: planetName; pos: number }[]>

export const planetsPositions: PlanetsPositions = async date => {
  const { hms, dmy, path, exe } = getParams(date)

  try {
    const { stdout } = await exec(`${exe} -emos -eswe -p00tt123456789 -fPl -head -g, -edir${path} -b${dmy} -ut${hms}`)

    const stdoutArray = stdout.split(/\r?\n/)

    let planets = []

    stdoutArray.forEach(planet => {
      const [name, pos] = planet.split(',')
      if (Number(pos)) {
        planets = [
          ...planets,
          {
            name: name.replace(/\s/g, ''),
            pos: Number(pos)
          }
        ]
      }
    })

    return planets
  } catch (err) {
    logger.error(`scripts-server/hd/ephemeris.ts [planetsPositions]: ${err}`)
    return null
  }
}

type PlanetPosition = (planetName: planetName, date: Date) => Promise<number | null>

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
