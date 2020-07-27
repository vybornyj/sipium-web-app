import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { validateEmail } from 'src/scripts/helpers/validateEmail'

const formMessages = {
  default: 'Enter your email',
  invalidEmail: 'Invalid email: check your email and try again',
  incorrectEmail: 'There is no registration for such email',
  correctEmail: 'Enter your password',

  setPassword: 'Your password has not been set yet, come up with a strong password (6-32 symbols)',
  tooLongPassword: 'Password is too long (maximum 32 symbols)',
  tooShortPassword: 'Password is too short (minimum 6 symbols)',
  incorrectPassword: 'The password is incorrect',

  forgotDefault: 'Click send and we will send you an email with further instructions for resetting your password.',
  forgotMailSend: 'We have sent you an email, follow the instructions in the email to reset your password.',

  serverError: 'Server error (or you are offline)'
}

interface Props {
  target?: string
  initialEmail?: string
}

export const LoginForm: FunctionComponent<Props> = ({ target, initialEmail }) => {
  const router = useRouter()
  const redirectTo = target ?? '/my'

  // view elements
  const [isMainForm, setIsMainForm] = useState(true)
  const [isOnlyEmailInput, setIsOnlyEmailInput] = useState(true)
  const [isForgotPasswordSubmitEnables, setIsForgotPasswordSubmitEnables] = useState(true)

  // view messages
  const [messageMainForm, setMessageMainForm] = useState(formMessages.default)
  const [messageForgotPassword, setMessageForgotPassword] = useState(formMessages.forgotDefault)

  // inputs data
  const [email, setEmail] = useState(initialEmail ?? '')
  const [password, setPassword] = useState('')

  // data
  const [isNoPassword, setIsNoPassword] = useState(false)

  const handleChangeEmail: onChange = event => setEmail(event.target.value.slice(0, 255))

  const handleChangePassword: onChange = event => setPassword(event.target.value)

  const handleSubmitEmail = async () => {
    const emailIsValid = validateEmail(email)
    if (!emailIsValid) {
      setMessageMainForm(formMessages.invalidEmail)
      return
    }

    interface ApiAuthCheck {
      error: error
      isEmail?: boolean
      isPassword?: boolean
    }
    const { error, isEmail, isPassword }: ApiAuthCheck = await apiRequestClient('/api/auth/check', { email })

    if (error) {
      setMessageMainForm(formMessages.serverError)
    } else if (!isEmail) {
      setMessageMainForm(formMessages.incorrectEmail)
    } else if (isEmail) {
      setIsOnlyEmailInput(false)

      if (!isPassword) {
        setMessageMainForm(formMessages.setPassword)
        setIsNoPassword(true)
      } else {
        setMessageMainForm(formMessages.correctEmail)
      }
    }
  }

  const handleSubmitPassword = async () => {
    if (password.length > 32) {
      setMessageMainForm(formMessages.tooLongPassword)
      return
    }
    if (password.length < 6) {
      setMessageMainForm(formMessages.tooShortPassword)
      return
    }

    if (isNoPassword) {
      // устанавливаю новый пароль

      interface ApiAuthSetPassword {
        error: error
        isOk?: true
      }

      const { error, isOk }: ApiAuthSetPassword = await apiRequestClient('/api/auth/set-password', { email, password })

      if (error || !isOk) {
        setMessageMainForm(formMessages.serverError)
      } else {
        // todo: STORE_SET_USER()
        await router.push(redirectTo)
      }
    } else {
      // проверяю пароль

      interface ApiAuthSetPassword {
        error: error
        isOk?: true
      }

      const { error, isOk }: ApiAuthSetPassword = await apiRequestClient('/api/auth/login', { email, password })

      if (error) {
        setMessageMainForm(formMessages.serverError)
      } else if (isOk) {
        // todo: STORE_SET_USER()
        await router.push(redirectTo)
      } else {
        setMessageMainForm(formMessages.incorrectPassword)
      }
    }
  }

  const handleSubmitForgotPassword = async () => {
    setIsForgotPasswordSubmitEnables(false)

    interface ApiAuthReset {
      error: error
      mailIsSend?: boolean
    }

    const { error, mailIsSend }: ApiAuthReset = await apiRequestClient('/api/auth/reset', { email })

    if (error || !mailIsSend) {
      setMessageForgotPassword(formMessages.serverError)
    } else {
      setMessageForgotPassword(formMessages.forgotMailSend)
    }
  }

  useEffect(() => {
    initialEmail && handleSubmitEmail()
  }, [])

  const title = isMainForm ? 'Login' : 'Forgot password?'
  const message = isMainForm ? messageMainForm : messageForgotPassword
  const handleSubmit = isMainForm ? (isOnlyEmailInput ? handleSubmitEmail : handleSubmitPassword) : handleSubmitForgotPassword

  return (
    <form onSubmit={handleSubmit}>
      <div className='root global-box-500 global-column'>
        <h3 className='global'>{title}</h3>

        <h4 className='global'>{message}</h4>

        <div style={{ height: 20 }} />

        <TextField
          value={email}
          onChange={handleChangeEmail}
          label='Email'
          placeholder=''
          disabled={!isOnlyEmailInput}
          variant='filled'
          style={{ margin: '10px' }}
        />

        <TextField
          className={isMainForm && !isOnlyEmailInput ? '' : 'invisible'}
          value={password}
          onChange={handleChangePassword}
          label='Password'
          placeholder=''
          type='password'
          variant='filled'
          style={{ margin: 10 }}
        />

        <AppButton onClick={handleSubmit} disabled={!isMainForm && !isForgotPasswordSubmitEnables}>
          Send
        </AppButton>

        {!isOnlyEmailInput && (
          <div className='forgot-link' onClick={() => setIsMainForm(!isMainForm)}>
            {isMainForm ? 'Forgot password?' : 'Back'}
          </div>
        )}
      </div>

      <style>{
        /* language=CSS */ `
          .root {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .forgot-link {
            width: 100%;
            padding-right: 10px;
            text-align: right;
          }

          .forgot-link:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          
          .invisible {
            display: none;
          }
        `
      }</style>
    </form>
  )
}
