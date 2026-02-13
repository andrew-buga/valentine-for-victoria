import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})
const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Будь моєю Валентинкою',
  description: 'Романтичний сюрприз до Дня закоханих спеціально для тебе',
}

export const viewport: Viewport = {
  themeColor: '#d63663',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${_playfair.variable} ${_inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
