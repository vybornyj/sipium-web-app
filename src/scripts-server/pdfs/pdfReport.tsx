import { PdfReportPage1 } from 'src/scripts-server/pdfs/PdfReportPage1'
import { printPdf } from 'src/scripts-server/pdfs/printPdf'

interface Props {
  sipiumCalc: sipiumCalc
  dbReportDescriptionData?: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

export const pdfReport = ({ sipiumCalc, dbReportDescriptionData, dbUserReportData }: Props) => {
  return printPdf(
    <html>
      <head>
        <link rel='preload' href='https://fonts.googleapis.com/css?family=Fira+Sans:400,600&display=swap&subset=cyrillic' as='style' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Sans:400,600&display=swap&subset=cyrillic' />
        <style dangerouslySetInnerHTML={{ __html: `html { font-family: 'Fira Sans', sans-serif; }` }} />
        <style>{
          /* language=CSS */ `
            body {
              width: 842px;
              margin: 0;
              padding: 10px;
              color: hsl(210, 100%, 20%);
            }

            .pdf-table {
              margin: 10px 0;
              width: calc(100% - 4px);
              background: hsl(210, 100%, 95%);
              display: table;
              border: solid 2px hsl(210, 100%, 85%);
              border-radius: 4px;
            }

            .pdf-table2 {
              margin: auto;
              width: 700px;
              background: hsl(210, 100%, 95%);
              display: table;
              border: solid 2px hsl(210, 100%, 85%);
              border-radius: 4px;
            }

            .pdf-table-row {
              display: table-row;
            }

            .pdf-table-row:nth-child(even) {
              background: hsl(210, 100%, 85%);
            }

            .pdf-table-row div {
              padding: 2px 5px;
              display: table-cell;
              min-width: 100px;
              border-right: 2px solid hsl(210, 100%, 85%);
              font-size: 12px;
            }

            .pdf-table-row:nth-child(even) div {
              border-right: 2px solid hsl(210, 100%, 95%);
            }

            .pdf-table-row div:last-child {
              border-right: none;
            }

            .pdf-table3-wrapper {

              margin-top: 20px;
              padding-top: 22px;
              display: block;
            }

            .pdf-table3 {
              position: relative;
              margin: auto;
              width: 600px;
              background: hsl(210, 100%, 95%);
              display: table;
              font-size: 12px;
              overflow: hidden;
            }

            .pdf-table3:first-of-type {
              border: solid 2px hsl(210, 100%, 85%);
            }

            .pdf-table3 {
              border-left: solid 2px hsl(210, 100%, 85%);
              border-right: solid 2px hsl(210, 100%, 85%);
            }

            .pdf-table3:last-of-type {
              border-bottom: solid 2px hsl(210, 100%, 85%);
            }

            .pdf-table3-row {
              display: table-row;
            }

            .pdf-table3-head {
              margin: 0;
              padding: 0;
              border-collapse: collapse;
            }

            .pdf-table3-head td {
              height: 50px;
              min-width: 90px;
              border-collapse: collapse;
              padding: 0;
            }

            .pdf-table3-head td:first-of-type {
              min-width: 30px;
            }

            .pdf-table3-row td {
              padding: 2px 5px;
              display: table-cell;
              min-width: 100px;
            }

            /* Дни недели не раскрашиваем */
            .pdf-table3-row td:nth-child(1) {
              background: hsl(210, 100%, 95%);
              width: 200px;
            }

            .pdf-table3:nth-child(odd) .pdf-table2-row:nth-child(odd) {
              background: hsl(210, 100%, 85%);
            }

            .pdf-table3:nth-child(even) .pdf-table2-row:nth-child(even) {
              background: hsl(210, 100%, 85%);
            }

            .acid-item {
              vertical-align: top;
              width: 400px;
              margin: 10px 10px 160px;
              display: inline-block;
              font-size: 14px;
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
              padding: 30px 0;
              width: 233px;
            }

            .acid-info {
              /*border-top: 6px solid #062279;*/
            }

            .acid-item-products {
              margin-bottom: 0;
              padding: 10px 15px;
              background: rgba(209, 246, 220, 0.62);
              border-left: 15px solid green;
            }

            .acid-item-deficit {
              padding: 10px 15px;
              background: rgba(255, 230, 230, 0.75);
              margin: 0;
              border-left: 15px solid darkred;
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
              width: 84px;
              text-align: center;
              padding: 7px 0;
            }

            .badge-cut {
              top: 80px;
              left: -28px;
            }

            .badge-deficit {
              top: 150px;
              left: -28px;
            }

            .badge-standard {
              top: 221px;
              left: -28px;
            }

          `
        }</style>
      </head>
      <body>
        <div style={{ textAlign: 'center' }}>
          <img src={`${process.env.URL_APP}/images/logo.jpg`} alt='' style={{ width: 320, height: 83 }} />
        </div>
        <PdfReportPage1 sipiumCalc={sipiumCalc} dbReportDescriptionData={dbReportDescriptionData} dbUserReportData={dbUserReportData} />
      </body>
    </html>,
  )
}
