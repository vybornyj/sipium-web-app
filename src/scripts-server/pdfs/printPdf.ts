import puppeteer from 'puppeteer-core'
import ReactDOMServer from 'react-dom/server'

export const printPdf = async (element) => {
  const html = ReactDOMServer.renderToStaticMarkup(element)
  const browser = await puppeteer.launch({ executablePath: process.env.PATH_CHROMIUM, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })

  const buffer = await page.pdf({
    scale: 1.5,
    printBackground: true,
    width: 842 * 1.5,
    height: 595 * 1.5,
    margin: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })

  await browser.close()

  return buffer
}
