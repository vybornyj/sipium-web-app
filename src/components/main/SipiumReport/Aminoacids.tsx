import { FunctionComponent } from 'react'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'

interface Props {
  dbReportDescriptionData: dbReportDescriptions
  gatesArr: number[]
}

export const Aminoacids: FunctionComponent<Props> = ({ dbReportDescriptionData, gatesArr }) => {
  const aminoNumbers = [...new Set(gatesArr.map(gate => langAminoAcids[convertGateToAminoAcid[gate]].ru))]
  const aminoImg = [...new Set(gatesArr.map(gate => langAminoAcids[convertGateToAminoAcid[gate]].en.split(' ')[0].toLowerCase()))]

  const aminoProducts = [
    ...new Set(
      gatesArr.map(gate => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${convertGateToAminoAcid[gate]}`)?.descriptionRu)
    )
  ]
  const aminoDeficit = [
    ...new Set(
      gatesArr.map(gate => dbReportDescriptionData.find(a => a.descriptionId === `amino-deficit-${convertGateToAminoAcid[gate]}`)?.descriptionRu)
    )
  ]
  return (
    <>
      <h3>Психо-генетика и аминокислоты.</h3>
      {dbReportDescriptionData &&
        aminoNumbers.map((el, key) => (
          <div key={key} className='acid-item'>
            <h4>Аминокислота: {el}</h4>
            <div>
              <div className='acid-img'>
                <img src={`/images/amino/pdf/${aminoImg[key]}.png`} alt='' />
              </div>
              <div className='acid-info'>
                <p className='acid-item-products'>
                  <u>Продукты:</u> {aminoProducts[key]}
                </p>
                <p className='acid-item-deficit'>
                  <u>Дефицит:</u> {aminoDeficit[key]}
                </p>
              </div>
            </div>
          </div>
        ))}
      <style jsx>{
        /* language=CSS */ `
          .acid-item {
            vertical-align: top;
            width: 640px;
            margin: 10px 20px;
            display: inline-block;
          }

          .acid-img,
          .acid-info {
            vertical-align: top;
          }

          .acid-img {
            background: white;
          }

          .acid-img > img {
            display: block;
            margin: auto;
            padding: 30px 0;
            width: 350px;
          }

          .acid-info {
            /*border-top: 6px solid #062279;*/
          }

          .acid-item-products {
            padding: 20px 25px;
            background: rgba(209, 246, 220, 0.62);
            border-left: 15px solid green;
          }

          .acid-item-deficit {
            padding: 20px 25px;
            background: rgba(255, 230, 230, 0.75);
            margin: 0;
            border-left: 15px solid darkred;
          }
        `
      }</style>
    </>
  )
}
