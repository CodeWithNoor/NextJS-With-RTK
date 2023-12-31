import { Inter } from 'next/font/google'
import { Providers } from './redux/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App With Redux Toolkit',
  description: 'Generated by create next app with redux toolkit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
