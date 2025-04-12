export interface Plant {
  id: string
  name: string
  description: string
  growthTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: 'Medicinal' | 'Food'
  tags: string[]
  imageUrl: string
  stages: {
    planted: boolean
    sprouted: boolean
    flowering: boolean
    harvested: boolean
  }
  requirements?: {
    sun?: string
    soil: string
    water?: string
    temperature: string
  }
  uses: {
    medicinal?: string[]
    food?: string[]
    other?: string[]
  }
}

export interface UserPlant extends Plant {
  userId: string
  plantedDate: string
  currentStage: keyof Plant['stages']
  nextWateringDate?: string
  notes?: string
  photos?: {
    url: string
    stage: keyof Plant['stages']
    date: string
  }[]
} 