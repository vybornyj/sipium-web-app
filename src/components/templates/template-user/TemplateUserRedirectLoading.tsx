import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { FunctionComponent } from 'react'
import { TemplateHead } from 'src/components/templates/TemplateHead'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '50vh',
    },
  }),
)

export const TemplateUserRedirectLoading: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <div className='template'>
      <TemplateHead title='Loading...' />

      <div className={classes.root}>
        <CircularProgress />
      </div>

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
    </div>
  )
}
