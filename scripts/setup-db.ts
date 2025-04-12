import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  try {
    // Create tables
    await supabase.rpc('exec_sql', {
      sql_string: `
        -- Enable UUID extension
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create tables
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            avatar_url TEXT,
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS plants (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            growth_time TEXT NOT NULL,
            sunlight TEXT NOT NULL,
            water TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            image_url TEXT,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS inventory (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) NOT NULL,
            plant_id UUID REFERENCES plants(id) NOT NULL,
            planted_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            growth_logs JSONB DEFAULT '[]'::jsonb
        );

        CREATE TABLE IF NOT EXISTS medicines (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            ingredients JSONB NOT NULL,
            steps TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS barter (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) NOT NULL,
            offer JSONB NOT NULL,
            want JSONB NOT NULL,
            status TEXT DEFAULT 'open',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS karma (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) NOT NULL,
            points INTEGER DEFAULT 0,
            category TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Insert seed data
    await supabase.rpc('exec_sql', {
      sql_string: `
        -- Insert sample user if not exists
        INSERT INTO users (username, email, avatar_url)
        SELECT 'survivor_1', 'survivor1@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=survivor1'
        WHERE NOT EXISTS (
            SELECT 1 FROM users WHERE username = 'survivor_1'
        );

        -- Insert sample plants if not exists
        INSERT INTO plants (name, category, growth_time, sunlight, water, difficulty, image_url, description)
        SELECT name, category, growth_time, sunlight, water, difficulty, image_url, description
        FROM (VALUES
            ('Tomato', 'Food', '2 weeks', 'Full Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400', 'Easy to grow and versatile vegetable, rich in vitamins.'),
            ('Aloe Vera', 'Medicinal', '3 weeks', 'Partial Sun', 'Weekly', 'Easy', 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400', 'Excellent for burns and skin care.'),
            ('Lavender', 'Utility', '4 weeks', 'Full Sun', 'Bi-weekly', 'Medium', 'https://images.unsplash.com/photo-1498745277243-1ab742c0f93c?w=400', 'Aromatic herb with calming properties.'),
            ('Chamomile', 'Medicinal', '2 weeks', 'Full Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1587593132708-ced45b9a8c93?w=400', 'Makes a soothing tea, helps with sleep.'),
            ('Onion', 'Food', '5 weeks', 'Full Sun', 'Daily', 'Hard', 'https://images.unsplash.com/photo-1587049332298-1c42e83937a7?w=400', 'Essential food plant with long storage life.'),
            ('Mint', 'Medicinal', '3 weeks', 'Partial Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400', 'Fast-growing herb with multiple uses.'),
            ('Radish', 'Food', '1.5 weeks', 'Full Sun', 'Every 2 days', 'Easy', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400', 'Quick-growing root vegetable.'),
            ('Basil', 'Medicinal', '2 weeks', 'Partial Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400', 'Aromatic herb with antibacterial properties.'),
            ('Dandelion', 'Medicinal', '2 weeks', 'Full Sun', 'Every 3 days', 'Easy', 'https://images.unsplash.com/photo-1558697698-9300a84a6a99?w=400', 'Common wild edible with medicinal properties.'),
            ('Cabbage', 'Food', '4 weeks', 'Full Sun', 'Daily', 'Medium', 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400', 'Nutrient-rich vegetable with good storage.'),
            ('Calendula', 'Medicinal', '3 weeks', 'Full Sun', 'Weekly', 'Medium', 'https://images.unsplash.com/photo-1596637510430-78301a44834a?w=400', 'Healing flower for skin conditions.'),
            ('Mushroom', 'Food', '3 weeks', 'Shade', 'Mist Daily', 'Hard', 'https://images.unsplash.com/photo-1611312059346-91e90bae9875?w=400', 'Indoor-grown protein source.')
        ) AS p(name, category, growth_time, sunlight, water, difficulty, image_url, description)
        WHERE NOT EXISTS (
            SELECT 1 FROM plants WHERE plants.name = p.name
        );

        -- Insert sample medicine recipes if not exists
        INSERT INTO medicines (user_id, name, description, ingredients, steps)
        SELECT 
            (SELECT id FROM users WHERE username = 'survivor_1'),
            'Natural Antiseptic',
            'A powerful natural antiseptic for wound care',
            '[{"plant_id": (SELECT id FROM plants WHERE name = ''Calendula''), "amount": "2 flowers"}, {"plant_id": (SELECT id FROM plants WHERE name = ''Lavender''), "amount": "1 sprig"}]'::jsonb,
            '1. Collect fresh calendula flowers and lavender\n2. Crush and mix together\n3. Apply directly to wound'
        WHERE NOT EXISTS (
            SELECT 1 FROM medicines WHERE name = 'Natural Antiseptic'
        );

        -- Insert sample barter offer if not exists
        INSERT INTO barter (user_id, offer, want, status)
        SELECT
            (SELECT id FROM users WHERE username = 'survivor_1'),
            jsonb_build_object(
                'items',
                jsonb_build_array(
                    jsonb_build_object(
                        'plant_id',
                        (SELECT id FROM plants WHERE name = 'Tomato'),
                        'amount',
                        5
                    )
                )
            ),
            jsonb_build_object(
                'items',
                jsonb_build_array(
                    jsonb_build_object(
                        'plant_id',
                        (SELECT id FROM plants WHERE name = 'Mint'),
                        'amount',
                        3
                    )
                )
            ),
            'open'
        WHERE NOT EXISTS (
            SELECT 1 FROM barter WHERE user_id = (SELECT id FROM users WHERE username = 'survivor_1')
        );

        -- Insert sample karma points if not exists
        INSERT INTO karma (user_id, points, category)
        SELECT
            (SELECT id FROM users WHERE username = 'survivor_1'),
            100,
            'planting'
        WHERE NOT EXISTS (
            SELECT 1 FROM karma WHERE user_id = (SELECT id FROM users WHERE username = 'survivor_1')
        );
      `
    })

    console.log('Database setup completed successfully!')
  } catch (error) {
    console.error('Error setting up database:', error)
    process.exit(1)
  }
}

setupDatabase() 