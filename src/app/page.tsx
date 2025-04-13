import Link from 'next/link'
import { ArrowRight, Sparkles, Leaf, Pill, Users, Trophy } from 'lucide-react'

const features = [
  {
    title: "Plants",
    description: "Grow your own food and medicinal plants",
    href: "/plants",
    icon: "🌱",
  },
  {
    title: "Medicine",
    description: "Craft healing remedies from natural ingredients",
    href: "/medicine",
    icon: "🧪",
  },
  {
    title: "Barter",
    description: "Trade resources with other survivors",
    href: "/barter",
    icon: "🔄",
  },
  {
    title: "Leaderboard",
    description: "Compare your survival skills",
    href: "/leaderboard",
    icon: "🏆",
  },
  {
    title: "AI Guide",
    description: "Get smart survival advice",
    href: "/ai",
    icon: "🤖",
  },
]

function FeatureCard({ title, description, href, icon }: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <Link href={href}>
      <div
        className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:bg-accent transition-colors"
      >
        <div className="flex flex-col space-y-2">
          <span className="text-3xl">{icon}</span>
          <h3 className="font-semibold text-foreground/90">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-b from-black via-emerald-950/10 to-black relative overflow-hidden flex flex-col">
      {/* Enhanced atmospheric elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15),transparent_70%)]" />
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/radiation.png')] opacity-[0.05] mix-blend-overlay pointer-events-none animate-pulse" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative flex-1 flex flex-col justify-between z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            SYSTEM STATUS: OPERATIONAL
          </div>
          
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Survive & Thrive with AI Plant Analysis
          </h1>
          <p className="text-lg text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
            In a world where every plant matters, our AI system helps you identify safe edibles, 
            detect radiation damage, and ensure your garden's survival in harsh conditions.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link 
              href="/ai" 
              className="inline-flex items-center px-8 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Analyze Plant Safety
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/plants" 
              className="inline-flex items-center px-8 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              Access Survival Garden
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto w-full mt-10">
          <Link href="/ai" className="group p-6 rounded-xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden hover:bg-emerald-950/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:opacity-70 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Plant Analysis</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Use AI to identify safe plants and detect radiation damage in your specimens.</p>
          </Link>

          <Link href="/plants" className="group p-6 rounded-xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden hover:bg-emerald-950/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:opacity-70 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Plants</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Grow your own food and medicinal plants in our radiation-resistant garden system.</p>
          </Link>

          <Link href="/medicine" className="group p-6 rounded-xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden hover:bg-emerald-950/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:opacity-70 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Pill className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Medicine</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Craft essential remedies from natural ingredients for post-apocalyptic survival.</p>
          </Link>

          <Link href="/barter" className="group p-6 rounded-xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden hover:bg-emerald-950/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:opacity-70 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Trading Post</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Exchange resources and knowledge with fellow survivors in our secure network.</p>
          </Link>

          <Link href="/leaderboard" className="group p-6 rounded-xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm relative overflow-hidden hover:bg-emerald-950/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:opacity-70 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Rankings</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Track your survival progress and compete with other wasteland gardeners.</p>
          </Link>
        </div>

        {/* Enhanced Status Footer */}
        <div className="mt-8 text-center flex items-center justify-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/5 text-emerald-500/60 font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            SYSTEM UPTIME: 99.9%
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/5 text-emerald-500/60 font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            RADIATION SENSORS: ACTIVE
          </div>
        </div>
      </div>
    </main>
  )
} 