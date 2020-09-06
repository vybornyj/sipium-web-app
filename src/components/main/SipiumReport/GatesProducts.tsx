import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { centers, physiologyArr } from 'src/scripts/@sipium/data'
import { idsSipiumGates } from 'src/scripts/@sipium/enums/idsSipiumGates'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'
import { langFoodTypes } from 'src/scripts/@sipium/lang/langFoodTypes'
import { gatesConsts } from 'src/scripts/@sipium/sipiumData/gatesConsts'

interface Props {
  multiplier: (gateId) => 1 | 0
  dbReportDescriptionData: dbReportDescriptions
}

export const ProductsGates: FunctionComponent<Props> = ({ multiplier, dbReportDescriptionData }) => (
  <div className='global-box-1400 global-column'>
    <h3 className='global'>Продукты ворот</h3>

    <AppTable max>
      <div>
        <div>Тип питания</div>
        <div>Ворота</div>
        <div>Активация ворот</div>
        <div>Аминокислота</div>
        <div>Центры</div>
        <div>Физиология</div>
        <div>Продукты</div>
        <div>Дефицит</div>
      </div>
      {idsSipiumGates.map((gate, key) => (
        <div key={key}>
          <div>{langFoodTypes[gatesConsts[gate].foodType].ru}</div>
          <div>{gate}</div>
          <div>{multiplier(gate)}</div>
          <div>{langAminoAcids[convertGateToAminoAcid[gate]].ru}</div>
          <div>{centers[gatesConsts[gate].center - 1].ru}</div>
          <div>{physiologyArr.find((el) => el.id === gatesConsts[gate].physiology).ru}</div>
          <div>{dbReportDescriptionData.find((el) => el.descriptionId === `amino-products-${convertGateToAminoAcid[gate]}`)?.descriptionRu}</div>
          <div>{dbReportDescriptionData.find((el) => el.descriptionId === `amino-deficit-${convertGateToAminoAcid[gate]}`)?.descriptionRu}</div>
        </div>
      ))}
    </AppTable>
  </div>
)
