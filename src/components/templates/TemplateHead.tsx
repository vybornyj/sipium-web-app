import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

const {
  publicRuntimeConfig: { URL_APP },
}: GetConfig = getConfig()

interface Props {
  title?: string
  description?: string
}

export const TemplateHead: FunctionComponent<Props> = ({ title, description }) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title ? `${title} - Sipium` : 'Sipium - Human Wellness Solutions'}</title>
      <meta name='description' content={description ?? 'Human Wellness Solutions'} />
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <link rel='canonical' href={`${URL_APP}${router.asPath}`} />
    </Head>
  )
}
