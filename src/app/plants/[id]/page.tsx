export const dynamic = 'force-dynamic'
export const revalidate = 0

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPlantById } from '@/lib/supabase/client'

export default async function PlantPage({
  params
}: {
  params: { id: string }
}) {
  const plant = await getPlantById(params.id)

  return (
    <div className="container py-8">
      <Link
        href="/plants"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Plants
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {plant.imageUrl ? (
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-4xl">
              🌱
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold">{plant.name}</h1>
          
          <div className="mt-4 flex gap-2">
            {plant.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 text-lg text-muted-foreground">
            {plant.description}
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Growth Information</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Growth Time</dt>
                  <dd className="text-lg font-medium">{plant.growthTime}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Difficulty</dt>
                  <dd className={`text-lg font-medium ${
                    plant.difficulty === 'Easy' ? 'text-green-500' :
                    plant.difficulty === 'Medium' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {plant.difficulty}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Requirements</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Sunlight</dt>
                  <dd className="text-lg font-medium">{plant.requirements.sun}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Water</dt>
                  <dd className="text-lg font-medium">{plant.requirements.water}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Soil</dt>
                  <dd className="text-lg font-medium">{plant.requirements.soil}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Temperature</dt>
                  <dd className="text-lg font-medium">{plant.requirements.temperature}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Uses</h2>
              <div className="mt-4 space-y-2">
                {Object.entries(plant.uses).map(([category, uses]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium capitalize">{category}</h3>
                    <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                      {uses.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 