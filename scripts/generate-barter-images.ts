import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const ITEM_WIDTH = 800;
const ITEM_HEIGHT = 600;
const AVATAR_SIZE = 200;

const barterItems = [
  { name: 'Combat Knife', filename: 'knife.jpg' },
  { name: 'Medicinal Herbs', filename: 'herbs.jpg' },
  { name: 'Canned Food', filename: 'canned-food.jpg' },
  { name: 'Water Filter', filename: 'water-filter.jpg' },
  { name: 'Crossbow', filename: 'crossbow.jpg' },
  { name: 'Solar Generator', filename: 'solar-generator.jpg' },
  { name: 'Medical Kit', filename: 'medical-kit.jpg' },
  { name: 'Machete', filename: 'machete.jpg' },
  { name: 'Dried Meat', filename: 'dried-meat.jpg' },
  { name: 'Tools', filename: 'tools.jpg' },
  { name: 'Ammunition', filename: 'ammo.jpg' },
  { name: 'Seeds', filename: 'seeds.jpg' }
];

const avatars = Array.from({ length: 12 }, (_, i) => ({
  name: `Avatar ${i + 1}`,
  filename: `avatar${i + 1}.jpg`
}));

function generateItemImage(name: string, outputPath: string) {
  const canvas = createCanvas(ITEM_WIDTH, ITEM_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Dark background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, ITEM_WIDTH, ITEM_HEIGHT);

  // Add some texture
  ctx.fillStyle = '#222222';
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * ITEM_WIDTH;
    const y = Math.random() * ITEM_HEIGHT;
    const size = Math.random() * 50 + 10;
    ctx.fillRect(x, y, size, size);
  }

  // Add text
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, ITEM_WIDTH / 2, ITEM_HEIGHT / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

function generateAvatarImage(name: string, outputPath: string) {
  const canvas = createCanvas(AVATAR_SIZE, AVATAR_SIZE);
  const ctx = canvas.getContext('2d');

  // Circular background
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.arc(AVATAR_SIZE / 2, AVATAR_SIZE / 2, AVATAR_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  // Add initials
  const initials = name.split(' ').map(word => word[0]).join('');
  ctx.font = 'bold 72px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, AVATAR_SIZE / 2, AVATAR_SIZE / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Create directories if they don't exist
const barterDir = path.join(process.cwd(), 'public', 'images', 'barter');
const avatarsDir = path.join(process.cwd(), 'public', 'images', 'avatars');

if (!fs.existsSync(barterDir)) {
  fs.mkdirSync(barterDir, { recursive: true });
}
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Generate barter item images
barterItems.forEach(item => {
  const outputPath = path.join(barterDir, item.filename);
  generateItemImage(item.name, outputPath);
});

// Generate avatar images
avatars.forEach(avatar => {
  const outputPath = path.join(avatarsDir, avatar.filename);
  generateAvatarImage(avatar.name, outputPath);
});

console.log('All images generated successfully!'); 