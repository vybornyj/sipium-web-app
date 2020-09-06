import AppBar from '@material-ui/core/AppBar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'
import { LogoSvg } from 'src/components/templates/template-user/LogoSvg'
import { TemplateHead } from 'src/components/templates/TemplateHead'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: '100%',
      background: 'linear-gradient(45deg, hsl(220deg 83% 24%) 30%, hsl(249deg 79% 15%) 90%)'
    },
    menuButton: {
      marginRight: 36
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

interface Props {
  error?: error
  title?: string
  description?: string
}

export const TemplateMain: FunctionComponent<Props> = ({ title, description, error, children }) => {
  const classes = useStyles()
  return (
    <>
      <TemplateHead title={error ? '404' : title} description={description} />

      <div className='template'>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <Link href='/'>
              <a>
                <LogoSvg />
              </a>
            </Link>

            <div className='global-flex-1-0' />

            <AppButton href='/login' startIcon={<IconAccountCircle />} stl='toolbar'>
              Login
            </AppButton>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.toolbar} />

          <main>{error ? <h3 className='global'>Ошибка 404: Страница не существует</h3> : children}</main>
        </div>

        <div className='global-flex-1-0' />

        <footer>Copyright © 2020 Sipium.com. All rights reserved.</footer>
      </div>

      <style jsx>{
        /* language=CSS */ `
          .template {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          main {
            max-width: 1400px;
            margin: auto;
            padding: 0 10px;
          }
          footer {
            margin: 20px 0;
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;
            text-align: center;
          }
        `
      }</style>
      <style jsx global>{
        /* language=CSS */ `
          body {
            background-color: hsl(243, 100%, 33%);
          }
          #__background {
            background-color: #550000;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23550055'/%3E%3Cstop offset='1' stop-color='%23550055' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23555500'/%3E%3Cstop offset='1' stop-color='%23555500' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23005555'/%3E%3Cstop offset='1' stop-color='%23005555' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23550000'/%3E%3Cstop offset='1' stop-color='%23550000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23000055'/%3E%3Cstop offset='1' stop-color='%23000055' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23005500'/%3E%3Cstop offset='1' stop-color='%23005500' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
            background-attachment: fixed;
            background-size: cover;
          }
        `
      }</style>
    </>
  )
}
