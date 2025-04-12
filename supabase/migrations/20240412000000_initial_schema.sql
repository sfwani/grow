-- Drop existing tables if they exist
DROP TABLE IF EXISTS karma CASCADE;
DROP TABLE IF EXISTS barter CASCADE;
DROP TABLE IF EXISTS medicines CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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

-- Insert sample user
INSERT INTO users (username, email, avatar_url) VALUES
('survivor_1', 'survivor1@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=survivor1');

-- Insert sample plants
INSERT INTO plants (name, category, growth_time, sunlight, water, difficulty, image_url, description) VALUES
('Tomato', 'Food', '2 weeks', 'Full Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80', 'Easy to grow and versatile vegetable, rich in vitamins.'),
('Aloe Vera', 'Medicinal', '3 weeks', 'Partial Sun', 'Weekly', 'Easy', 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80', 'Excellent for burns and skin care.'),
('Lavender', 'Utility', '4 weeks', 'Full Sun', 'Bi-weekly', 'Medium', 'https://images.unsplash.com/photo-1498745176741-e2e1c878c5da?auto=format&fit=crop&w=800&q=80', 'Aromatic herb with calming properties.'),
('Chamomile', 'Medicinal', '2 weeks', 'Full Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80', 'Makes a soothing tea, helps with sleep.'),
('Onion', 'Food', '5 weeks', 'Full Sun', 'Daily', 'Hard', 'https://images.unsplash.com/photo-1587049332298-1c42e83937a7?auto=format&fit=crop&w=800&q=80', 'Essential food plant with long storage life.'),
('Mint', 'Medicinal', '3 weeks', 'Partial Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80', 'Fast-growing herb with multiple uses.'),
('Radish', 'Food', '1.5 weeks', 'Full Sun', 'Every 2 days', 'Easy', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=800&q=80', 'Quick-growing root vegetable.'),
('Basil', 'Medicinal', '2 weeks', 'Partial Sun', 'Daily', 'Easy', 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=800&q=80', 'Aromatic herb with antibacterial properties.'),
('Dandelion', 'Medicinal', '2 weeks', 'Full Sun', 'Every 3 days', 'Easy', 'https://images.unsplash.com/photo-1620145000662-4d4b1bf6ce6e?auto=format&fit=crop&w=800&q=80', 'Common wild edible with medicinal properties.'),
('Cabbage', 'Food', '4 weeks', 'Full Sun', 'Daily', 'Medium', 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80', 'Nutrient-rich vegetable with good storage.'),
('Calendula', 'Medicinal', '3 weeks', 'Full Sun', 'Weekly', 'Medium', 'https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?auto=format&fit=crop&w=800&q=80', 'Healing flower for skin conditions.'),
('Mushroom', 'Food', '3 weeks', 'Shade', 'Mist Daily', 'Hard', 'https://images.unsplash.com/photo-1611312059346-91e90bae9875?auto=format&fit=crop&w=800&q=80', 'Indoor-grown protein source.');

-- Insert sample medicine recipes
INSERT INTO medicines (user_id, name, description, ingredients, steps) VALUES
((SELECT id FROM users WHERE username = 'survivor_1'), 
'Natural Antiseptic', 
'A powerful natural antiseptic for wound care',
'[{"plant_id": "SELECT id FROM plants WHERE name = ''Calendula''", "amount": "2 flowers"}, {"plant_id": "SELECT id FROM plants WHERE name = ''Lavender''", "amount": "1 sprig"}]'::jsonb,
'1. Collect fresh calendula flowers and lavender\n2. Crush and mix together\n3. Apply directly to wound');

-- Insert sample barter offer
INSERT INTO barter (user_id, offer, want, status) VALUES
((SELECT id FROM users WHERE username = 'survivor_1'),
'{"items": [{"plant_id": "SELECT id FROM plants WHERE name = ''Tomato''", "amount": 5}]}'::jsonb,
'{"items": [{"plant_id": "SELECT id FROM plants WHERE name = ''Mint''", "amount": 3}]}'::jsonb,
'open');

-- Insert sample karma points
INSERT INTO karma (user_id, points, category) VALUES
((SELECT id FROM users WHERE username = 'survivor_1'), 100, 'planting'); 