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
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              medicine.category === 'Tincture' ? 'bg-purple-500/10 text-purple-400' :
              medicine.category === 'Tea' ? 'bg-emerald-500/10 text-emerald-400' :
              medicine.category === 'Salve' ? 'bg-blue-500/10 text-blue-400' :
              medicine.category === 'Syrup' ? 'bg-amber-500/10 text-amber-400' :
              medicine.category === 'Oil' ? 'bg-orange-500/10 text-orange-400' :
              medicine.category === 'Balm' ? 'bg-pink-500/10 text-pink-400' :
              'bg-gray-500/10 text-gray-400'
            }`}>
              {medicine.category}
            </span>
            <span className={`text-xs font-medium ${
              medicine.difficulty === 'Easy' ? 'text-green-500' :
              medicine.difficulty === 'Medium' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {medicine.difficulty}
            </span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-emerald-400 transition-colors">
            {medicine.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{medicine.description}</p>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
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
                  className="h-4 w-4 text-emerald-400"
                >
                  <path d="M12 2v6"/>
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
                </svg>
                <span>{medicine.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
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
                  className="h-4 w-4 text-emerald-400"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{medicine.shelf_life}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Key Ingredients:</span>
              <div className="flex flex-wrap gap-1">
                {medicine.ingredients.slice(0, 2).map((ingredient) => (
                  <span
                    key={ingredient.plantId}
                    className="inline-flex items-center rounded-full bg-emerald-500/5 px-2 py-0.5 text-xs font-medium text-emerald-400"
                  >
                    {ingredient.plantName}
                  </span>
                ))}
                {medicine.ingredients.length > 2 && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/5 px-2 py-0.5 text-xs font-medium text-emerald-400">
                    +{medicine.ingredients.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const categories = [
  'Syrup',
  'Oil',
  'Tea',
  'Balm',
  'Tincture',
  'Salve',
  'Poultice'
];

const difficultyColors = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  Hard: 'text-rose-400'
};

export default async function MedicinePage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const medicines = await getMedicines();
  const filteredMedicines = medicines.filter(medicine => 
    (!searchParams.category || medicine.category === searchParams.category) &&
    (!searchParams.q || medicine.name.toLowerCase().includes(searchParams.q.toLowerCase()) || 
     medicine.description.toLowerCase().includes(searchParams.q.toLowerCase()))
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Herbal Medicine</h1>
          <p className="mt-2 text-gray-400">
            Natural remedies for post-apocalyptic survival
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/medicine/create"
            className="inline-flex items-center justify-center rounded-md bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 shadow hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
          >
            Create Recipe
          </Link>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/medicine"
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !searchParams.category 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Recipes
          </Link>
          {categories.map((category) => (
            <Link 
              key={category}
              href={`/medicine?category=${category}`}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                searchParams.category === category
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        <form className="relative">
          <input
            type="text"
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search remedies..."
            className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-700 bg-gray-800/50 text-sm text-gray-200 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 placeholder:text-gray-500"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
} 