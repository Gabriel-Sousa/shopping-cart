import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Shopping Cart',
  description: 'A Shopping Cart without the home page',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} id="body">
        {children}
      </body>
    </html>
  )
}
