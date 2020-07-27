import { planetPosition } from 'src/scripts-server/@vybornyj/human-design/ephemeris'

type ModSec = (date: Date, seconds: number) => Date

const modSec: ModSec = (date: Date, milliseconds: number) => new Date(date.setSeconds(date.getSeconds() + milliseconds))

type HdDateTime = (options: { trueDateTime: Date; planet: 'Sun' | 'Moon' | 'Saturn'; isReturn?: boolean; modifySeconds?: number }) => Promise<Date>

export const hdDateTime: HdDateTime = async ({ trueDateTime, planet, isReturn = false, modifySeconds = 0 }) => {
  // Истинная позиция (для которой будет высчитываться время)
  let truePosition = await planetPosition(planet, trueDateTime)

  let localModifySeconds // Временное смещение от истинного времени

  if (isReturn) {
    if (planet === 'Saturn') {
      localModifySeconds = 60 * 60 * 24 * 365 * 29
    } else if (planet === 'Sun') {
      localModifySeconds = modifySeconds
    }
  } else {
    truePosition = truePosition >= 88 ? truePosition - 88 : truePosition + 272 // Истинная позиция дизайна = истинная позиция - 88°

    if (planet === 'Sun') {
      localModifySeconds = -7708800 // примерное количество дней в 88° солнца = (365 / 360) * 88
    } else if (planet === 'Moon') {
      localModifySeconds = -60 * 60 * 24 * ((28 / 360) * 88) // примерное количество дней в 88° луны   = (28 / 360) * 88
    }
  }

  // Корректирую Время
  let calculatedDateTime = modSec(trueDateTime, localModifySeconds)

  // Позиция по Время
  let calculatedPosition = await planetPosition(planet, calculatedDateTime)

  // Перевожу градусы в состояние, в котором они будут близки друг к другу
  const positionSync = () => {
    if (truePosition < 30 && calculatedPosition > 330) {
      // Например не 20 и 340 а 380 и 340
      truePosition += 360
    } else if (truePosition > 330 && calculatedPosition < 30) {
      // Например не 340 и 20 а 340 и 380
      calculatedPosition += 360
    }
  }

  positionSync()

  const planetRegulation = async (time: number) => {
    // Сравниваю истинную позицию и высчитываемую позицию
    if (truePosition < calculatedPosition) {
      while (truePosition < calculatedPosition) {
        calculatedDateTime = await modSec(calculatedDateTime, -time)
        calculatedPosition = await planetPosition(planet, calculatedDateTime)
        positionSync()
      }
    } else if (truePosition > calculatedPosition) {
      while (truePosition > calculatedPosition) {
        calculatedDateTime = await modSec(calculatedDateTime, time)
        calculatedPosition = await planetPosition(planet, calculatedDateTime)
        positionSync()
      }
    }
  }

  // Корректирую
  if (isReturn) {
    if (planet === 'Saturn') {
      await planetRegulation(60 * 60 * 24 * 365 * 108) // 108 суток
      await planetRegulation(60 * 60 * 24 * 365 * 18) //  18 суток (в 6    раз меньше)
      await planetRegulation(60 * 60 * 24 * 365 * 3) //   3 суток (в 6    раз меньше)
      await planetRegulation(60 * 60 * 12) //  12 часов (в 6    раз меньше)
    }
  } else if (planet === 'Sun') {
    await planetRegulation(60 * 60 * 12) //  12 часов
  }

  await planetRegulation(60 * 60 * 2) //  2 часа   (в 6    раз меньше)
  await planetRegulation(60 * 20) // 20 минут  (в 6    раз меньше)
  await planetRegulation(60 * 4) //  4 минуты (в 5    раз меньше)
  await planetRegulation(40) // 40 секунд  (в 6    раз меньше)
  await planetRegulation(6) //  6 секунд  (в 6,66 раз меньше)
  await planetRegulation(1) //  1 секунд (в 6    раз меньше)

  return calculatedDateTime
}
