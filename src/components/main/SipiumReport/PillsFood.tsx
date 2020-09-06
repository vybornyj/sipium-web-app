import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import { acidsInFood } from 'src/scripts/@sipium/data'

interface Props {
  pillsFoodSum: number
}

export const PillsFood: FunctionComponent<Props> = ({ pillsFoodSum }) => (
  <AppTable>
    <div>
      <div />
      <div>Таблетки</div>
      <div>Куриная грудка</div>
    </div>
    {acidsInFood.map((el) => (
      <div key={el.id}>
        <div>{el.ru}</div>
        <div>{el.pills.toFixed(3)}</div>
        <div>{el.chicken.toFixed(3)}</div>
        <div>{(el.pills / el.chicken).toFixed(6)}</div>
      </div>
    ))}
    <div>
      <div />
      <div />
      <div />
      <div>{pillsFoodSum.toFixed(6)}</div>
      <div>{(pillsFoodSum * 100 * 0.28).toFixed(4)}</div>
    </div>
  </AppTable>
)
