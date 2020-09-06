import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconAdd from '@material-ui/icons/Add'
import IconEdit from '@material-ui/icons/Edit'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconMeetingRoom from '@material-ui/icons/MeetingRoom'
import IconRecentActors from '@material-ui/icons/RecentActors'
import IconRemoveRedEye from '@material-ui/icons/RemoveRedEye'
import IconSettings from '@material-ui/icons/Settings'
import clsx from 'clsx'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, ReactNode } from 'react'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { useStore } from 'src/scripts/store/useStore'

const {
  publicRuntimeConfig: { RUNTIME_VERSION }
}: GetConfig = getConfig()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerIcon: {
      color: 'white',
      minWidth: '40px'
    },
    divider: {
      backgroundColor: 'hsla(0, 0%, 100%, 0.12)'
    },
    dividerText: {
      margin: `5px 0 0 ${theme.spacing(2)}px`,
      color: 'hsla(0, 0%, 100%, 0.5)'
    }
  })
)

const TemplateUserMenuItems = [
  {
    title: 'My Reports',
    href: '/my',
    icon: <IconRecentActors />
  },
  {
    title: 'Add Report',
    href: '/my/add',
    icon: <IconAdd />
  }
]

const TemplateUserMenuItemsAdmin = [
  {
    title: 'Amino Products',
    href: '/my/admin/edit/[descriptionsGroupName]',
    as: '/my/admin/edit/amino-products',
    icon: <IconEdit />
  },
  {
    title: 'Amino Deficit',
    href: '/my/admin/edit/[descriptionsGroupName]',
    as: '/my/admin/edit/amino-deficit',
    icon: <IconEdit />
  }
]

const TemplateUserMenuItemsAdminDev = [
  {
    title: 'Amino Versus',
    href: '/my/admin/dev/amino-versus',
    icon: <IconRemoveRedEye />
  },
  {
    title: 'Test Payments',
    href: '/my/admin/dev/test-payments',
    icon: <IconRemoveRedEye />
  }
]

const TemplateUserMenuItemsAccount = [
  {
    title: 'Settings',
    href: '/my/settings',
    icon: <IconSettings />
  }
]

interface Props {
  isAdmin: boolean
}

export const TemplateUserDrawerInner: FunctionComponent<Props> = ({ isAdmin }) => {
  const router = useRouter()
  const classes = useStyles()

  const storeCollapseEditDescriptions = useStore((state) => state.storeCollapseEditDescriptions)
  const storeCollapseDev = useStore((state) => state.storeCollapseDev)
  const STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS = useStore((state) => state.STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS)
  const STORE_SET_COLLAPSE_DEV = useStore((state) => state.STORE_SET_COLLAPSE_DEV)

  const handleLogout = async () => {
    await apiRequestClient('/api/auth/logout')
    await router.push('/')
  }

  type getMenuItems = (menuItems: { title: string; href: string; as?: string; icon: any }[]) => ReactNode

  const getMenuItems: getMenuItems = (menuItems) =>
    menuItems.map(({ href, as, title, icon }) => (
      <Link href={href} as={as ?? href} key={href}>
        <a>
          <ListItem button>
            <ListItemIcon className={clsx(classes.drawerIcon)}>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </a>
      </Link>
    ))

  return (
    <>
      <Divider className={classes.divider} />

      <Typography className={classes.dividerText} color='textSecondary' display='block' variant='caption'>
        Sipium Reports
      </Typography>

      <List>{getMenuItems(TemplateUserMenuItems)}</List>

      {isAdmin && (
        <>
          <Divider className={classes.divider} />

          <Typography className={classes.dividerText} color='textSecondary' display='block' variant='caption'>
            Administrator privileges
          </Typography>

          <List>
            <ListItem button onClick={() => STORE_SET_COLLAPSE_EDIT_DESCRIPTIONS()}>
              <ListItemText primary='Edit Descriptions' />
              {storeCollapseEditDescriptions ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={storeCollapseEditDescriptions} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {getMenuItems(TemplateUserMenuItemsAdmin)}
              </List>
            </Collapse>
          </List>

          <List>
            <ListItem button onClick={() => STORE_SET_COLLAPSE_DEV()}>
              <ListItemText primary='Develop' />
              {storeCollapseEditDescriptions ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={storeCollapseDev} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {getMenuItems(TemplateUserMenuItemsAdminDev)}
              </List>
            </Collapse>
          </List>
        </>
      )}

      <div className='global-flex-1-0' />

      <Divider className={classes.divider} />

      <Typography className={classes.dividerText} color='textSecondary' display='block' variant='caption'>
        Account
      </Typography>

      <List>
        {getMenuItems(TemplateUserMenuItemsAccount)}

        <ListItem button onClick={handleLogout}>
          <ListItemIcon className={clsx(classes.drawerIcon)}>
            <IconMeetingRoom />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>

      <Typography className={classes.dividerText} color='textSecondary' display='block' variant='caption'>
        Sipium Web App v{RUNTIME_VERSION}
      </Typography>
    </>
  )
}
