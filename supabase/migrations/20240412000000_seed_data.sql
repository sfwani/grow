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
    '[{"plant_id": "SELECT id FROM plants WHERE name = ''Calendula''", "amount": "2 flowers"}, {"plant_id": "SELECT id FROM plants WHERE name = ''Lavender''", "amount": "1 sprig"}]'::jsonb,
    '1. Collect fresh calendula flowers and lavender\n2. Crush and mix together\n3. Apply directly to wound'
WHERE NOT EXISTS (
    SELECT 1 FROM medicines WHERE name = 'Natural Antiseptic'
);

-- Insert sample barter offer if not exists
INSERT INTO barter (user_id, offer, want, status)
SELECT
    (SELECT id FROM users WHERE username = 'survivor_1'),
    '{"items": [{"plant_id": "SELECT id FROM plants WHERE name = ''Tomato''", "amount": 5}]}'::jsonb,
    '{"items": [{"plant_id": "SELECT id FROM plants WHERE name = ''Mint''", "amount": 3}]}'::jsonb,
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