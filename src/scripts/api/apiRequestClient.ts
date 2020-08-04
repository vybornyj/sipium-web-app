import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

type ApiRequestClient = <RES = { [key: string]: any }, REQ = undefined | { [key: string]: any }>(url: string, data?: REQ) => Promise<RES>

export const apiRequestClient: ApiRequestClient = async (url, data) => apiRequestServer(null, url, data)
