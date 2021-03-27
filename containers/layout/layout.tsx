import { ReactNode } from 'react'
import Header from '../header'
import Footer from '../footer'

export interface LayoutProps {
  locale: string
  children: ReactNode
}

export default function Layout({ locale, children }: LayoutProps) {
  return (
    <>
      <Header locale={locale}/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}
