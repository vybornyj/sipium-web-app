import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconGetApp from '@material-ui/icons/GetApp'
import IconMoreVert from '@material-ui/icons/MoreVert'
import Link from 'next/link'
import { FunctionComponent, MouseEvent, useState } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'

interface Props {
  userReportId: number
}

export const TemplateUserWithReport: FunctionComponent<Props> = ({ userReportId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppButton href='/api/pdf/download/[userReportId]' as={`/api/pdf/download/${userReportId}`} startIcon={<IconGetApp />} stl='toolbar'>
        PDF
      </AppButton>
      <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick} style={{ color: 'white' }}>
        <IconMoreVert />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 214,
          },
        }}
      >
        <Link href='/api/pdf/view/[userReportId]' as={`/api/pdf/view/${userReportId}`}>
          <a target='_blank'>
            <MenuItem>Inline PDF (Only Desktop)</MenuItem>
          </a>
        </Link>
        <Link href='/my/admin/report-base/[userReportId]' as={`/my/admin/report-base/${userReportId}`}>
          <a>
            <MenuItem>Report Base</MenuItem>
          </a>
        </Link>
      </Menu>
    </>
  )
}
