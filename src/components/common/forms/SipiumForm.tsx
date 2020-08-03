import DateFnsUtils from '@date-io/date-fns'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { loadStripe } from '@stripe/stripe-js'
import { localDateToUtcString, utcStringToLocalDate } from 'deus-date'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'reactn'
import { AppButton } from 'src/components/common/buttons/AppButton'
import { SipiumFormCity } from 'src/components/common/forms/SipiumFormCity'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { hotReplacerEnName, hotReplacerHeightWeight } from 'src/scripts/helpers/hotReplacers'

const {
  publicRuntimeConfig: { API_PUBLIC_KEY_STRIPE }
}: GetConfig = getConfig()

const stripePromise = loadStripe(API_PUBLIC_KEY_STRIPE)

interface Props {
  userEmail?: dbUser['email']
  dbUserReportData?: dbUserReport
  userReportId?: number
}

export const SipiumForm: FunctionComponent<Props> = ({ userEmail, dbUserReportData, userReportId }) => {
  const initDate = new Date()
  initDate.setFullYear(initDate.getFullYear() - 30)

  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')
  const router = useRouter()
  const [name, setName] = useState(dbUserReportData?.name ?? '')
  const [email, setEmail] = useState(userEmail ?? '')
  const [city, setCity] = useState<{ cityName: string; cityId: string }>(null)

  const [sex, setSex] = useState<0 | 1 | null>(0)
  const [physActivity, setPhysActivity] = useState<dbUserReport['physActivity']>(dbUserReportData?.physActivity ?? 1)
  const [height, setHeight] = useState(dbUserReportData?.height ?? '170')
  const [weight, setWeight] = useState(dbUserReportData?.weight ?? '70')
  const [selectedDate, handleDateChange] = useState<Date>(dbUserReportData?.birth ? utcStringToLocalDate(dbUserReportData?.birth) : initDate)

  const handleSetName: onChange = event => setName(hotReplacerEnName(event.target.value))
  const handleSetEmail: onChange = event => setEmail(event.target.value)
  const handleSetHeight: onChange = event => setHeight(hotReplacerHeightWeight(event.target.value))
  const handleSetWeight: onChange = event => setWeight(hotReplacerHeightWeight(event.target.value))

  const handleSubmitUpdate = async () => {
    const data = {
      userReportId,
      birth: localDateToUtcString(selectedDate, 'withoutSeconds'),
      name,
      physActivity,
      height,
      weight
    }
    const { error } = await apiRequestClient('/api/reports/update', data)

    if (!error) {
      await router.push('/my/report/[userReportId]', `/my/report/${userReportId}`)
      await STORE_SET_ALERT_POPUP({ inner: 'Report updated' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Server error: report not updated' })
    }
  }

  const handlerCheckout = async (provider: 'free' | 'stripe-test') => {
    if (city && email) {
      const data = {
        email,
        cityName: city.cityName,
        cityId: city.cityId,
        birth: localDateToUtcString(selectedDate, 'withoutSeconds'),
        name,
        sex,
        physActivity,
        height,
        weight
      }
      if (provider === 'stripe-test') {
        const { stripeSessionId } = await apiRequestClient('/api/payments/stripe', data)
        // console.log('log sessionId:', sessionId)

        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({ sessionId: stripeSessionId })

        if (error) {
          await STORE_SET_ALERT_POPUP({ inner: 'Server Error' })
        } else {
          await STORE_SET_ALERT_POPUP({ inner: 'OK' })
        }

        // console.log('error: ', error)
      } else if (provider === 'free') {
        const { userReportId: newUserReportId } = await apiRequestClient('/api/payments/free', data)

        if (newUserReportId) {
          await router.push('/my/report/[userReportId]', `/my/report/${newUserReportId}`)
        }
      }
    }
  }

  const renderInputName = () => (
    <TextField value={name} onChange={handleSetName} label='Your name' placeholder='' variant='filled' style={{ margin: 10, flex: '1 0' }} />
  )
  const renderInputEmail = () => (
    <TextField
      value={email}
      onChange={handleSetEmail}
      disabled={!!userEmail}
      label='Email'
      placeholder=''
      variant='filled'
      style={{ margin: 10, flex: '1 0' }}
    />
  )
  const renderInputHeight = () => (
    <TextField value={height} onChange={handleSetHeight} label='Height (cm)' placeholder='170' variant='filled' style={{ margin: 10, flex: '1 0' }} />
  )
  const renderInputWeight = () => (
    <TextField value={weight} onChange={handleSetWeight} label='Weight (kg)' placeholder='70' variant='filled' style={{ margin: 10, flex: '1 0' }} />
  )
  const renderSelectSex = () => (
    <FormControl variant='filled' style={{ margin: 10, flex: '1 0' }}>
      <InputLabel id='select-label-sex'>Sex</InputLabel>
      <Select labelId='select-label-sex' value={sex} onChange={event => setSex(event.target.value ? 1 : 0)}>
        <MenuItem value={0}>Female</MenuItem>
        <MenuItem value={1}>Male</MenuItem>
      </Select>
    </FormControl>
  )
  const renderSelectPhysActivity = () => (
    <FormControl variant='filled' style={{ margin: 10, flex: '1 0' }}>
      <InputLabel id='select-label-phys'>Physical Activity Level</InputLabel>
      <Select
        labelId='select-label-phys'
        value={physActivity}
        onChange={event => setPhysActivity(event.target.value ? Number(event.target.value) : 1)}
      >
        <MenuItem value={1}>No workouts</MenuItem>
        <MenuItem value={1.2}>2-3 workouts a week, not strength</MenuItem>
        <MenuItem value={1.375}>3-4 workouts a week, for an hour</MenuItem>
        <MenuItem value={1.55}>3-4 workouts a week, 1.5-2 hours</MenuItem>
        <MenuItem value={1.725}>Intense workouts every day</MenuItem>
        <MenuItem value={1.9}>Two workouts a day</MenuItem>
      </Select>
    </FormControl>
  )
  const renderPickerDate = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin='normal'
        label='Date of Birth (Year/Month/Day)'
        format='yyyy/MM/dd'
        value={selectedDate}
        onChange={handleDateChange}
        openTo='year'
        views={['year', 'month', 'date']}
        inputVariant='filled'
        style={{ margin: 10, flex: '1 0' }}
      />
    </MuiPickersUtilsProvider>
  )
  const renderPickerTime = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin='normal'
        label='Time of birth (Hours:Minutes)'
        value={selectedDate}
        onChange={handleDateChange}
        ampm={false}
        inputVariant='filled'
        style={{ margin: 10, flex: '1 0' }}
      />
    </MuiPickersUtilsProvider>
  )

  return (
    <div className='global-box-600 global-column'>
      {userReportId ? (
        <form onSubmit={handleSubmitUpdate}>
          <div className='column1023-row1024'>
            {renderInputName()}
            {renderPickerTime()}
          </div>
          <div className='column1023-row1024'>
            {renderInputHeight()}
            {renderInputWeight()}
          </div>
          <div className='column1023-row1024'>{renderSelectPhysActivity()}</div>
          <div className='global-center'>
            <AppButton onClick={handleSubmitUpdate}>Update</AppButton>
          </div>
        </form>
      ) : (
        <form>
          <h3 className='global'>Enter Data for Calculation</h3>{' '}
          <div className='column1023-row1024'>
            {renderInputName()}
            {renderInputEmail()}
          </div>
          <div className='column1023-row1024'>
            {renderInputHeight()}
            {renderInputWeight()}
          </div>
          <div className='column1023-row1024'>
            {renderSelectSex()}
            {renderSelectPhysActivity()}
          </div>
          <div className='column1023-row1024'>
            <SipiumFormCity city={city} setCity={setCity} />
          </div>
          <div className='column1023-row1024'>
            {renderPickerDate()}
            {renderPickerTime()}
          </div>
          <div className='info'>
            You can change the input fields <strong>Height</strong>, <strong>Weight</strong>, <strong>Physical Activity Level</strong>, and{' '}
            <strong>Time of birth</strong> after purchase at any time
          </div>
          <div className='global-center'>
            <AppButton onClick={() => handlerCheckout('free')}>Free (admin only)</AppButton>
            <AppButton onClick={() => handlerCheckout('stripe-test')}>Stripe Payment Test (admin only)</AppButton>
          </div>
        </form>
      )}

      <style jsx>{
        /* language=CSS */ `
          .info {
            margin: 20px 10px;
          }
        `
      }</style>
    </div>
  )
}
