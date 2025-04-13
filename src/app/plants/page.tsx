export const dynamic = 'force-dynamic'
export const revalidate = 0

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPlants, searchPlantsByCategory } from '@/lib/supabase/client'
import { Plant } from '@/types/plants'

// Plant Card Component
function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.id}`}
      className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold tracking-tight text-white">{plant.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/90">{plant.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            {plant.category === 'Medicinal' ? (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                Medicinal
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                Food
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M12 2v20"/>
              <path d="M2 12h20"/>
              <path d="M12 2v20"/>
              <path d="M20 12a8 8 0 1 1-16 0"/>
            </svg>
            <span>{plant.growthTime}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 ${
                plant.difficulty === 'Easy' ? 'text-green-500' :
                plant.difficulty === 'Medium' ? 'text-yellow-500' :
                'text-red-500'
              }`}
            >
              <path d="M12 2v20"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>
              <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/>
            </svg>
            <span className={`text-sm font-medium ${
              plant.difficulty === 'Easy' ? 'text-green-600' :
              plant.difficulty === 'Medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {plant.difficulty}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {plant.requirements && (
              <div className="flex items-center gap-2">
                {plant.requirements.water && (
                  <span title="Water needs" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-500"
                    >
                      <path d="M12 2v6"/>
                      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
                    </svg>
                    {plant.requirements.water}
                  </span>
                )}
                {plant.requirements.sun && (
                  <span title="Sunlight needs" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-yellow-500"
                    >
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2"/>
                      <path d="M12 20v2"/>
                      <path d="m4.93 4.93 1.41 1.41"/>
                      <path d="m17.66 17.66 1.41 1.41"/>
                      <path d="M2 12h2"/>
                      <path d="M20 12h2"/>
                      <path d="m6.34 17.66-1.41 1.41"/>
                      <path d="m19.07 4.93-1.41 1.41"/>
                    </svg>
                    {plant.requirements.sun}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

const categories = [
  { label: 'Food', value: 'Food' },
  { label: 'Medicinal', value: 'Medicinal' }
]

// Server Component to fetch plants
export default async function PlantsPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  let plants: Plant[] = []
  
  if (searchParams.category) {
    // If there's a category filter, search by category
    plants = await searchPlantsByCategory(searchParams.category)
  } else {
    // Otherwise, get all plants
    plants = await getPlants()
  }

  // Filter by search query if present
  if (searchParams.q) {
    plants = plants.filter(plant => 
      plant.name.toLowerCase().includes(searchParams.q!.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchParams.q!.toLowerCase())
    )
  }
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Survival Flora</h1>
          <p className="mt-2 text-gray-400">
            Discover and grow plants essential for post-apocalyptic survival
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/plants/create"
            className="inline-flex items-center justify-center rounded-md bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 shadow hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
          >
            Add Plant
          </Link>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/plants"
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !searchParams.category 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Plants
          </Link>
          {categories.map((category) => (
            <Link 
              key={category.value}
              href={`/plants?category=${category.value}`}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                searchParams.category === category.value
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>

        <form className="relative">
          <input
            type="text"
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search plants..."
            className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-700 bg-gray-800/50 text-sm text-gray-200 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 placeholder:text-gray-500"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  )
} 