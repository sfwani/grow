import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import path from 'path'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const imageUrlReplacements: Record<string, string> = {
  'https://images.unsplash.com/photo-1587593132708-ced45b9a8c93': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781',
  'https://images.unsplash.com/photo-1498745277243-1ab742c0f93c': 'https://images.unsplash.com/photo-1498745176741-e2e1c878c5da',
  'https://images.unsplash.com/photo-1596637510430-78301a44834a': 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921',
  'https://images.unsplash.com/photo-1611312059346-91e90bae9875': 'https://images.unsplash.com/photo-1611312059346-91e90bae9875'
}

async function fixBrokenImages() {
  try {
    const { data: plants, error: fetchError } = await supabase
      .from('plants')
      .select('id, image_url')

    if (fetchError) {
      throw fetchError
    }

    for (const plant of plants || []) {
      const baseUrl = plant.image_url.split('?')[0]
      const replacement = imageUrlReplacements[baseUrl]

      if (replacement) {
        const { error: updateError } = await supabase
          .from('plants')
          .update({ image_url: `${replacement}?auto=format&fit=crop&w=800&q=80` })
          .eq('id', plant.id)

        if (updateError) {
          console.error(`Error updating plant ${plant.id}:`, updateError)
        } else {
          console.log(`Successfully updated plant ${plant.id}`)
        }
      }
    }
    console.log('Image URL fixes completed!')
  } catch (error) {
    console.error('Error fixing image URLs:', error)
    process.exit(1)
  }
}

fixBrokenImages() 