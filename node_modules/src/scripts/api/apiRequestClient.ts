import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

type ApiRequestClient = <RES = anyObject, REQ = undefined | anyObject>(url: string, data?: REQ) => Promise<RES>

export const apiRequestClient: ApiRequestClient = async (url, data) => apiRequestServer(null, url, data)
