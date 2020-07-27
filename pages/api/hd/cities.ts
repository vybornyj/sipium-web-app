import { googleAutocompleteCity } from 'src/scripts-server/@vybornyj/input-to-utc/googleAutocompleteCity'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  cityName: string
}

interface ResponseBody {
  cities: {
    cityName: string
    cityId: string
  }[]
}

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { cityName } = req.body

  const cities: { cityName: string; cityId: string }[] = await googleAutocompleteCity(process.env.API_KEY_GOOGLE, cityName)

  await res.status(200).json({ cities })
}

export default withSession(apiRoute)
