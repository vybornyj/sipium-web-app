import * as fs from 'fs'
import * as path from 'path'

const URL_APP = process.argv[2]
const RUNTIME_IS_PRODUCTION = process.argv[3] !== 'dev'
const RUNTIME_BUILD = new Date().toISOString()
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const RUNTIME_VERSION = packageJson.version
const PATH_APP = path.resolve()
const logs = `${PATH_APP}/.logs`
const PATH_LOG_ERROR = `${logs}/${RUNTIME_VERSION}-${RUNTIME_BUILD}-error.log`
const PATH_LOG_WARN = `${logs}/${RUNTIME_VERSION}-${RUNTIME_BUILD}-warn.log`

try {
  fs.rmdir(logs, { recursive: true }, () => {
    fs.mkdir(logs, () => {
      fs.writeFileSync(PATH_LOG_ERROR, '')
      fs.writeFileSync(PATH_LOG_WARN, '')
    })
  })

  const envFile = '/app-config/env/sipium.env'
  if (fs.existsSync(envFile)) {
    const envPredefined = fs.readFileSync(envFile)

    const envs = `# RUNTIME
RUNTIME_IS_PRODUCTION=${RUNTIME_IS_PRODUCTION}
RUNTIME_VERSION=${RUNTIME_VERSION}
RUNTIME_BUILD=${RUNTIME_BUILD}
URL_APP=${URL_APP}
PATH_APP=${PATH_APP}
PATH_LOG_ERROR=${PATH_LOG_ERROR}
PATH_LOG_WARN=${PATH_LOG_WARN}

${envPredefined}`

    fs.writeFileSync(`${PATH_APP}/.env.local`, `${envs}`)
  }
} catch (err) {
  console.error(err)
}
