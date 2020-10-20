import { FunctionComponent, useEffect } from 'react'
import { GlobalAlertPopup } from 'src/components/common/global/GlobalAlertPopup'
import { useStore } from 'src/scripts/store/useStore'

export const GlobalWrapper: FunctionComponent = ({ children }) => {
  const STORE_LOAD_USER_SESSION = useStore((state) => state.STORE_LOAD_USER_SESSION)

  useEffect(() => {
    STORE_LOAD_USER_SESSION()
    window.onfocus = () => STORE_LOAD_USER_SESSION()
  }, [])

  return (
    <>
      <GlobalAlertPopup />

      {children}

      <style jsx global>{
        /* language=CSS */ `
          /* GLOBAL VARIABLES --------------------------------------------------------------------------------------------------------------------- */

          :root {
            --app-transition: 0.15s all ease-out;
          }

          /* GLOBAL STYLES ------------------------------------------------------------------------------------------------------------------------ */

          #__background {
            position: fixed;
            z-index: -1;
            top: -100px;
            right: 0;
            bottom: -100px;
            left: 0;
          }

          :focus {
            outline: none !important;
          }

          html {
            user-select: none;
          }

          body {
            margin: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden scroll;
          }

          article {
            display: inline;
          }

          img {
            pointer-events: none;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          a:hover {
            color: inherit;
          }

          hr {
            border-width: 1px 0 0 0;
            border-color: gray;
            border-style: solid;
            margin: 20px 0;
          }

          p {
            padding: 18px 0;
            margin: 0;
          }

          /* GLOBAL HELPERS ----------------------------------------------------------------------------------------------------------------------- */

          h1.global,
          h2.global,
          h3.global,
          h4.global,
          h5.global,
          h6.global {
            padding: 20px 10px 10px 10px;
            margin: 0;
            color: hsl(210, 100%, 20%);
          }

          div.global-column {
            display: flex;
            flex-direction: column;
          }

          div.global-row {
            display: flex;
            flex-direction: row;
          }

          div.global-center {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          div.global-wrap {
            display: flex;
            flex-wrap: wrap;
          }

          div.global-flex-1-0 {
            flex: 1 0;
          }

          div.global-box-500,
          div.global-box-600,
          div.global-box-1400 {
            width: 100%;
            background: hsla(0, 0%, 100%, 0.8);
            box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.4), 0 3px 4px 0 rgba(0, 0, 0, 0.28), 0 1px 8px 0 rgba(0, 0, 0, 0.24);
            border-radius: 4px;
          }

          div.global-box-500 {
            max-width: 500px;
            margin: 20px auto 0 auto;
            padding: 0 10px 10px 10px;
          }

          div.global-box-600 {
            max-width: 600px;
            margin: 10px auto 10px auto;
            padding: 10px;
          }

          div.global-box-1400 {
            max-width: 1400px;
            margin: 20px auto 0 auto;
            padding: 10px;
          }

          /* GLOBAL MEDIA HELPERS ----------------------------------------------------------------------------------------------------------------- */

          div.column767-row768,
          div.column1023-row1024 {
            display: flex;
            flex-direction: column;
          }

          @media screen and (min-width: 768px) {
            div.column767-row768 {
              flex-direction: row;
            }
          }

          @media screen and (min-width: 1024px) {
            div.column1023-row1024 {
              flex-direction: row;
            }
          }

          /* GLOBAL MEDIA DISPLAY NONE HELPERS ---------------------------------------------------------------------------------------------------- */

          div.display768,
          div.display1024 {
            display: none;
          }

          @media screen and (min-width: 768px) {
            div.display768 {
              display: initial;
            }
          }

          @media screen and (min-width: 1024px) {
            div.display1024 {
              display: initial;
            }
          }

          /* GLOBAL QUILL TYPOGRAPHY -------------------------------------------------------------------------------------------------------------- */

          .ql-toolbar,
          .ql-container {
            background: white;
          }

          article.ql-editor {
            white-space: initial;
          }

          .ql-editor > * {
            padding-top: 5px !important;
            padding-bottom: 5px !important;
            cursor: default;
          }

          article.ql-editor > * {
            margin-top: 5px;
            margin-bottom: 5px;
            cursor: default;
          }

          a article.ql-editor > * {
            cursor: pointer;
          }

          article.ql-editor a {
            text-decoration: underline;
          }

          article.ql-editor blockquote {
            border-left: 4px solid #ccc;
            padding-left: 16px;
          }

          .ql-editor img {
            float: left;
            margin: 16px 16px 16px 0;
          }

          .ql-editor .ql-align-center img {
            float: none;
            margin: 16px;
          }

          .ql-editor .ql-align-right img {
            float: right;
            margin: 16px 0 16px 16px;
          }

          @media screen and (max-width: 1023px) {
            .ql-editor img {
              max-width: 45vw !important;
            }

            .ql-editor .ql-align-center img {
              max-width: 100% !important;
            }

            .ql-editor .ql-align-right img {
              max-width: 45vw !important;
            }
          }

          .ql-editor iframe {
            width: 100%;
            height: 360px;
            max-width: 640px !important;
            margin: 10px auto !important;
          }
        `
      }</style>
    </>
  )
}
