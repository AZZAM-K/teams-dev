import type { Metadata } from 'next'
import Navbar from '@/components/navbar/navbar'
import './globals.css'
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: 'teams-dev | Home',
  description: 'Welcome to the teams-dev application',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.className} antialiased bg-gray-600 text-white relative`}
      >
        <Navbar />
        <main className='pb-22 md:pb-0 pt-0 md:pt-20'>{children}</main>
      </body>
    </html>
  )
}
