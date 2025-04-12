import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Plants', href: '/plants', icon: '🌱' },
  { name: 'Medicine', href: '/medicine', icon: '🧪' },
  { name: 'Barter', href: '/barter', icon: '🔄' },
  { name: 'Inventory', href: '/inventory', icon: '🎒' },
  { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
  { name: 'AI Guide', href: '/ai', icon: '🤖' },
]

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold">Apocalypse Garden</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group inline-flex items-center px-3 py-1 text-sm font-medium transition-colors hover:text-foreground/90',
                  'text-foreground/60'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="hidden md:inline-block">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 