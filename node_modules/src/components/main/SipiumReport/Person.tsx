import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'

interface Props {
  age: number
  sex: dbUserReport['sex']
  height: dbUserReport['height']
  weight: dbUserReport['weight']
}

export const Person: FunctionComponent<Props> = ({ sex, age, height, weight }) => (
  <AppTable>
    <div>
      <div>Пол</div>
      <div>Возраст</div>
      <div>Рост</div>
      <div>Вес</div>
    </div>
    <div>
      <div>{sex ? 'М' : 'Ж'}</div>
      <div>{age}</div>
      <div>{height}</div>
      <div>{weight}</div>
    </div>
  </AppTable>
)
