// const withPWA = require('next-pwa')

module.exports = {
  publicRuntimeConfig: {
    URL_APP: process.env.URL_APP,
    API_PUBLIC_KEY_STRIPE: process.env.API_PUBLIC_KEY_STRIPE,
    RUNTIME_VERSION: process.env.RUNTIME_VERSION,
  },
  compress: false,
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  reactStrictMode: false,
  // pwa: {
  //   dest: 'public',
  //   distDir: 'public',
  //   disable: process.env.NODE_ENV !== 'production',
  //   register: false,
  //   skipWaiting: false
  // }
}
