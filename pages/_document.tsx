// Данный файл отрабатывает единожды на серверной стороне
//
// Онлайн генераторы иконок:
// https://realfavicongenerator.net
// http://romannurik.github.io/AndroidAssetStudio/index.html

import Document, { Head, Html, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  public static getInitialProps = async ctx => await Document.getInitialProps(ctx)

  public render = () => {
    const appName = 'Sipium'
    const appMainColor = '#0033cc'
    const { RUNTIME_IS_PRODUCTION } = process.env

    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta name='application-name' content={appName} />
          <meta name='apple-mobile-web-app-title' content={appName} />

          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-capable' content='yes' />

          <meta name='theme-color' content={appMainColor} />
          <meta name='apple-mobile-web-app-status-bar-style' content={appMainColor} />

          <meta name='format-detection' content='telephone=no' />
          <meta name='viewport' content='minimum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />

          {/* <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png?v=jwEkP6xkdY' /> */}
          {/* <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png?v=jwEkP6xkdY' /> */}
          {/* <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png?v=jwEkP6xkdY' /> */}
          {/* <link rel='manifest' href='/site.webmanifest?v=jwEkP6xkdY' /> */}
          {/* <link rel='mask-icon' href='/safari-pinned-tab.svg?v=jwEkP6xkdY' color={appMainColor} /> */}
          {/* <link rel='shortcut icon' href='/favicon.ico?v=jwEkP6xkdY' /> */}

          {/* windows start menu app link background */}
          <meta name='msapplication-TileColor' content={appMainColor} />

          {/* google font */}
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Sans:400,600&display=swap&subset=cyrillic' />

          {/* чтобы шрифт был использован как можно раньше */}
          <style dangerouslySetInnerHTML={{ __html: `html { font-family: 'Fira Sans', sans-serif !important; }` }} />
        </Head>
        <body>
          <div id='__background' />
          {
            /* disable official React browser plugin in production */
            RUNTIME_IS_PRODUCTION && (
              <script
                dangerouslySetInnerHTML={{
                  __html: 'if (window?.__REACT_DEVTOOLS_STORE_HOOK__) window.__REACT_DEVTOOLS_STORE_HOOK__.inject = function () {}'
                }}
              />
            )
          }
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
