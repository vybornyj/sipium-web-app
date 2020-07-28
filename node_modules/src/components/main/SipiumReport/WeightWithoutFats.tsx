import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'

interface Props {
  weightWithoutFats: number
}

export const WeightWithoutFats: FunctionComponent<Props> = ({ weightWithoutFats }) => (
  <AppTable>
    <div>
      <div>Вес безжировой массы</div>
      <div>производится по формуле Бенке</div>
    </div>
    <div>
      <div>ширина плеч</div>
      <div>1</div>
    </div>
    <div>
      <div>поперечный диаметр грудной клетки</div>
      <div>1</div>
    </div>
    <div>
      <div>ширина таза (тазо-гребневый размер)</div>
      <div>1</div>
    </div>
    <div>
      <div>ширина таза (межвертельный размер)</div>
      <div>1</div>
    </div>
    <div>
      <div>ширина двух сомкнутых колен</div>
      <div>1</div>
    </div>
    <div>
      <div>окружность голени минимальная</div>
      <div>1</div>
    </div>
    <div>
      <div>окружность предплечья минимальная</div>
      <div>1</div>
    </div>
    <div>
      <div />
      <div />
    </div>
    <div>
      <div>Безжировая масса тела, грамм</div>
      <div> {weightWithoutFats.toFixed(7)} </div>
    </div>
  </AppTable>
)
