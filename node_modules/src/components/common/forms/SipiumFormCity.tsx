import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FunctionComponent, useState } from 'react'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  city?: {
    cityName: string
    cityId: string
  }
  setCity: ({ cityName, cityId }: { cityName: string; cityId: string }) => void
}

export const SipiumFormCity: FunctionComponent<Props> = ({ city, setCity }) => {
  const [value, setValue] = useState(city ? city.cityName : null)
  const [inputValue, setInputValue] = useState(city ? city.cityName : '')
  const [cities, setCities] = useState(city ? [city] : [])

  const handleSetCity = (value: string) => {
    const cityObj = cities.find(x => x.cityName === value)
    if (cityObj?.cityId) {
      setValue(value)
      setCity({ cityName: value, cityId: cityObj.cityId })
    } else {
      setValue(null)
    }
  }

  const handleSetCityInput = async (value: string) => {
    setInputValue(value)
    setValue(null)
    if (value.length >= 3) {
      const response = await apiRequestClient('/api/hd/cities', { cityName: value })
      if (response.cities) {
        setCities(response.cities)
      } else {
        setCities([])
      }
    } else {
      setCities([])
    }
  }

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => handleSetCity(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => handleSetCityInput(newInputValue)}
      options={cities.map(option => option.cityName)}
      style={{ margin: 10, flex: '1 0' }}
      renderInput={params => <TextField {...params} label='City of Birth' variant='filled' />}
    />
  )
}
