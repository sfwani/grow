import './globals.css'
import { Inter } from 'next/font/google'
import { LayoutClient } from '@/components/layout-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apocalypse Garden',
  description: 'A post-apocalyptic survival guide for growing plants and crafting medicine',
}

export default function RootLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
} 