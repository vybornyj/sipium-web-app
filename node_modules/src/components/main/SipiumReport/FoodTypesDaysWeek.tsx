import { FunctionComponent } from 'react'

interface Props {
  pfceDaysWeekArr: { day: { id: number; ru: string; rate: number }; cut: string[]; deficit: string[]; standard: string[] }[]
}

export const FoodTypesDaysWeek: FunctionComponent<Props> = ({ pfceDaysWeekArr }) => (
  <>
    {/* <AppTable>
      <div>
        <div>КБЖУ по дням недели</div>
        <div />
        <div>Сушка</div>
        <div>Дефицит</div>
        <div>Стандарт</div>
      </div>
      {pfceDaysWeekArr.map((el, key) => (
        <div key={key}>
          <div>{el.day.ru}</div>
          <div>
            <div>Калории</div>
            <div>Белки</div>
            <div>Жиры</div>
            <div>Углеводы</div>
            <div>Клетчатка</div>
          </div>
          <div>
            {el.cut.map((cut, index) => (
              <div key={index}>{cut}</div>
            ))}
          </div>
          <div>
            {el.deficit.map((deficit, index) => (
              <div key={index}>{deficit}</div>
            ))}
          </div>
          <div>
            {el.standard.map((standard, index) => (
              <div key={index}>{standard}</div>
            ))}
          </div>
        </div>
      ))}
    </AppTable> */}

    <div className='app-table'>
      <div>
        <div>КБЖУ</div>
        {pfceDaysWeekArr.map((el, key) => (
          <div key={key}>{el.day.ru}</div>
        ))}
      </div>

      <div className='weekRow'>
        <div className='dayItem'>
          <div className='badge badge-cut'>Сушка</div>
          <div>Калории</div>
          <div>Белки</div>
          <div>Жиры</div>
          <div>Углеводы</div>
          <div>Клетчатка</div>
        </div>
        {pfceDaysWeekArr.map((el, key) => (
          <div key={key}>
            {el.cut.map((c, key2) => (
              <div key={key2}> {c} </div>
            ))}
          </div>
        ))}
      </div>
      <div className='weekRow'>
        <div className='dayItem'>
          <div className='badge badge-deficit'>Дефицит</div>
          <div>Калории</div>
          <div>Белки</div>
          <div>Жиры</div>
          <div>Углеводы</div>
          <div>Клетчатка</div>
        </div>
        {pfceDaysWeekArr.map((el, key) => (
          <div key={key}>
            {el.deficit.map((c, key2) => (
              <div key={key2}> {c} </div>
            ))}
          </div>
        ))}
      </div>
      <div className='weekRow'>
        <div className='dayItem'>
          <div className='badge badge-standard'>Стандарт</div>
          <div>Калории</div>
          <div>Белки</div>
          <div>Жиры</div>
          <div>Углеводы</div>
          <div>Клетчатка</div>
        </div>
        {pfceDaysWeekArr.map((el, key) => (
          <div key={key}>
            {el.standard.map((c, key2) => (
              <div key={key2}> {c} </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    <style jsx>{
      /* language=CSS */ `
        .wrapper {
          width: 100%;
          overflow-x: auto;
          border-radius: 2px;
        }

        .app-table {
          position: relative;
          margin: 50px auto;
          background: hsl(210, 50%, 98%);
          width: 1000px;
          display: table;
          border: 2px solid hsl(210, 100%, 70%);
          border-radius: 4px;
          padding-left: 35px;
          overflow: hidden;
        }

        .app-table > div {
          display: table-row;
        }

        .app-table > div.red {
          background: hsl(0, 50%, 84%);
        }

        .app-table > div > div {
          padding: 2px 5px;
          display: table-cell;
          border: 1px solid hsl(210, 50%, 98%);
          border-radius: 4px;
          min-width: 100px;
        }

        .app-table > div > div:last-child {
          border-right: none;
        }

        .app-table > div:nth-child(even) > div {
          background: hsl(210, 50%, 92%);
        }

        .app-table > div.red:nth-child(even) > div {
          background: hsl(0, 50%, 84%);
        }

        .weekRow > div:nth-child(1) {
          text-indent: 3px;
        }

        .weekRow > div:not(:nth-child(1)) {
          text-indent: 5px;
        }

        .badge {
          position: absolute;
          transform: rotate(-90deg);
          background: #6c9cc1;
          color: white;
          width: 126px;
          text-align: center;
          padding: 7px 0;
        }

        .badge-cut {
          top: 75px;
          left: -46px;
        }

        .badge-deficit {
          top: 200px;
          left: -46px;
        }

        .badge-standard {
          top: 326px;
          left: -46px;
        }
      `
    }</style>
  </>
)
