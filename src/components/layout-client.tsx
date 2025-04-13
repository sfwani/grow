'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Leaf, Pill, Users, Trophy } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

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

interface LayoutClientProps {
  children: JSX.Element | JSX.Element[]
}

export function LayoutClient({ children }: LayoutClientProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="border-b border-emerald-500/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Leaf className="w-6 h-6 text-emerald-400 animate-pulse" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400 text-transparent bg-clip-text hover:from-emerald-300 hover:to-emerald-500 transition-all">
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
            {user ? (
              <>
                <div className="text-sm text-emerald-300/60">
                  Welcome, {user.user_metadata?.username || user.email}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-1.5 rounded border border-emerald-500/20 text-emerald-300/80 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded border border-emerald-500/20 text-emerald-300/80 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="flex-1 pt-14">{children}</div>
    </div>
  )
} 