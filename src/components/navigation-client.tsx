'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const navigation = [
  { name: 'Plants', href: '/plants', icon: '🌱' },
  { name: 'Medicine', href: '/medicine', icon: '🧪' },
  { name: 'Barter', href: '/barter', icon: '🔄' },
  { name: 'Inventory', href: '/inventory', icon: '🎒' },
  { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
  { name: 'AI Guide', href: '/ai', icon: '🤖' },
]

export function NavigationClient() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [username, setUsername] = React.useState<string | null>(null)

  // Check authentication status
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setIsLoggedIn(!!data.session)
        
        if (data.session) {
          const { data: userData } = await supabase.auth.getUser()
          setUsername(userData.user?.user_metadata?.username || 'Survivor')
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session)
        if (session?.user) {
          setUsername(session.user.user_metadata?.username || 'Survivor')
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold">Apocalypse Garden</span>
        </Link>

        {/* Main Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative inline-flex items-center px-3 py-1 text-sm font-medium transition-colors hover:text-foreground/90',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              <span className="mr-2">{item.icon}</span>
              <span className="hidden md:inline-block">{item.name}</span>
              {pathname === item.href && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          {!loading && (
            isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground/70 hidden sm:inline-block">Welcome, {username}</span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center rounded-md border border-input px-3 py-1 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-md border border-input px-3 py-1 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Menu (can be expanded in future) */}
        <div className="md:hidden flex items-center">
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  )
} 