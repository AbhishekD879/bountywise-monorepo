import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './_components/Header'
import 'cross-fetch/polyfill'
import StoreProvider from './StoreProvider'
import { Cta } from './_components/Header/HeaderCta'
import { Logo } from './_components/Header/Logo'
import { LoginCta } from './_components/Header/LoginCta'
import { SignUpCta } from './_components/Header/SignUpCta'
// import eventsource from 'eventsource';
import MaintenancePage from './testscreens/maintenance/page'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}
const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading'
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
})
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_PAGE === 'true') {
    return <MaintenancePage />
  }
  return (
    <html lang='en'>
      <body className={`${fontHeading.variable} ${fontBody.variable} h-[100dvh] bg-lightGray`}>
        <StoreProvider>
          <Header>
            <Logo />
            <Cta>
              <LoginCta />
              <SignUpCta />
            </Cta>
          </Header>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}