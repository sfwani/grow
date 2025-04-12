import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Medicine } from '@/types/medicines'
import { getPlants } from '@/lib/supabase/client'

// This ensures fresh data on each request
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getMedicines() {
  // Get all plants to map their names to IDs
  const plants = await getPlants()
  const plantMap = new Map(plants.map(plant => [plant.name.toLowerCase(), plant.id]))

  const medicines: Medicine[] = [
    {
      id: 'respiratory-support-syrup',
      name: 'Respiratory Support Syrup',
      description: 'A natural syrup that helps clear airways and support respiratory health.',
      ingredients: [
        { plantId: plantMap.get('thyme') || '', plantName: 'Thyme', amount: '2 parts fresh herb' },
        { plantId: plantMap.get('elderberry') || '', plantName: 'Elderberry', amount: '1 part dried berries' },
        { plantId: plantMap.get('mint') || '', plantName: 'Peppermint', amount: '1 part fresh leaves' }
      ],
      uses: [
        'Support respiratory health',
        'Soothe coughs',
        'Clear congestion'
      ],
      preparation: 'Simmer herbs in water for 30 minutes. Strain and add honey (1:1 ratio). Bottle and refrigerate.',
      dosage: '1-2 teaspoons 3 times daily',
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400',
      difficulty: 'Medium',
      category: 'Syrup',
      time: '1 hour',
      shelf_life: '1 month refrigerated'
    },
    {
      id: 'joint-relief-oil',
      name: 'Joint Relief Oil',
      description: 'An herbal-infused oil blend for soothing joint pain and inflammation.',
      ingredients: [
        { plantId: plantMap.get('turmeric') || '', plantName: 'Turmeric', amount: '2 parts fresh root' },
        { plantId: plantMap.get('ginger') || '', plantName: 'Ginger', amount: '1 part fresh root' },
        { plantId: plantMap.get('holy basil') || '', plantName: 'Holy Basil', amount: '2 parts fresh leaves' }
      ],
      uses: [
        'Reduce joint pain',
        'Decrease inflammation',
        'Improve mobility'
      ],
      preparation: 'Infuse herbs in olive oil for 4-6 weeks in a dark place. Strain and bottle.',
      dosage: 'Massage into affected areas 2-3 times daily',
      imageUrl: 'https://images.unsplash.com/photo-1584473457409-ae5c91d211ff?w=400',
      difficulty: 'Easy',
      category: 'Oil',
      time: '4-6 weeks',
      shelf_life: '6 months'
    },
    {
      id: 'digestive-wellness-tea',
      name: 'Digestive Wellness Tea',
      description: 'A soothing blend to support digestive health and reduce bloating.',
      ingredients: [
        { plantId: plantMap.get('mint') || '', plantName: 'Peppermint', amount: '2 parts leaves' },
        { plantId: plantMap.get('ginger') || '', plantName: 'Ginger', amount: '1 part dried root' },
        { plantId: plantMap.get('fennel') || '', plantName: 'Fennel', amount: '1 part seeds' }
      ],
      uses: [
        'Aid digestion',
        'Reduce bloating',
        'Calm stomach discomfort'
      ],
      preparation: 'Mix dried herbs. Use 1 teaspoon per cup of hot water. Steep covered for 10 minutes.',
      dosage: '1 cup after meals or as needed',
      imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
      difficulty: 'Easy',
      category: 'Tea',
      time: '10 minutes',
      shelf_life: '1 year (dried herbs)'
    },
    {
      id: 'skin-repair-balm',
      name: 'Skin Repair Balm',
      description: 'A nourishing balm for dry, damaged, or irritated skin.',
      ingredients: [
        { plantId: plantMap.get('calendula') || '', plantName: 'Calendula', amount: '2 parts flowers' },
        { plantId: plantMap.get('aloe vera') || '', plantName: 'Aloe Vera', amount: '1 part gel' },
        { plantId: plantMap.get('lavender') || '', plantName: 'Lavender', amount: '1 part flowers' }
      ],
      uses: [
        'Repair damaged skin',
        'Soothe irritation',
        'Moisturize dry areas'
      ],
      preparation: 'Infuse herbs in oil, strain, then heat with beeswax (4:1 ratio oil to wax). Add essential oils if desired.',
      dosage: 'Apply to affected areas as needed',
      imageUrl: 'https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?w=400',
      difficulty: 'Medium',
      category: 'Balm',
      time: '3 hours',
      shelf_life: '1 year'
    },
    {
      id: 'immune-boost-tincture',
      name: 'Immune Boost Tincture',
      description: 'A powerful immune-boosting tincture combining echinacea and astragalus roots.',
      ingredients: [
        { plantId: plantMap.get('echinacea') || '', plantName: 'Echinacea', amount: '2 parts fresh root' },
        { plantId: plantMap.get('astragalus') || '', plantName: 'Astragalus', amount: '1 part dried root' }
      ],
      uses: [
        'Strengthen immune system',
        'Fight off colds and flu',
        'Reduce inflammation'
      ],
      preparation: 'Combine herbs with 80 proof vodka in a jar (1:5 ratio). Store in a dark place for 6-8 weeks, shaking daily. Strain and bottle.',
      dosage: '30-60 drops (1-2 ml) 3 times daily at first sign of illness',
      imageUrl: 'https://images.unsplash.com/photo-1612540139150-4e7fe3d65b24?w=400',
      difficulty: 'Medium',
      category: 'Tincture',
      time: '6-8 weeks',
      shelf_life: '3-5 years'
    },
    {
      id: 'calming-tea-blend',
      name: 'Calming Tea Blend',
      description: 'A soothing herbal tea blend to promote relaxation and better sleep.',
      ingredients: [
        { plantId: plantMap.get('chamomile') || '', plantName: 'Chamomile', amount: '2 parts flowers' },
        { plantId: plantMap.get('lavender') || '', plantName: 'Lavender', amount: '1 part flowers' },
        { plantId: plantMap.get('mint') || '', plantName: 'Lemon Balm', amount: '2 parts leaves' }
      ],
      uses: [
        'Reduce anxiety and stress',
        'Improve sleep quality',
        'Aid digestion'
      ],
      preparation: 'Mix dried herbs together. Use 1-2 teaspoons per cup of hot water. Steep for 5-10 minutes.',
      dosage: '1 cup before bedtime or during times of stress',
      imageUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400',
      difficulty: 'Easy',
      category: 'Tea',
      time: '10 minutes',
      shelf_life: '1 year (dried herbs)'
    },
    {
      id: 'healing-salve',
      name: 'All-Purpose Healing Salve',
      description: 'A versatile healing salve for cuts, burns, and skin irritations.',
      ingredients: [
        { plantId: plantMap.get('calendula') || '', plantName: 'Calendula', amount: '2 parts flowers' },
        { plantId: plantMap.get('aloe vera') || '', plantName: 'Aloe Vera', amount: '1 part gel' },
        { plantId: plantMap.get('thyme') || '', plantName: 'Thyme', amount: '1 part leaves' }
      ],
      uses: [
        'Heal minor cuts and scrapes',
        'Soothe burns and sunburns',
        'Treat skin infections'
      ],
      preparation: 'Infuse herbs in oil for 4-6 weeks. Strain and heat with beeswax (1:4 ratio) until melted. Pour into containers.',
      dosage: 'Apply thin layer to affected area 2-3 times daily',
      imageUrl: 'https://images.unsplash.com/photo-1612540139150-4e7fe3d65b24?w=400',
      difficulty: 'Medium',
      category: 'Salve',
      time: '4-6 weeks',
      shelf_life: '1 year'
    },
    {
      id: 'pain-relief-poultice',
      name: 'Pain Relief Poultice',
      description: 'A traditional poultice for reducing pain and inflammation.',
      ingredients: [
        { plantId: plantMap.get('ginger') || '', plantName: 'Ginger', amount: '2 parts fresh root' },
        { plantId: plantMap.get('holy basil') || '', plantName: 'Holy Basil', amount: '2 parts leaves' },
        { plantId: plantMap.get('mint') || '', plantName: 'Peppermint', amount: '1 part leaves' }
      ],
      uses: [
        'Relieve muscle pain',
        'Reduce joint inflammation',
        'Ease headaches'
      ],
      preparation: 'Grind fresh herbs into a paste. Add enough hot water to make a thick paste. Apply between two layers of clean cloth.',
      dosage: 'Apply to affected area for 20-30 minutes, 2-3 times daily',
      imageUrl: 'https://images.unsplash.com/photo-1612540139150-4e7fe3d65b24?w=400',
      difficulty: 'Easy',
      category: 'Poultice',
      time: '15 minutes',
      shelf_life: 'Use immediately'
    }
  ]

  // Filter out medicines with missing plant IDs
  return medicines.map(medicine => ({
    ...medicine,
    ingredients: medicine.ingredients.filter(ingredient => ingredient.plantId)
  }))
}

