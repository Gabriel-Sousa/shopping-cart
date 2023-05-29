import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { ShoppingCartProvider } from '@/hooks/useShopppingCart'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopping Cart',
  description: 'A Shopping Cart without the home page',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ShoppingCartProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ShoppingCartProvider>
  )
}
