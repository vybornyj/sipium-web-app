import { sipiumGates, sipiumGatesData } from 'src/scripts-server/@vybornyj/human-design/sipiumGates'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import {
  acidsInFood,
  ACTIVATION_WEIGHT_MULTIPLIER,
  ACTIVE_GATES_RATE,
  calorieDiet,
  DEFAULT_MULTIPLIER,
  FATS_MULTIPLIER,
  PLUS_MINUS_CARBS_CUT,
  PLUS_MINUS_CARBS_DEFICIT,
  PLUS_MINUS_FATS_CUT,
  PLUS_MINUS_FATS_DEFICIT,
  PLUS_MINUS_PROTEINS_CUT,
  PLUS_MINUS_PROTEINS_DEFICIT,
  sinusoidCalorieDaysWeek,
} from 'src/scripts/@sipium/data'
import { idsSipiumGates } from 'src/scripts/@sipium/enums/idsSipiumGates'
import { gatesConsts } from 'src/scripts/@sipium/sipiumData/gatesConsts'

interface props {
  dbUserReportData?: dbUserReport
}

export const sipiumCalculation = async ({ dbUserReportData }: props): Promise<sipiumCalc> => {
  const { birth, personality, sex, physActivity, height, weight } = dbUserReportData
  const designMandalaActivations: sipiumGatesData = await sipiumGates(personality)

  const selectedDate = new Date(birth)
  const age = Math.abs(new Date(Date.now() - selectedDate.getTime()).getUTCFullYear() - 1970)

  // Получаем массив ворот нужного вида из пришедших активаций
  const gatesArr = idsSipiumGates.filter((gate) => designMandalaActivations.find((g) => g.gate === gate))

  // Номера ворот
  const foodGatesNumbers = gatesArr.map((gate) => gate)
  const proteinsActivations = gatesArr.filter((gate) => gatesConsts[gate].foodType === 1)
  const fatsActivations = gatesArr.filter((gate) => gatesConsts[gate].foodType === 2)
  const carbsActivations = gatesArr.filter((gate) => gatesConsts[gate].foodType === 3)
  const aminoacids = [...new Set(gatesArr.map((gate) => convertGateToAminoAcid[gate]))]

  let totalProteinsActivations = [...new Set(proteinsActivations)].length
  let totalFatsActivations = [...new Set(fatsActivations)].length
  let totalCarbsActivations = [...new Set(carbsActivations)].length

  const activationWeight = ACTIVE_GATES_RATE * ACTIVATION_WEIGHT_MULTIPLIER
  const activeGatesTotal = gatesArr.length
  const totalActivationsWeight = activeGatesTotal * activationWeight
  const percentResult = (100 - totalActivationsWeight) / (39 - activeGatesTotal)

  const totalProteinsPercent = percentResult * (9 - totalProteinsActivations) + totalProteinsActivations * activationWeight
  const totalFatsPercent = percentResult * (8 - totalFatsActivations) + totalFatsActivations * activationWeight
  const totalCellulosePercent = ((percentResult * (22 - totalCarbsActivations) + totalCarbsActivations * activationWeight) * totalFatsPercent) / 100
  const totalCarbsPercent = 100 - totalCellulosePercent - totalProteinsPercent - totalFatsPercent

  const totalInDietProteinsDeficit = (totalProteinsPercent * PLUS_MINUS_PROTEINS_DEFICIT) / 100
  const totalInDietFatsDeficit = (totalFatsPercent * PLUS_MINUS_FATS_DEFICIT) / 100
  const totalInDietCarbsDeficit = (totalCarbsPercent * PLUS_MINUS_CARBS_DEFICIT) / 100
  const totalInDietCelluloseDeficit = 100 - totalInDietCarbsDeficit - totalInDietProteinsDeficit - totalInDietFatsDeficit

  const totalInDietProteinsCut = (totalProteinsPercent * PLUS_MINUS_PROTEINS_CUT) / 100
  const totalInDietFatsCut = (totalInDietFatsDeficit * PLUS_MINUS_CARBS_CUT) / 100
  const totalInDietCarbsCut = (totalCarbsPercent * PLUS_MINUS_FATS_CUT) / 100
  const totalInDietCelluloseCut = 100 - totalInDietCarbsCut - totalInDietProteinsCut - totalInDietFatsCut

  const resultMale = (10 * weight + 6.25 * height - 5 * age + 5) * physActivity
  const resultFemale = (10 * weight + 6.25 * height - 5 * age - 161) * physActivity
  const mainExchangeWithLoads = sex ? resultMale : resultFemale

  const avgProteinsDistribution = (mainExchangeWithLoads * (totalProteinsPercent / 100)) / DEFAULT_MULTIPLIER
  const avgFatsDistribution = (mainExchangeWithLoads * (totalFatsPercent / 100)) / FATS_MULTIPLIER
  const avgCarbsDistribution = (mainExchangeWithLoads * (totalCarbsPercent / 100)) / DEFAULT_MULTIPLIER
  const avgCelluloseDistribution = (mainExchangeWithLoads * (totalCellulosePercent / 100)) / DEFAULT_MULTIPLIER

  const needNutrientsOnGateProteins = avgProteinsDistribution / 100
  const needNutrientsOnGateFats = avgFatsDistribution / 100
  const needNutrientsOnGateCarbs = avgCarbsDistribution / 100

  const totalNeedNutrOnGateProteins = needNutrientsOnGateProteins * percentResult
  const totalNeedNutrOnGateFats = needNutrientsOnGateFats * percentResult
  const totalNeedNutrOnGateCarbs = needNutrientsOnGateCarbs * percentResult

  const totalNeedNutrOnActiveGateProteins = needNutrientsOnGateProteins * activationWeight
  const totalNeedNutrOnActiveGateFats = needNutrientsOnGateFats * activationWeight
  const totalNeedNutrOnActiveGateCarbs = needNutrientsOnGateCarbs * activationWeight

  const minimumInDietProteins = totalProteinsActivations * totalNeedNutrOnActiveGateProteins
  const minimumInDietFats = totalFatsActivations * totalNeedNutrOnActiveGateFats
  const minimumInDietCellulose = (totalCarbsActivations * totalNeedNutrOnActiveGateCarbs * totalCellulosePercent) / 100
  const minimumInDietCarbs = totalCarbsActivations * totalNeedNutrOnActiveGateCarbs - minimumInDietCellulose

  // *******
  const weightWithoutFatsFunc = (
    shoulderWidth = 1,
    chestDiameter = 1,
    pelvicRidgeSize = 1,
    intertrochantericSize = 1,
    closedKneeWidth = 1,
    minShinCircumference = 1,
    minForearmCircumference = 1,
  ) => {
    return (
      3.14 *
      ((shoulderWidth + chestDiameter + pelvicRidgeSize + intertrochantericSize + closedKneeWidth + minShinCircumference + minForearmCircumference) /
        18.1) *
      height
    )
  }
  const weightWithoutFats = weightWithoutFatsFunc()

  const pillsFoodSum =
    acidsInFood
      .map((el) => el.pills / el.chicken)
      .map((el) => el)
      .reduce(function (a, b) {
        return a + b
      }) / acidsInFood.length

  const pfceDaysWeekTemp = (diet: number, day: number, foodType: number, mode: number) => {
    let result
    let totalAndMode
    let totalAndModeCut = [totalInDietProteinsCut, totalInDietFatsCut, totalInDietCarbsCut, totalInDietCelluloseCut]
    let totalAndModeDeficit = [totalInDietProteinsDeficit, totalInDietFatsDeficit, totalInDietCarbsDeficit, totalInDietCelluloseDeficit]
    let avgDistribution = [avgProteinsDistribution, avgFatsDistribution, avgCarbsDistribution, avgCelluloseDistribution]
    let minimumInDiet = [minimumInDietProteins, minimumInDietFats, minimumInDietCarbs, minimumInDietCellulose]

    if (mode === 1) result = avgDistribution[foodType - 1] * sinusoidCalorieDaysWeek[day - 1].rate
    else {
      if (mode === 2) totalAndMode = totalAndModeDeficit
      if (mode === 3) totalAndMode = totalAndModeCut

      result = (mainExchangeWithLoads * calorieDiet[diet - 1].rate * sinusoidCalorieDaysWeek[day - 1].rate * totalAndMode[foodType - 1]) / 100

      if (result / FATS_MULTIPLIER < minimumInDiet[foodType - 1] && foodType === 2) {
        result = minimumInDiet[foodType - 1] * FATS_MULTIPLIER
      }
      if (result / DEFAULT_MULTIPLIER < minimumInDiet[foodType - 1] && foodType === 3) {
        result = minimumInDiet[foodType - 1] * DEFAULT_MULTIPLIER
      }
    }
    return result
  }

  type pfceDaysWeekSum = (diet: number, day: number, mode: number) => number

  const pfceDaysWeekSum: pfceDaysWeekSum = (diet, day, mode) => {
    let sum = 0
    let coefficient = DEFAULT_MULTIPLIER
    if (mode === 1) {
      for (let i = 1; i <= 4; i++) {
        if (i === 2) coefficient = FATS_MULTIPLIER
        sum = sum + pfceDaysWeekTemp(diet, day, i, mode) * coefficient
        coefficient = DEFAULT_MULTIPLIER
      }
    } else
      for (let i = 1; i <= 4; i++) {
        sum = sum + pfceDaysWeekTemp(diet, day, i, mode)
      }
    return sum
  }

  const pfceDaysWeekArr = sinusoidCalorieDaysWeek.map((el, index) => {
    return {
      day: el,
      cut: [
        pfceDaysWeekSum(3, index + 1, 3).toFixed(),
        (pfceDaysWeekTemp(3, index + 1, 1, 3) / DEFAULT_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(3, index + 1, 2, 3) / FATS_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(3, index + 1, 3, 3) / DEFAULT_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(3, index + 1, 4, 3) / DEFAULT_MULTIPLIER).toFixed(),
      ],
      deficit: [
        pfceDaysWeekSum(2, index + 1, 2).toFixed(),
        (pfceDaysWeekTemp(2, index + 1, 1, 2) / DEFAULT_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(2, index + 1, 2, 2) / FATS_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(2, index + 1, 3, 2) / DEFAULT_MULTIPLIER).toFixed(),
        (pfceDaysWeekTemp(2, index + 1, 4, 2) / DEFAULT_MULTIPLIER).toFixed(),
      ],
      standard: [
        pfceDaysWeekSum(1, index + 1, 1).toFixed(),
        pfceDaysWeekTemp(1, index + 1, 1, 1).toFixed(),
        pfceDaysWeekTemp(1, index + 1, 2, 1).toFixed(),
        pfceDaysWeekTemp(1, index + 1, 3, 1).toFixed(),
        pfceDaysWeekTemp(1, index + 1, 4, 1).toFixed(),
      ],
    }
  })

  return {
    age,
    food: {
      aminoacids,
      foodGatesNumbers,
      proteinsActivations,
      fatsActivations,
      carbsActivations,
    },
    primary: {
      activationWeight,
      totalActivationsWeight,
      percentResult,
      gatesArr,
    },
    other: {
      weightWithoutFats,
      mainExchangeWithLoads,
      pillsFoodSum,
      pfceDaysWeekArr,
    },
    totalActivations: {
      totalProteinsActivations,
      totalFatsActivations,
      totalCarbsActivations,
    },
    totalPercent: {
      totalProteinsPercent,
      totalFatsPercent,
      totalCarbsPercent,
      totalCellulosePercent,
    },
    totalInDietDeficit: {
      totalInDietProteinsDeficit,
      totalInDietFatsDeficit,
      totalInDietCarbsDeficit,
      totalInDietCelluloseDeficit,
    },
    totalInDietCut: {
      totalInDietProteinsCut,
      totalInDietFatsCut,
      totalInDietCarbsCut,
      totalInDietCelluloseCut,
    },
    avgDistribution: {
      avgProteinsDistribution,
      avgFatsDistribution,
      avgCarbsDistribution,
      avgCelluloseDistribution,
    },
    minimumInDiet: {
      minimumInDietProteins,
      minimumInDietFats,
      minimumInDietCarbs,
      minimumInDietCellulose,
    },
    totalNeedNutrOnActiveGate: {
      totalNeedNutrOnActiveGateProteins,
      totalNeedNutrOnActiveGateFats,
      totalNeedNutrOnActiveGateCarbs,
    },
    totalNeedNutrOnGate: {
      totalNeedNutrOnGateProteins,
      totalNeedNutrOnGateFats,
      totalNeedNutrOnGateCarbs,
    },
  }
}
