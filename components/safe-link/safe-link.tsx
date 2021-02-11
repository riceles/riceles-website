import { ReactNode } from 'react'

export interface SafeLinkProps {
  href: string
  children: ReactNode
}

export default function SafeLink({ href, children }: SafeLinkProps) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  )
}
