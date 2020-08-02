import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'

interface Props {
  dbReportDescriptionData: dbReportDescriptions
  aminoacids: number[]
  proteinsActivations: number[]
  fatsActivations: number[]
  carbsActivations: number[]
}

export const RecommendedProducts: FunctionComponent<Props> = ({
  aminoacids,
  dbReportDescriptionData,
  proteinsActivations,
  fatsActivations,
  carbsActivations
}) => {
  return (
    <>
      <h3 className='global'>Рекомендованные вам продукты</h3>

      <AppTable>
        <div>
          <div>Углеводы</div>
          <div>
            {[...new Set(carbsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div>
          <div>Белки</div>
          <div>
            {[...new Set(proteinsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div>
          <div>Жиры</div>
          <div>
            {[...new Set(fatsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div>
          <div>Аминокислоты</div>
          <div>{aminoacids.map((el, index, array) => (index === array.length - 1 ? langAminoAcids[el].ru : langAminoAcids[el].ru + ', '))}</div>
        </div>
      </AppTable>
    </>
  )
}
