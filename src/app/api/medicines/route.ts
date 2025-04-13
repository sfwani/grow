import { NextRequest, NextResponse } from 'next/server'
import { Medicine } from '@/types/medicines'
import { v4 as uuidv4 } from 'uuid'

const medicines: Medicine[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'ingredients', 'uses', 'preparation', 'dosage', 'difficulty', 'category', 'time', 'shelf_life']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate ingredients structure
    if (!Array.isArray(body.ingredients) || !body.ingredients.every((ing: any) => 
      ing.plantId && ing.plantName && ing.amount
    )) {
      return NextResponse.json(
        { error: 'Invalid ingredients structure. Each ingredient must have plantId, plantName, and amount.' },
        { status: 400 }
      )
    }

    // Validate difficulty and category
    const validDifficulties = ['Easy', 'Medium', 'Hard']
    const validCategories = ['Tincture', 'Tea', 'Poultice', 'Salve', 'Syrup', 'Oil', 'Balm']

    if (!validDifficulties.includes(body.difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty level. Must be Easy, Medium, or Hard.' },
        { status: 400 }
      )
    }

    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: Tincture, Tea, Poultice, Salve, Syrup, Oil, Balm.' },
        { status: 400 }
      )
    }

    const newMedicine: Medicine = {
      id: uuidv4(),
      name: body.name,
      description: body.description,
      ingredients: body.ingredients,
      uses: body.uses,
      preparation: body.preparation,
      dosage: body.dosage,
      imageUrl: body.imageUrl || '',
      difficulty: body.difficulty,
      category: body.category,
      time: body.time,
      shelf_life: body.shelf_life
    }

    medicines.push(newMedicine)

    return NextResponse.json(newMedicine, { status: 201 })
  } catch (error) {
    console.error('Error creating medicine:', error)
    return NextResponse.json(
      { error: 'Failed to create medicine' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(medicines)
} 