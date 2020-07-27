interface sipiumCalc {
  person: {
    age: number
    day: number
    month: number
    year: number
    hours: number
    minutes: number
    name: dbUserReport['name']
    sex: dbUserReport['sex']
    physActivity: dbUserReport['physActivity']
    height: dbUserReport['height']
    weight: dbUserReport['weight']
  }
  food: {
    aminoacids: number[]
    foodGatesNumbers: number[]
    proteinsActivations: number[]
    fatsActivations: number[]
    carbsActivations: number[]
  }
  primary: {
    activationWeight: number
    totalActivationsWeight: number
    percentResult: number
    gatesArr: number[]
  }
  other: {
    weightWithoutFats: number
    mainExchangeWithLoads: number
    pillsFoodSum: number
    pfceDaysWeekArr: { day: { id: number; ru: string; rate: number }; cut: string[]; deficit: string[]; standard: string[] }[]
  }
  totalActivations: {
    totalProteinsActivations: number
    totalFatsActivations: number
    totalCarbsActivations: number
  }
  totalPercent: {
    totalProteinsPercent: number
    totalFatsPercent: number
    totalCarbsPercent: number
    totalCellulosePercent: number
  }
  totalInDietDeficit: {
    totalInDietProteinsDeficit: number
    totalInDietFatsDeficit: number
    totalInDietCarbsDeficit: number
    totalInDietCelluloseDeficit: number
  }
  totalInDietCut: {
    totalInDietProteinsCut: number
    totalInDietFatsCut: number
    totalInDietCarbsCut: number
    totalInDietCelluloseCut: number
  }
  avgDistribution: {
    avgProteinsDistribution: number
    avgFatsDistribution: number
    avgCarbsDistribution: number
    avgCelluloseDistribution: number
  }
  minimumInDiet: {
    minimumInDietProteins: number
    minimumInDietFats: number
    minimumInDietCarbs: number
    minimumInDietCellulose: number
  }
  totalNeedNutrOnActiveGate: {
    totalNeedNutrOnActiveGateProteins: number
    totalNeedNutrOnActiveGateFats: number
    totalNeedNutrOnActiveGateCarbs: number
  }
  totalNeedNutrOnGate: {
    totalNeedNutrOnGateProteins: number
    totalNeedNutrOnGateFats: number
    totalNeedNutrOnGateCarbs: number
  }
}
