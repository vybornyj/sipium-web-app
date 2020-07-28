import React from 'react'
import 'reactn'

declare module 'reactn/default' {
  export interface State {
    storeUser: {
      isDefined: boolean
      isLogin: boolean
      isAdmin: boolean
      email: string
    }
    storeAlertPopup: null | {
      type?: 'warn' | 'error' | 'info'
      inner: React.ReactElement | string
    }
    storeCollapseEditDescriptions: boolean
    storeCollapseDev: boolean
  }

  export interface Reducers {
    STORE_LOAD_USER_SESSION: (global: State, dispatch: any) => Promise<State.storeUser>
    STORE_SET_ALERT_POPUP: (global: State, dispatch: any, payload: State.storeAlertPopup) => Promise<State.storeAlertPopup>
    STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS: (global: State, dispatch: any) => Promise<State.storeCollapseEditDescriptions>
    STORE_SET_COLLAPSE_DEV: (global: State, dispatch: any) => Promise<State.storeCollapseDev>
  }
}
