export interface Medicine {
  id: string
  name: string
  description: string
  ingredients: {
    plantId: string
    plantName: string
    amount: string
  }[]
  uses: string[]
  preparation: string
  dosage: string
  imageUrl: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: 'Tincture' | 'Tea' | 'Poultice' | 'Salve' | 'Syrup' | 'Oil' | 'Balm'
  time: string
  shelf_life: string
} 