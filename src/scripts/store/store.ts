import { Reducers, State } from 'reactn/default'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

export const INITIAL_STATE: State = {
  storeUser: {
    isDefined: false,
    isLogin: false,
    isAdmin: false,
    email: ''
  },
  storeAlertPopup: null,
  storeCollapseEditDescriptions: false,
  storeCollapseDev: false
}

const STORE_LOAD_USER_SESSION: Reducers['STORE_LOAD_USER_SESSION'] = async (_, __) => {
  const { email, isAdmin } = await apiRequestClient<dbUser>(`/api/auth/get-session`)
  return {
    storeUser: {
      isDefined: true,
      isLogin: !!email,
      isAdmin: !!isAdmin,
      email: email ?? ''
    }
  }
}

const STORE_SET_ALERT_POPUP: Reducers['STORE_SET_ALERT_POPUP'] = async (_, __, storeAlertPopup) => ({ storeAlertPopup })

const STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS: Reducers['STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS'] = async ({ storeCollapseEditDescriptions }) => ({
  storeCollapseEditDescriptions: !storeCollapseEditDescriptions
})

const STORE_SET_COLLAPSE_DEV: Reducers['STORE_SET_COLLAPSE_DEV'] = async ({ storeCollapseDev }) => ({ storeCollapseDev: !storeCollapseDev })

export const INITIAL_REDUCERS = {
  STORE_LOAD_USER_SESSION,
  STORE_SET_ALERT_POPUP,
  STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS,
  STORE_SET_COLLAPSE_DEV
}
