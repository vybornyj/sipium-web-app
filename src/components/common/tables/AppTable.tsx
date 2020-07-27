import { FunctionComponent } from 'react'

interface Props {
  max?: boolean
}

export const AppTable: FunctionComponent<Props> = ({ max, children }) => {
  return (
    <div className='wrapper'>
      <div className='app-table'>{children}</div>

      <style jsx>{
        /* language=CSS */ `
          .wrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 2px;
          }
          .app-table {
            margin: 10px;
            background: hsl(210, 50%, 98%);
            width: ${max ? 'calc(100% - 20px)' : 'initial'};
            min-width: ${max ? '1000px' : 'initial'};
            display: table;
            border: 2px solid hsl(210, 100%, 70%);
            border-radius: 4px;
          }
        `
      }</style>

      <style jsx global>{
        /* language=CSS */ `
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
        `
      }</style>
    </div>
  )
}
