import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Banner from './banner/banner'
// import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Collection of my recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ChakraProvider>         */}
          <Banner />
          {children}
        {/* </ChakraProvider> */}
      </body>
    </html>
  )
}
