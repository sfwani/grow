import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const updatedImageUrls = {
  'Tomato': 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
  'Aloe Vera': 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
  'Lavender': 'https://images.unsplash.com/photo-1498745176741-e2e1c878c5da?auto=format&fit=crop&w=800&q=80',
  'Chamomile': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
  'Onion': 'https://images.unsplash.com/photo-1587049332298-1c42e83937a7?auto=format&fit=crop&w=800&q=80',
  'Mint': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
  'Radish': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=800&q=80',
  'Basil': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=800&q=80',
  'Dandelion': 'https://images.unsplash.com/photo-1620145000662-4d4b1bf6ce6e?auto=format&fit=crop&w=800&q=80',
  'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80',
  'Calendula': 'https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?auto=format&fit=crop&w=800&q=80',
  'Mushroom': 'https://images.unsplash.com/photo-1611312059346-91e90bae9875?auto=format&fit=crop&w=800&q=80'
}

async function updateImageUrls() {
  try {
    for (const [name, imageUrl] of Object.entries(updatedImageUrls)) {
      const { error } = await supabase
        .from('plants')
        .update({ image_url: imageUrl })
        .eq('name', name)

      if (error) {
        console.error(`Error updating ${name}:`, error)
      } else {
        console.log(`Successfully updated ${name}`)
      }
    }
    console.log('Image URL update completed!')
  } catch (error) {
    console.error('Error updating image URLs:', error)
    process.exit(1)
  }
}

updateImageUrls() 