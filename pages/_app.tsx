import { AppProps } from 'next/app'
import 'sanitize.css/forms.css'
import 'sanitize.css/sanitize.css'
import { GlobalWrapper } from 'src/components/common/global/GlobalWrapper'
import 'tippy.js/dist/tippy.css'

const App = ({ Component, pageProps }: AppProps) => (
  <GlobalWrapper>
    <Component {...pageProps} />
  </GlobalWrapper>
)

export default App

// todo: STORE_SET_USER() after resetPassword Token
// todo: create sitemap
