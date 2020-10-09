import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format
const consoleFormat = printf(({ level, message }) => `[app] ${level} - ${message}`)
const fileFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: process.env.PATH_LOG_ERROR,
      format: combine(timestamp(), fileFormat),
      level: 'error',
    }),
    new transports.File({
      filename: process.env.PATH_LOG_WARN,
      format: combine(timestamp(), fileFormat),
      level: 'warn',
    }),
  ],
  exitOnError: false,
})

if (!process.env.RUNTIME_IS_PRODUCTION) {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), timestamp(), consoleFormat),
      level: 'info',
    }),
  )
}
