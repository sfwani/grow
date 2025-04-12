import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPlants() {
  const { data: plants, error } = await supabase
    .from('plants')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching plants:', error)
    return []
  }

  // Transform the data to match our Plant interface
  return plants.map(plant => ({
    id: plant.id,
    name: plant.name,
    description: plant.description,
    growthTime: plant.growth_time,
    difficulty: plant.difficulty as 'Easy' | 'Medium' | 'Hard',
    tags: [plant.category],
    imageUrl: plant.image_url,
    stages: {
      planted: false,
      sprouted: false,
      flowering: false,
      harvested: false
    },
    requirements: {
      sun: plant.sunlight,
      soil: 'Any',
      water: plant.water,
      temperature: 'Moderate'
    },
    uses: {
      [plant.category.toLowerCase()]: [plant.description]
    }
  }))
}

export async function searchPlantsByCategory(category: string) {
  const { data: plants, error } = await supabase
    .from('plants')
    .select('*')
    .ilike('category', `%${category}%`)
    .order('name')

  if (error) {
    console.error('Error searching plants:', error)
    return []
  }

  return plants.map(plant => ({
    id: plant.id,
    name: plant.name,
    description: plant.description,
    growthTime: plant.growth_time,
    difficulty: plant.difficulty as 'Easy' | 'Medium' | 'Hard',
    tags: [plant.category],
    imageUrl: plant.image_url,
    stages: {
      planted: false,
      sprouted: false,
      flowering: false,
      harvested: false
    },
    requirements: {
      sun: plant.sunlight,
      soil: 'Any',
      water: plant.water,
      temperature: 'Moderate'
    },
    uses: {
      [plant.category.toLowerCase()]: [plant.description]
    }
  }))
} 