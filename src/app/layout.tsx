import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { NavigationClient } from '@/components/navigation-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apocalypse Garden',
  description: 'A post-apocalyptic survival guide for growing plants and crafting medicine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.className,
        'min-h-screen bg-background font-sans antialiased'
      )}>
        <div className="relative flex min-h-screen flex-col">
          <NavigationClient />
          <div className="flex-1 pt-14">{children}</div>
        </div>
      </body>
    </html>
  )
} 