function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Link
      href={`/medicine/${medicine.id}`}
      className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={medicine.imageUrl} 
          alt={medicine.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold tracking-tight text-white">{medicine.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/90">{medicine.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            medicine.category === 'Tincture' ? 'bg-purple-100 text-purple-800' :
            medicine.category === 'Tea' ? 'bg-green-100 text-green-800' :
            medicine.category === 'Salve' ? 'bg-blue-100 text-blue-800' :
            medicine.category === 'Syrup' ? 'bg-yellow-100 text-yellow-800' :
            medicine.category === 'Oil' ? 'bg-orange-100 text-orange-800' :
            medicine.category === 'Balm' ? 'bg-pink-100 text-pink-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {medicine.category}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
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
              className="h-4 w-4 text-primary"
            >
              <path d="M12 2v6"/>
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Prep Time:</span>
              <span className="text-sm font-medium">{medicine.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              className="h-4 w-4 text-primary"
            >
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Shelf Life:</span>
              <span className="text-sm font-medium">{medicine.shelf_life}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
                medicine.difficulty === 'Easy' ? 'text-green-500' :
                medicine.difficulty === 'Medium' ? 'text-yellow-500' :
                'text-red-500'
              }`}
            >
              <path d="M12 2v20"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/>
              <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              <span className={`text-sm font-medium ${
                medicine.difficulty === 'Easy' ? 'text-green-600' :
                medicine.difficulty === 'Medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {medicine.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-sm text-muted-foreground">Ingredients:</span>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {medicine.ingredients.map((ingredient) => (
              <Link
                key={ingredient.plantId}
                href={`/plants/${ingredient.plantId}`}
                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/20"
              >
                {ingredient.plantName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function MedicinePage() {
  const medicines = await getMedicines()
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Natural Medicine Guide</h1>
          <p className="mt-2 text-muted-foreground">
            Traditional remedies using medicinal plants for common ailments
          </p>
        </div>
        
        {/* Medicine grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  )
} 