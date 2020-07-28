import { AppProps } from 'next/app'
import { withInit } from 'reactn'
import 'sanitize.css/forms.css'
import 'sanitize.css/sanitize.css'
import { GlobalWrapper } from 'src/components/common/global/GlobalWrapper'
import { INITIAL_REDUCERS, INITIAL_STATE } from 'src/scripts/store/store'
import 'tippy.js/dist/tippy.css'

const App = ({ Component, pageProps }: AppProps) => (
  <GlobalWrapper>
    <Component {...pageProps} />
  </GlobalWrapper>
)

// @ts-ignore
export default withInit(INITIAL_STATE, INITIAL_REDUCERS)(App)

// todo: STORE_SET_USER() after resetPassword Token
// todo: create sitemap
