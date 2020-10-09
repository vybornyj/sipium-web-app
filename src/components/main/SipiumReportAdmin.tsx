import { FunctionComponent, useState } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import { Activations } from 'src/components/main/SipiumReport/Activations'
import { FoodTypesDaysWeek } from 'src/components/main/SipiumReport/FoodTypesDaysWeek'
import { ProductsGates } from 'src/components/main/SipiumReport/GatesProducts'
import { Person } from 'src/components/main/SipiumReport/Person'
import { PillsFood } from 'src/components/main/SipiumReport/PillsFood'
import { SipiumCalcData } from 'src/components/main/SipiumReport/SipiumCalcData'
import { WeightWithoutFats } from 'src/components/main/SipiumReport/WeightWithoutFats'
import { activityLevels } from 'src/scripts/@sipium/data'

interface Props {
  sipiumCalc?: sipiumCalc
  dbReportDescriptionData?: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

export const SipiumReportAdmin: FunctionComponent<Props> = ({ sipiumCalc, dbReportDescriptionData, dbUserReportData }) => {
  if (!sipiumCalc) return null

  const {
    age,
    primary,
    totalNeedNutrOnActiveGate,
    totalNeedNutrOnGate,
    food: { foodGatesNumbers },
    other: { weightWithoutFats, mainExchangeWithLoads, pillsFoodSum, pfceDaysWeekArr },
  } = sipiumCalc
  const { sex, height, weight } = dbUserReportData

  const [activity, setActivity] = useState(1.2)
  const setActivityHandler: onChange = (event) => {
    setActivity(Number(event.currentTarget.value))
  }

  const multiplier = (gateId) => (foodGatesNumbers.filter((id) => gateId === id).length ? 1 : 0)

  return (
    <div>
      <div className='global-box-1400 global-column'>
        <Person sex={sex} age={age} weight={weight} height={height} />
        <FoodTypesDaysWeek pfceDaysWeekArr={pfceDaysWeekArr} />
        {/*        <RecommendedProducts
          aminoacids={aminoacids}
          dbReportDescriptionData={dbReportDescriptionData}
          proteinsActivations={proteinsActivations}
          fatsActivations={fatsActivations}
          carbsActivations={carbsActivations}
        /> */}
      </div>

      <div className='global-box-1400 global-column'>
        <h3 className='global'>Физическая активность</h3>
        <div>
          <select value={activity} onChange={setActivityHandler}>
            {activityLevels.map((el, key) => (
              <option key={key} value={el.rate}>
                {el.rate}
              </option>
            ))}
          </select>
        </div>

        <h3 className='global'>Уровни активности</h3>
        <AppTable>
          <div>
            {activityLevels.map((el, key) => (
              <div key={key}>{el.ru}</div>
            ))}
          </div>
          <div>
            {activityLevels.map((el, key) => (
              <div key={key}>{el.rate}</div>
            ))}
          </div>
        </AppTable>
      </div>

      <SipiumCalcData sipiumCalc={sipiumCalc} foodGatesNumbers={foodGatesNumbers} mainExchangeWithLoads={mainExchangeWithLoads} />

      <div className='global-box-1400 global-column'>
        <WeightWithoutFats weightWithoutFats={weightWithoutFats} />
        <PillsFood pillsFoodSum={pillsFoodSum} />
      </div>

      <Activations
        multiplier={multiplier}
        primary={primary}
        totalNeedNutrOnActiveGate={totalNeedNutrOnActiveGate}
        totalNeedNutrOnGate={totalNeedNutrOnGate}
      />
      <ProductsGates multiplier={multiplier} dbReportDescriptionData={dbReportDescriptionData} />
    </div>
  )
}
