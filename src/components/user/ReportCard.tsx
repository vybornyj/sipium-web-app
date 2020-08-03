import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconGetApp from '@material-ui/icons/GetApp'
import { renderPrettyUtcDate } from 'deus-date'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 280,
      height: 280,
      margin: 10,

      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    media: {
      height: 60
    }
  })
)

interface Props {
  report?: dbUserReport
}

export const ReportCard: FunctionComponent<Props> = ({ report }) => {
  const { userReportId, name, birth, cityName } = report
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Link href='/my/report/[userReportId]' as={`/my/report/${userReportId}`}>
        <a>
          <CardActionArea>
            <CardMedia className={classes.media} image='/images/card.jpg' title='Sipium' />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {renderPrettyUtcDate(birth)}
                <br />
                {cityName}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <div className='global-flex-1-0' />

      <CardActions>
        <div className='global-flex-1-0' />

        <AppButton href='/api/pdf/download/[userReportId]' as={`/api/pdf/download/${userReportId}`} startIcon={<IconGetApp />} stl='card'>
          PDF
        </AppButton>

        {/* <AppButton startIcon={<IconSettings />} onClick={() => null} stl='card'> */}
        {/*  Edit */}
        {/* </AppButton> */}
      </CardActions>
    </Card>
  )
}
