import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import {
  calorieDiet,
  PLUS_MINUS_CARBS_CUT,
  PLUS_MINUS_CARBS_DEFICIT,
  PLUS_MINUS_FATS_CUT,
  PLUS_MINUS_FATS_DEFICIT,
  PLUS_MINUS_PROTEINS_CUT,
  PLUS_MINUS_PROTEINS_DEFICIT,
  sinusoidCalorieDaysWeek
} from 'src/scripts/@sipium/data'

interface Props {
  sipiumCalc: sipiumCalc
  foodGatesNumbers: number[]
  mainExchangeWithLoads: number
}

export const SipiumCalcData: FunctionComponent<Props> = ({ sipiumCalc, foodGatesNumbers, mainExchangeWithLoads }) => {
  const { totalProteinsActivations, totalFatsActivations, totalCarbsActivations } = sipiumCalc.totalActivations
  const { totalProteinsPercent, totalFatsPercent, totalCarbsPercent, totalCellulosePercent } = sipiumCalc.totalPercent
  const { totalInDietProteinsDeficit, totalInDietFatsDeficit, totalInDietCarbsDeficit, totalInDietCelluloseDeficit } = sipiumCalc.totalInDietDeficit
  const { totalInDietProteinsCut, totalInDietFatsCut, totalInDietCarbsCut, totalInDietCelluloseCut } = sipiumCalc.totalInDietCut
  const { avgProteinsDistribution, avgFatsDistribution, avgCarbsDistribution, avgCelluloseDistribution } = sipiumCalc.avgDistribution
  const { minimumInDietProteins, minimumInDietFats, minimumInDietCarbs, minimumInDietCellulose } = sipiumCalc.minimumInDiet

  return (
    <div className='global-box-1400 global-column'>
      <h3 className='global'>Расчет процента жира в организме</h3>

      <AppTable>
        <div>
          <div>Активации ворот</div>
        </div>
        <div>
          <div>{foodGatesNumbers.map((el) => el + ' ')}</div>
        </div>
      </AppTable>

      <AppTable>
        <div>
          <div>Углеводных активаций</div>
          <div>{totalCarbsActivations}</div>
        </div>
        <div>
          <div>Белковых активаций</div>
          <div>{totalProteinsActivations}</div>
        </div>
        <div>
          <div>Жировых активаций</div>
          <div>{totalFatsActivations}</div>
        </div>
        <div>
          <div>Всего активировано ворот</div>
          <div> {[...new Set(foodGatesNumbers)].length}</div>
        </div>
      </AppTable>

      <h3 className='global'>Калорийность рациона</h3>

      <AppTable>
        <div>
          {calorieDiet.map((el, key) => (
            <div key={key}>{el.ru}</div>
          ))}
        </div>
        <div>
          {calorieDiet.map((el, key) => (
            <div key={key}>{el.rate * 100 + '%'}</div>
          ))}
        </div>
      </AppTable>

      <h3 className='global'>Примерное распределение по БЖУ</h3>

      <AppTable>
        <div>
          <div>Белки</div>
          <div>{avgProteinsDistribution.toFixed()}</div>
        </div>
        <div>
          <div>Жиры</div>
          <div>{avgFatsDistribution.toFixed()}</div>
        </div>
        <div>
          <div>Углеводы</div>
          <div>{avgCarbsDistribution.toFixed()}</div>
        </div>
        <div>
          <div>Клетчатка</div>
          <div>{avgCelluloseDistribution.toFixed()}</div>
        </div>
      </AppTable>

      <h3 className='global'>Минимум в рационе</h3>

      <AppTable>
        <div>
          <div>Белки</div>
          <div>{minimumInDietProteins.toFixed()}</div>
        </div>
        <div>
          <div>Углеводы</div>
          <div>{minimumInDietCarbs.toFixed()}</div>
        </div>
        <div>
          <div>Жиры</div>
          <div>{minimumInDietFats.toFixed()}</div>
        </div>
        <div>
          <div>Клетчатка</div>
          <div>{minimumInDietCellulose.toFixed()}</div>
        </div>
      </AppTable>

      <AppTable>
        <div>
          <div>Основной обмен с учетом нагрузок</div>
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>{mainExchangeWithLoads.toFixed()}</div>
        </div>
      </AppTable>

      <h3 className='global'>Таблица калорийности по дням недели</h3>

      <AppTable max>
        <div>
          {sinusoidCalorieDaysWeek.map((el) => (
            <div key={el.id}>{el.ru}</div>
          ))}
        </div>
        <div>
          {sinusoidCalorieDaysWeek.map((el) => (
            <div key={el.id}>{(el.rate * 100).toFixed()}%</div>
          ))}
        </div>
      </AppTable>

      <AppTable max>
        <div>
          <div>Cтандарт</div>
          <div>Дефицит</div>
          <div />
          <div>Сушка</div>
          <div />
        </div>
        <div>
          <div>% углеводов</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
        </div>
        <div>
          <div>{totalCarbsPercent.toFixed(2)}</div>
          <div>{PLUS_MINUS_CARBS_DEFICIT}</div>
          <div>{totalInDietCarbsDeficit.toFixed(2)}</div>
          <div>{PLUS_MINUS_FATS_CUT}</div>
          <div>{totalInDietCarbsCut.toFixed(2)}</div>
        </div>
        <div>
          <div>% белков</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
        </div>
        <div>
          <div>{totalProteinsPercent.toFixed(2)}</div>
          <div>{PLUS_MINUS_PROTEINS_DEFICIT}</div>
          <div>{totalInDietProteinsDeficit.toFixed(2)}</div>
          <div>{PLUS_MINUS_PROTEINS_CUT}</div>
          <div>{totalInDietProteinsCut.toFixed(2)}</div>
        </div>
        <div>
          <div>Жиров</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
        </div>
        <div>
          <div>{totalFatsPercent.toFixed(2)}</div>
          <div>{PLUS_MINUS_FATS_DEFICIT}</div>
          <div>{totalInDietFatsDeficit.toFixed(2)}</div>
          <div>{PLUS_MINUS_CARBS_CUT}</div>
          <div>{totalInDietFatsCut.toFixed(2)}</div>
        </div>
        <div>
          <div>Клетчатки</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
          <div>плюс-минус, %</div>
          <div>Итого в рационе, %</div>
        </div>
        <div>
          <div>{totalCellulosePercent.toFixed(2)}</div>
          <div />
          <div>{totalInDietCelluloseDeficit.toFixed(2)}</div>
          <div />
          <div>{totalInDietCelluloseCut.toFixed(2)}</div>
        </div>
      </AppTable>

      <AppTable max>
        <div>
          <div>Процент БЖУ</div>
          <div>Белки</div>
          <div>Жиры</div>
          <div>Углеводы</div>
          <div>Клетчатка</div>
        </div>
        <div>
          <div>Дефицит</div>
          <div>{totalInDietProteinsDeficit.toFixed(2)}</div>
          <div>{totalInDietFatsDeficit.toFixed(2)}</div>
          <div>{totalInDietCarbsDeficit.toFixed(2)}</div>
          <div>{totalInDietCelluloseDeficit.toFixed(2)}</div>
        </div>
        <div>
          <div>Сушка</div>
          <div>{totalInDietProteinsCut.toFixed(2)}</div>
          <div>{totalInDietFatsCut.toFixed(2)}</div>
          <div>{totalInDietCarbsCut.toFixed(2)}</div>
          <div>{totalInDietCelluloseCut.toFixed(2)}</div>
        </div>
      </AppTable>
    </div>
  )
}
