import getConfig from 'next/config'

const {
  publicRuntimeConfig: { URL_APP }
}: GetConfig = getConfig()

interface FetchData {
  method: 'POST'
  headers: {
    'Content-Type': 'application/json'
  }
  body?: string
}
type ApiRequestServer = <RES = anyObject, REQ = undefined | anyObject>(res: { statusCode: number } | null, url: string, data?: REQ) => Promise<RES>

export const apiRequestServer: ApiRequestServer = async (res, url, data) => {
  const fetchData: FetchData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (data) fetchData.body = JSON.stringify(data)

  try {
    const responseRaw = await fetch(`${URL_APP}${url}`, fetchData)
    const responseJson = responseRaw ? await responseRaw.json() : {}
    const isError = !responseRaw || Object.keys(responseJson).length === 0

    if (isError) {
      if (res) res.statusCode = 404
      return { error: true }
    }
    if (res) res.statusCode = 200
    return { ...responseJson }
  } catch (err) {
    if (res) res.statusCode = 404
    return { error: true }
  }
}
