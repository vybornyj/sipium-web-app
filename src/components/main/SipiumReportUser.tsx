import { FunctionComponent } from 'react'
import { Aminoacids } from 'src/components/main/SipiumReport/Aminoacids'
import { FoodTypesDaysWeek } from 'src/components/main/SipiumReport/FoodTypesDaysWeek'
import { Person } from 'src/components/main/SipiumReport/Person'

interface Props {
  sipiumCalc?: sipiumCalc
  dbReportDescriptionData?: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

export const SipiumReportUser: FunctionComponent<Props> = ({ sipiumCalc, dbReportDescriptionData, dbUserReportData }) => {
  if (!sipiumCalc) return null
  const {
    age,
    primary: { gatesArr },
    other: { pfceDaysWeekArr },
  } = sipiumCalc
  const { sex, height, weight } = dbUserReportData
  /* const { aminoacids, proteinsActivations, fatsActivations, carbsActivations } = sipiumCalc.food */

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
        <Aminoacids dbReportDescriptionData={dbReportDescriptionData} gatesArr={gatesArr} />
      </div>
    </div>
  )
}
