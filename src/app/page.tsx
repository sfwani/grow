import Link from 'next/link'

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-background to-background/95">
      <div className="relative animate-fade-in">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-destructive/5 rounded-full blur-3xl" />
        
        {/* Main content */}
        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground/90">
            Apocalypse Garden
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Your guide to survival through sustainable growing, medicine crafting, and community trading in the post-apocalyptic world.
          </p>
          
          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.slice(0, 3).map((feature) => (
                <FeatureCard
                  key={feature.href}
                  title={feature.title}
                  description={feature.description}
                  href={feature.href}
                  icon={feature.icon}
                />
              ))}
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3 mx-auto">
              {features.slice(3).map((feature) => (
                <FeatureCard
                  key={feature.href}
                  title={feature.title}
                  description={feature.description}
                  href={feature.href}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 