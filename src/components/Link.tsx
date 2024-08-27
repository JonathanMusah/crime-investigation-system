'use client'

import { forwardRef, useCallback } from 'react'

import type { ComponentProps, ForwardedRef, MouseEvent } from 'react'

import NextLink from 'next/link'

type Props = Omit<ComponentProps<typeof NextLink>, 'href' | 'onClick'> & {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const Link = (props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { href, onClick, ...rest } = props

  if (href === undefined) {
    console.warn('Link component received undefined href prop. Defaulting to "/"')
  } else if (typeof href !== 'string') {
    console.error('Link component received invalid href prop. Expected string, got:', typeof href)
  }

  const defaultHref = href ?? '/'

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e)
      } else if (!href) {
        e.preventDefault()
      }
    },
    [onClick, href]
  )

  return <NextLink ref={ref} {...rest} href={defaultHref} onClick={handleClick} />
}

const ForwardedLink = forwardRef(Link)

ForwardedLink.displayName = 'Link'

export default ForwardedLink
