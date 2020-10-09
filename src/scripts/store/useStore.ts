import { ReactElement } from 'react'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import create from 'zustand'
import { combine } from 'zustand/middleware'

type storeAlertPopup = null | {
  type?: 'warn' | 'error' | 'info'
  inner: ReactElement | string
}

const storeAlertPopup: storeAlertPopup = null

export const useStore = create(
  combine(
    {
      storeUser: {
        isDefined: false,
        isLogin: false,
        isAdmin: false,
        email: '',
      },
      storeAlertPopup,
      storeCollapseEditDescriptions: false,
      storeCollapseDev: false,
    },
    (set, get) => ({
      STORE_LOAD_USER_SESSION: async () => {
        const { email, isAdmin } = await apiRequestClient<dbUser>(`/api/auth/get-session`)
        set(() => ({
          storeUser: {
            isDefined: true,
            isLogin: !!email,
            isAdmin: !!isAdmin,
            email: email ?? '',
          },
        }))
      },
      STORE_SET_ALERT_POPUP: async (storeAlertPopup: storeAlertPopup) => set(() => ({ storeAlertPopup })),
      STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS: async () => set(() => ({ storeCollapseEditDescriptions: !get().storeCollapseEditDescriptions })),
      STORE_SET_COLLAPSE_DEV: async () => set(() => ({ storeCollapseDev: !get().storeCollapseDev })),
    }),
  ),
)
