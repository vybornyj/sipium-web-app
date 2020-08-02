import { renderPrettyUtcDate } from 'src/scripts/@deusdevs/deus-date'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'

interface Props {
  sipiumCalc?: sipiumCalc
  dbReportDescriptionData?: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

export const PdfReportPage1 = ({ sipiumCalc, dbReportDescriptionData, dbUserReportData }: Props) => {
  const { age } = sipiumCalc
  const { name, sex, birth, height, weight } = dbUserReportData
  /* const { aminoacids, proteinsActivations, fatsActivations, carbsActivations } = sipiumCalc.food */
  const { gatesArr } = sipiumCalc.primary
  const { pfceDaysWeekArr } = sipiumCalc.other

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
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        Sipium Report: {name} ({renderPrettyUtcDate(birth)}) UTC)
      </div>
      <div className='pdf-table'>
        <div className='pdf-table-row'>
          <div>Пол</div>
          <div>Возраст</div>
          <div>Рост</div>
          <div>Вес</div>
        </div>
        <div className='pdf-table-row'>
          <div>{sex ? 'М' : 'Ж'}</div>
          <div>{age}</div>
          <div>{height}</div>
          <div>{weight}</div>
        </div>
      </div>

      {/* <div className='pdf-table3-wrapper'>
        <table className='pdf-table3'>
          <tr className='pdf-table3-head'>
            <td>КБЖУ по дням недели</td>
            <td />
            <td>Сушка</td>
            <td>Дефицит</td>
            <td>Стандарт</td>
          </tr>
          {pfceDaysWeekArr.map((el, key) => (
            <tr key={key} className='pdf-table3-row'>
              <table className='pdf-table3'>
                {el.cut.map((_, index) => (
                  <tr key={index} className='pdf-table3-row'>
                    <td>{index === 0 && el.day.ru}</td>
                    {index === 0 && <td> Калории</td>}
                    {index === 1 && <td> Белки</td>}
                    {index === 2 && <td> Жиры</td>}
                    {index === 3 && <td> Углеводы</td>}
                    {index === 4 && <td> Клетчатка</td>}
                    <td>{el.cut[index]}</td>
                    <td>{el.deficit[index]}</td>
                    <td>{el.standard[index]}</td>
                  </tr>
                ))}
              </table>
            </tr>
          ))}
        </table>
      </div> */}
      <div className='pdf-table3-wrapper'>
        <table className='pdf-table3'>
          <tr className='pdf-table3-head'>
            <td />
            <td>КБЖУ</td>
            {pfceDaysWeekArr.map((el, key) => (
              <td key={key}>{el.day.ru}</td>
            ))}
          </tr>

          <tr className='weekRow'>
            <td />
            <td className='dayItem'>
              <div className='badge badge-cut'>Сушка</div>
              <div>Калории</div>
              <div>Белки</div>
              <div>Жиры</div>
              <div>Углеводы</div>
              <div>Клетчатка</div>
            </td>
            {pfceDaysWeekArr.map((el, key) => (
              <td key={key}>
                {el.cut.map((c, key2) => (
                  <div key={key2} style={{ textIndent: '5px' }}>
                    {' '}
                    {c}{' '}
                  </div>
                ))}
              </td>
            ))}
          </tr>
          <tr className='weekRow'>
            <td />
            <td className='dayItem'>
              <div className='badge badge-deficit'>Дефицит</div>
              <div>Калории</div>
              <div>Белки</div>
              <div>Жиры</div>
              <div>Углеводы</div>
              <div>Клетчатка</div>
            </td>
            {pfceDaysWeekArr.map((el, key) => (
              <td key={key}>
                {el.deficit.map((c, key2) => (
                  <div key={key2} style={{ textIndent: '5px' }}>
                    {' '}
                    {c}{' '}
                  </div>
                ))}
              </td>
            ))}
          </tr>
          <tr className='weekRow'>
            <td />
            <td className='dayItem'>
              <div className='badge badge-standard'>Стандарт</div>
              <div>Калории</div>
              <div>Белки</div>
              <div>Жиры</div>
              <div>Углеводы</div>
              <div>Клетчатка</div>
            </td>
            {pfceDaysWeekArr.map((el, key) => (
              <td key={key} style={{ textIndent: '5px' }}>
                {el.standard.map((c, key2) => (
                  <div key={key2}> {c} </div>
                ))}
              </td>
            ))}
          </tr>
        </table>
      </div>

      {/* <h3 className='global'>Рекомендованные вам продукты</h3>

      <div className='pdf-table2'>
        <div className='pdf-table-row'>
          <div>Углеводы</div>
          <div>
            {[...new Set(carbsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div className='pdf-table-row'>
          <div>Белки</div>
          <div>
            {[...new Set(proteinsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div className='pdf-table-row'>
          <div>Жиры</div>
          <div>
            {[...new Set(fatsActivations.map(gate => convertGateToAminoAcid[gate]))].map(
              el => dbReportDescriptionData.find(a => a.descriptionId === `amino-products-${el}`)?.descriptionRu
            )}
          </div>
        </div>
        <div className='pdf-table-row'>
          <div>Аминокислоты</div>
          <div>{aminoacids.map((el, index, array) => (index === array.length - 1 ? langAminoAcids[el].ru : langAminoAcids[el].ru + ', '))}</div>
        </div>
      </div> */}

      {/*      <div>
        <h3 className='global'>Психо-генетика и аминокислоты. </h3>
        {dbReportDescriptionData &&
          aminoNumbers.map((el, key) => (
            <div key={key}>
              <b>Аминокислота: {el}</b>
              <p>
                <u>Продукты:</u> {aminoProducts[key]}
              </p>
              <p>
                <u>Дефицит:</u> {aminoDeficit[key]}
              </p>
            </div>
          ))}
      </div> */}

      <div>
        {' '}
        {dbReportDescriptionData &&
          aminoNumbers.map((el, key) => (
            <div key={key} className='acid-item'>
              <h4>Аминокислота: {el}</h4>
              <div>
                <div className='acid-img'>
                  <img src={`${process.env.URL_APP}/images/amino/${aminoImg[key]}.png`} alt='' style={{ width: 350, height: 157 }} />
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
      </div>
    </>
  )
}
