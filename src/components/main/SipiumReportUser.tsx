import { FunctionComponent } from 'react'
import { FoodTypesDaysWeek } from 'src/components/main/SipiumReport/FoodTypesDaysWeek'
import { Person } from 'src/components/main/SipiumReport/Person'
import { Aminoacids } from './SipiumReport/Aminoacids'

interface Props {
  sipiumCalc: sipiumCalc
  aminoData: dbReportDescriptions
}

export const SipiumReportUser: FunctionComponent<Props> = ({ sipiumCalc, aminoData }) => {
  if (!sipiumCalc) return null
  const { age, sex, height, weight } = sipiumCalc.person // name, year, month, day, hours, minutes
  /* const { aminoacids, proteinsActivations, fatsActivations, carbsActivations } = sipiumCalc.food */
  const { pfceDaysWeekArr } = sipiumCalc.other
  const { gatesArr } = sipiumCalc.primary

  return (
    <div>
      <div className='global-box-1400 global-column'>
        <Person sex={sex} age={age} weight={weight} height={height} />
        <FoodTypesDaysWeek pfceDaysWeekArr={pfceDaysWeekArr} />
        {/*        <RecommendedProducts
          aminoacids={aminoacids}
          aminoData={aminoData}
          proteinsActivations={proteinsActivations}
          fatsActivations={fatsActivations}
          carbsActivations={carbsActivations}
        /> */}
        <Aminoacids aminoData={aminoData} gatesArr={gatesArr} />
      </div>
    </div>
  )
}
