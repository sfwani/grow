'use server'

import { Plant } from '@/types/plants'

const OPENFARM_API_BASE = 'https://openfarm.cc/api/v1'

export async function searchPlants(query: string): Promise<Plant[]> {
  const response = await fetch(`${OPENFARM_API_BASE}/crops/search?q=${encodeURIComponent(query)}`)
  
  if (!response.ok) {
    throw new Error(`Failed to search plants: ${response.statusText}`)
  }
  
  const data = await response.json()
  
  // Transform OpenFarm data to our Plant type
  return data.data.map((crop: any) => {
    const attributes = crop.attributes
    
    return {
      id: crop.id,
      name: attributes.name,
      description: attributes.description || 'No description available',
      growthTime: attributes.growing_degree_days ? `${attributes.growing_degree_days} degree days` : 'Unknown',
      difficulty: attributes.difficulty === 1 ? 'Easy' : 
                 attributes.difficulty === 2 ? 'Medium' : 'Hard',
      tags: [
        ...(attributes.sun_requirements ? [attributes.sun_requirements] : []),
        ...(attributes.sowing_method ? ['Sowing: ' + attributes.sowing_method] : []),
        ...(attributes.row_spacing ? [`Row spacing: ${attributes.row_spacing}cm`] : []),
      ],
      imageUrl: attributes.main_image_path || '/images/plants/default-plant.jpg',
      stages: {
        planted: false,
        sprouted: false,
        flowering: false,
        harvested: false,
      },
      requirements: {
        sun: attributes.sun_requirements || 'Unknown',
        soil: attributes.soil_requirements || 'Unknown',
        water: 'Moderate', // OpenFarm doesn't have direct water requirements
        temperature: attributes.temperature_requirements || 'Unknown',
      },
      uses: {
        medicinal: attributes.medicinal_use ? [attributes.medicinal_use] : undefined,
        food: attributes.culinary_use ? [attributes.culinary_use] : undefined,
        other: attributes.other_uses ? [attributes.other_uses] : undefined,
      }
    }
  })
}

export async function getPlantById(id: string): Promise<Plant> {
  const response = await fetch(`${OPENFARM_API_BASE}/crops/${id}`)
  
  if (!response.ok) {
    throw new Error(`Failed to get plant: ${response.statusText}`)
  }
  
  const data = await response.json()
  const crop = data.data
  const attributes = crop.attributes
  
  return {
    id: crop.id,
    name: attributes.name,
    description: attributes.description || 'No description available',
    growthTime: attributes.growing_degree_days ? `${attributes.growing_degree_days} degree days` : 'Unknown',
    difficulty: attributes.difficulty === 1 ? 'Easy' : 
               attributes.difficulty === 2 ? 'Medium' : 'Hard',
    tags: [
      ...(attributes.sun_requirements ? [attributes.sun_requirements] : []),
      ...(attributes.sowing_method ? ['Sowing: ' + attributes.sowing_method] : []),
      ...(attributes.row_spacing ? [`Row spacing: ${attributes.row_spacing}cm`] : []),
    ],
    imageUrl: attributes.main_image_path || '/images/plants/default-plant.jpg',
    stages: {
      planted: false,
      sprouted: false,
      flowering: false,
      harvested: false,
    },
    requirements: {
      sun: attributes.sun_requirements || 'Unknown',
      soil: attributes.soil_requirements || 'Unknown',
      water: 'Moderate', // OpenFarm doesn't have direct water requirements
      temperature: attributes.temperature_requirements || 'Unknown',
    },
    uses: {
      medicinal: attributes.medicinal_use ? [attributes.medicinal_use] : undefined,
      food: attributes.culinary_use ? [attributes.culinary_use] : undefined,
      other: attributes.other_uses ? [attributes.other_uses] : undefined,
    }
  }
} 