import { Fragment, FunctionComponent, useState } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { idsSipiumGates } from 'src/scripts/@sipium/enums/idsSipiumGates'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  initDescriptions: dbReportDescriptions
  descriptionsGroupName: string
}

export const AdminEdit: FunctionComponent<Props> = ({ initDescriptions, descriptionsGroupName }) => {
  const [descriptions, setDescriptions] = useState<dbReportDescriptions>(initDescriptions.map((a) => ({ ...a })))

  const [isChanges, setIsChanges] = useState(0)

  const handleSetDescriptions = (value, descriptionId, objectProp) => {
    descriptions.find((description) => description.descriptionId === descriptionId)[objectProp] = value
    setDescriptions(descriptions)
    setIsChanges(isChanges + 1)
  }

  const handleSave = async () => {
    let descriptionsForUpdate = descriptions.filter((description) => {
      const initDescription = initDescriptions.find((initDescription) => initDescription.descriptionId === description.descriptionId)
      return description?.descriptionRu !== initDescription?.descriptionRu || description.descriptionEn !== initDescription.descriptionEn
    })

    const { success } = await apiRequestClient('/api/descriptions/update', { descriptions: descriptionsForUpdate })
    if (success) {
      setIsChanges(0)
    }
  }

  const renderDescriptions = ({ descriptionId, descriptionRu, descriptionEn }: dbReportDescription) => {
    const aminoAcidId = descriptionId.replace(`${descriptionsGroupName}-`, '')

    const aminoName = langAminoAcids[aminoAcidId].ru

    const aminoGatesArray = idsSipiumGates.filter(
      (gate) =>
        `amino-products-${convertGateToAminoAcid[gate]}` === descriptionId || `amino-deficit-${convertGateToAminoAcid[gate]}` === descriptionId,
    )

    const aminoGatesString = aminoGatesArray.map((gate) => ` ${gate} `)

    return (
      <Fragment key={descriptionId}>
        <h3>{`${aminoName} (${aminoGatesString})`}</h3>
        <div className='column767-row768'>
          <textarea value={descriptionRu} onChange={(event) => handleSetDescriptions(event.currentTarget.value, descriptionId, 'descriptionRu')} />
          <textarea value={descriptionEn} onChange={(event) => handleSetDescriptions(event.currentTarget.value, descriptionId, 'descriptionEn')} />
        </div>
        <style jsx>{
          /* language=CSS */ `
            textarea {
              flex: 1 0;
              min-height: 200px;
              overflow: hidden;
              margin: 10px 20px;
              background: white;
              position: relative;
            }

            .lang {
              position: absolute;
              z-index: 1;
              right: 10px;
              bottom: 10px;
            }
          `
        }</style>
      </Fragment>
    )
  }

  return (
    <div className='root'>
      <AppButton
        onClick={handleSave}
        style={{
          position: 'fixed',
          top: 65,
          right: isChanges ? 10 : -50,
          opacity: isChanges ? 1 : 0,
        }}
      >
        Save
      </AppButton>

      <style jsx>{
        /* language=CSS */ `
          .root {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
        `
      }</style>
      {descriptions.map((description) => renderDescriptions(description))}
    </div>
  )
}
