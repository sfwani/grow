import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { searchPlants } from '@/lib/openfarm-api'
import { Plant } from '@/types/plants'

// Plant Card Component
function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link href={`/plants/${plant.id}`} className="block">
      <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent">
        <div className="aspect-square overflow-hidden relative">
          {plant.imageUrl && plant.imageUrl !== '/images/plants/default-plant.jpg' ? (
            <Image 
              src={plant.imageUrl} 
              alt={plant.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full bg-muted/50 items-center justify-center text-4xl">
              🌱
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold tracking-tight">{plant.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {plant.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {plant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
            {plant.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                +{plant.tags.length - 3}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {plant.growthTime}
            </span>
            <span className={`font-medium ${
              plant.difficulty === 'Easy' ? 'text-green-500' :
              plant.difficulty === 'Medium' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {plant.difficulty}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-4 right-4 rounded-full bg-primary p-2 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <span className="sr-only">View plant</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

// Default plant categories for post-apocalyptic survival
const defaultQueries = [
  'medicinal',
  'drought resistant',
  'edible',
  'perennial',
  'easy to grow',
  'nutritious'
]

// Server Component to fetch plants
export default async function PlantsPage() {
  // Get initial plants based on survival value
  const initialPlants = await searchPlants('survival')
  
  // Fetch additional medicinal plants
  const medicinalPlants = await searchPlants('medicinal')
  
  // Combine and remove duplicates
  const allPlants = [...initialPlants]
  
  // Add medicinal plants that aren't already in the list
  for (const plant of medicinalPlants) {
    if (!allPlants.some(p => p.id === plant.id)) {
      allPlants.push(plant)
    }
  }
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Survival Flora</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and grow plants essential for post-apocalyptic survival
          </p>
        </div>
        
        {/* Quick category filters */}
        <div className="flex flex-wrap gap-2">
          {defaultQueries.map(query => (
            <Link 
              key={query}
              href={`/plants?q=${query}`}
              className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/20 transition-colors"
            >
              {query.charAt(0).toUpperCase() + query.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Plant grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  )
} 