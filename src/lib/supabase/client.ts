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
    category: plant.category as 'Medicinal' | 'Food',
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
  const query = supabase.from('plants').select('*')

  if (category && category.toLowerCase() !== 'all') {
    query.eq('category', category)
  }

  const { data: plants, error } = await query.order('name')

  if (error) {
    throw new Error(`Failed to search plants: ${error.message}`)
  }

  return plants.map(plant => ({
    id: plant.id,
    name: plant.name,
    description: plant.description,
    growthTime: plant.growth_time,
    difficulty: plant.difficulty,
    category: plant.category as 'Medicinal' | 'Food',
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
      temperature: plant.temperature_range
    },
    uses: {
      [plant.category.toLowerCase()]: [plant.description]
    }
  }))
}

export async function getPlantById(id: string) {
  const { data: plant, error } = await supabase
    .from('plants')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get plant: ${error.message}`)
  }

  if (!plant) {
    throw new Error('Plant not found')
  }

  // Transform the data to match our Plant interface
  return {
    id: plant.id,
    name: plant.name,
    description: plant.description,
    growthTime: plant.growth_time,
    difficulty: plant.difficulty as 'Easy' | 'Medium' | 'Hard',
    category: plant.category as 'Medicinal' | 'Food',
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
  }
}

export async function createPlant(plant: any) {
  const { data, error } = await supabase
    .from('plants')
    .insert([plant])
    .select()
    .single();

  if (error) {
    console.error('Error creating plant:', error);
    throw error;
  }

  return data;
} 