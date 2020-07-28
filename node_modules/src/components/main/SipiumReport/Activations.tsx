import { FunctionComponent } from 'react'
import { AppTable } from 'src/components/common/tables/AppTable'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { ACTIVE_GATES_RATE } from 'src/scripts/@sipium/data'
import { idsSipiumGates } from 'src/scripts/@sipium/enums/idsSipiumGates'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'
import { langFoodTypes } from 'src/scripts/@sipium/lang/langFoodTypes'
import { gatesConsts } from 'src/scripts/@sipium/sipiumData/gatesConsts'

interface Props {
  multiplier: (gateId) => 1 | 0
  primary: {
    activationWeight: number
    totalActivationsWeight: number
    percentResult: number
    gatesArr: number[]
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

export const Activations: FunctionComponent<Props> = ({ multiplier, primary, totalNeedNutrOnActiveGate, totalNeedNutrOnGate }) => {
  const { activationWeight, totalActivationsWeight, percentResult } = primary
  const { totalNeedNutrOnActiveGateProteins, totalNeedNutrOnActiveGateFats, totalNeedNutrOnActiveGateCarbs } = totalNeedNutrOnActiveGate
  const { totalNeedNutrOnGateProteins, totalNeedNutrOnGateFats, totalNeedNutrOnGateCarbs } = totalNeedNutrOnGate

  return (
    <div className='global-box-1400 global-column'>
      <h3 className='global'>Активации</h3>

      <AppTable max>
        <div>
          <div>Ворота</div>
          <div>Активация ворот</div>
          <div>Тип питания</div>
          <div>Аминокислота</div>
          <div>Процент на каждые ворота</div>
          <div>Вес активации</div>
          <div>Процент итог</div>
          <div>Потребность в нутрициентах на ворота</div>
          <div />
        </div>
        {idsSipiumGates.map((gate, key) => (
          <div key={key} className={multiplier(gate) ? 'red' : ''}>
            <div>{gate}</div>
            <div>{multiplier(gate)}</div>
            <div>{langFoodTypes[gatesConsts[gate].foodType].ru}</div>
            <div>{langAminoAcids[convertGateToAminoAcid[gate]].ru}</div>
            <div>{ACTIVE_GATES_RATE.toFixed(2)}</div>
            <div>{multiplier(gate) ? activationWeight.toFixed(2) : 0}</div>
            <div>{multiplier(gate) ? activationWeight.toFixed(2) : percentResult.toFixed(2)}</div>
            <div>
              {gatesConsts[gate].foodType === 1
                ? multiplier(gate)
                  ? totalNeedNutrOnActiveGateProteins.toFixed(2)
                  : totalNeedNutrOnGateProteins.toFixed(2)
                : ''}
              {gatesConsts[gate].foodType === 2
                ? multiplier(gate)
                  ? totalNeedNutrOnActiveGateFats.toFixed(2)
                  : totalNeedNutrOnGateFats.toFixed(2)
                : ''}
              {gatesConsts[gate].foodType === 3
                ? multiplier(gate)
                  ? totalNeedNutrOnActiveGateCarbs.toFixed(2)
                  : totalNeedNutrOnGateCarbs.toFixed(2)
                : ''}
            </div>
            <div>
              {gatesConsts[gate].foodType === 1 ? (multiplier(gate) ? totalNeedNutrOnActiveGateProteins.toFixed(2) : 0) : ''}
              {gatesConsts[gate].foodType === 2 ? (multiplier(gate) ? totalNeedNutrOnActiveGateFats.toFixed(2) : 0) : ''}
              {gatesConsts[gate].foodType === 3 ? (multiplier(gate) ? totalNeedNutrOnActiveGateCarbs.toFixed(2) : 0) : ''}
            </div>
          </div>
        ))}
      </AppTable>

      <h3 className='global'>Общий вес активаций: {totalActivationsWeight.toFixed(2)}</h3>
    </div>
  )
}
