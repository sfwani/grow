import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Sparkles, Leaf, Pill, Users, Trophy } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

const navigation = [
  {
    name: "Plant Analysis",
    href: "/ai",
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />
  },
  {
    name: "Plants",
    href: "/plants",
    icon: <Leaf className="w-5 h-5 text-emerald-400" />
  },
  {
    name: "Medicine",
    href: "/medicine",
    icon: <Pill className="w-5 h-5 text-emerald-400" />
  },
  {
    name: "Trading Post",
    href: "/barter",
    icon: <Users className="w-5 h-5 text-emerald-400" />
  },
  {
    name: "Rankings",
    href: "/leaderboard",
    icon: <Trophy className="w-5 h-5 text-emerald-400" />
  }
];

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
          <header className="border-b border-emerald-500/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  <div className="absolute inset-0 bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-lg font-semibold text-white">
                  Apocalypse Garden
                </span>
              </Link>

              <div className="flex items-center gap-1">
                {navigation.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-300/80 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors relative group"
                  >
                    <div className="w-8 h-8 rounded bg-emerald-500/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-emerald-300/60">Welcome, sfwani</div>
                <button className="px-4 py-1.5 rounded border border-emerald-500/20 text-emerald-300/80 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors text-sm">
                  Logout
                </button>
              </div>
            </nav>
          </header>
          <div className="flex-1 pt-14">{children}</div>
        </div>
      </body>
    </html>
  )
} 