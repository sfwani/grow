import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPlantById } from '@/lib/openfarm-api'

export default async function PlantDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const plant = await getPlantById(params.id)

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/plants" className="hover:text-foreground">
          Plants
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{plant.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Plant Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          {plant.imageUrl && plant.imageUrl !== '/images/plants/default-plant.jpg' ? (
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">
              🌱
            </div>
          )}
        </div>

        {/* Plant Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{plant.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                plant.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                plant.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {plant.difficulty}
              </span>
              <span className="text-sm text-muted-foreground">
                Growth Time: {plant.growthTime}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2 text-muted-foreground">
              {plant.description}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-semibold">Characteristics</h2>
            <div className="mt-2 flex flex-wrap gap-1">
              {plant.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Growing Requirements */}
          <div>
            <h2 className="text-xl font-semibold">Growing Requirements</h2>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Sun</dt>
                <dd className="text-sm">{plant.requirements.sun}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Soil</dt>
                <dd className="text-sm">{plant.requirements.soil}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Water</dt>
                <dd className="text-sm">{plant.requirements.water}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Temperature</dt>
                <dd className="text-sm">{plant.requirements.temperature}</dd>
              </div>
            </dl>
          </div>

          {/* Uses */}
          {(plant.uses.medicinal || plant.uses.food || plant.uses.other) && (
            <div>
              <h2 className="text-xl font-semibold">Survival Uses</h2>
              <div className="mt-2 space-y-2">
                {plant.uses.medicinal && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Medicinal</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {plant.uses.medicinal.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plant.uses.food && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Food</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {plant.uses.food.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plant.uses.other && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Other Uses</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {plant.uses.other.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Grow Button */}
          <div className="pt-2">
            <Link 
              href={`/plants/${plant.id}/grow`}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Start Growing This Plant
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 