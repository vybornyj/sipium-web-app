import Button, { ButtonProps } from '@material-ui/core/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CSSProperties, FunctionComponent } from 'react'

const styles = {
  main: {
    transition: '0.15s all ease-out',
    margin: '16px 8px 8px 8px',
    padding: '8px 24px',
    background: 'linear-gradient(45deg, hsl(210, 90%, 40%) 30%, hsl(190, 90%, 40%) 90%)',
    color: 'hsl(0, 0%, 100%)'
  },
  card: {
    transition: '0.15s all ease-out',
    margin: 4,
    padding: '4px 12px',
    border: '1px solid hsl(210, 90%, 95%)',
    color: 'hsl(210, 90%, 65%)'
  },
  toolbar: {
    transition: '0.15s all ease-out',
    margin: 4,
    padding: '4px 12px',
    color: 'hsl(0, 0%, 100%)'
  }
}

export interface AppButtonProps extends ButtonProps {
  // [обязательно] событие или ссылка: onClick | href | href + as
  onClick?: onClick
  href?: string // например: /[user]/chart/[chart]
  as?: string // например: /123456/chart/2345678

  onMouseEnter?: onMouseEnter
  onContextMenu?: onContextMenu

  className?: string
  style?: CSSProperties
  stl?: 'min' | string
}

export const AppButton: FunctionComponent<AppButtonProps> = props => {
  const router = useRouter()

  const { onClick, onMouseEnter, onContextMenu, children, href = '/', stl = 'main', style = {}, ...otherProps } = props

  let { as = href, className = '' } = props

  if (router.asPath === as) {
    className = className + ' current'
  }

  const splitAsPath = router.asPath.split('/')

  if (router.asPath === as || as.includes(splitAsPath[2])) {
    className += ' active'
  }

  // INNER
  const renderInner = () => (
    <Button
      role='link'
      tabIndex={0}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onContextMenu={onContextMenu}
      style={stl in styles ? { ...styles[stl], ...style } : { ...style }}
      {...otherProps}
    >
      {children}
    </Button>
  )

  return onClick ? (
    renderInner()
  ) : href.includes('http://') || href.includes('https://') || href.includes('mailto:') || href.includes('tel:') ? (
    <a href={href} target='_blank' rel='noreferrer'>
      {renderInner()}
    </a>
  ) : (
    <Link href={href} as={as}>
      <a>{renderInner()}</a>
    </Link>
  )
}
