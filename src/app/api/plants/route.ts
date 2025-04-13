import { NextResponse } from 'next/server';
import { createPlant } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const plantData = await request.json();
    
    // Add any missing required fields
    const plant = {
      ...plantData,
      tags: [],
      stages: {
        planted: false,
        sprouted: false,
        flowering: false,
        harvested: false
      }
    };

    const newPlant = await createPlant(plant);
    
    return NextResponse.json(newPlant, { status: 201 });
  } catch (error) {
    console.error('Error creating plant:', error);
    return NextResponse.json(
      { error: 'Failed to create plant' },
      { status: 500 }
    );
  }
} 