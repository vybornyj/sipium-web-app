import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconMenu from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { LogoSvg } from 'src/components/templates/template-user/LogoSvg'
import { TemplateUserDrawerInner } from 'src/components/templates/template-user/TemplateUserDrawerInner'
import { TemplateUserWithReport } from 'src/components/templates/template-user/TemplateUserWithReport'
import { TemplateHead } from 'src/components/templates/TemplateHead'
import { useStore } from 'src/scripts/store/useStore'

const drawerWidth = 210

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none'
    },
    hideDown960: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    hideUp959: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    appBar: {
      width: '100%',
      marginLeft: drawerWidth,
      background: 'linear-gradient(45deg, hsl(210, 90%, 25%) 30%, hsl(190, 90%, 25%) 90%)',
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: 36
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    drawerPaper: {
      background: 'linear-gradient(45deg, hsl(230, 90%, 25%) 30%, hsl(210, 90%, 25%) 90%)',
      color: 'white',
      textWeight: 'bold',
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

interface Props {
  title: string
  description?: string
  userReportId?: dbUserReport['userReportId']
}

export const TemplateUser: FunctionComponent<Props> = ({ title, description, userReportId, children }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAdmin } = useStore((state) => state.storeUser)

  return (
    <>
      <TemplateHead title={title} description={description} />

      <div className='template'>
        <AppBar position='fixed' className={clsx(classes.appBar)}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={() => setMobileOpen(true)}
              edge='start'
              className={clsx(classes.menuButton, classes.hideUp959)}
            >
              <IconMenu />
            </IconButton>
            <Typography variant='h6' noWrap>
              {title}
            </Typography>

            <div className='global-flex-1-0' />

            {userReportId && <TemplateUserWithReport userReportId={userReportId} />}
          </Toolbar>
        </AppBar>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile
          }}
        >
          <TemplateUserDrawerInner isAdmin={isAdmin} />
        </Drawer>
        <Drawer
          variant='permanent'
          anchor='left'
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar}>
            <Link href='/'>
              <a>
                <LogoSvg />
              </a>
            </Link>
          </div>
          <TemplateUserDrawerInner isAdmin={isAdmin} />
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />

          <main>{children}</main>
        </div>
      </div>

      <style jsx>{
        /* language=CSS */ `
          .template {
            display: flex;
          }
          main {
            max-width: 1400px;
            margin: auto;
            padding: 0 10px;
          }
        `
      }</style>

      <style jsx global>{
        /* language=CSS */ `
          body {
            background-color: hsl(230, 90%, 90%);
          }

          #__background {
            background: linear-gradient(45deg, hsl(230, 90%, 90%) 30%, hsl(190, 90%, 90%) 90%);
          }
        `
      }</style>
    </>
  )
}
