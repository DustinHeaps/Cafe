import './globals.css'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'

import Providers from './providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cafe',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        className='h-full scroll-smooth antialiased'
        suppressHydrationWarning
      >
        <body className={`${inter.className} flex h-full flex-col`}>
          <Providers>
            <Header />
            <main className='grow'>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
