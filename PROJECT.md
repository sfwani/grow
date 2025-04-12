# 🌿 Project Name: **Verdant Vault**  
*(A Post-Apocalyptic Survival Gardening & Barter App)*

## 🧠 Idea Overview

Build a fully responsive, animated web app using **Next.js 14 (App Router)**, **TailwindCSS**, and **Supabase** as the backend. This app is themed around a **post-apocalyptic world** where users must **grow their own plants**, **craft survival medicine**, and **barter with others** to stay alive. There is no external API dependency — **all plant and survival knowledge is stored and grown by the community itself**.

---

## 💾 Tech Stack

- **Frontend**: Next.js 14, App Router, TailwindCSS, Framer Motion (for animations)
- **Backend**: Supabase (database + auth)
- **AI**: Gemini API (for survival suggestions and usage of plants in inventory)

---

## 🔧 Setup Instructions for Cursor

1. Connect to **Supabase** using the terminal.
2. Automatically create the following tables:
    - `plants`
    - `inventory`
    - `medicines`
    - `barter`
    - `karma`
    - `users`
3. Seed the database with sample **plant data** (at least 12 entries) with the following fields:
    - `name`
    - `category` (e.g., food, medicinal, utility)
    - `growth_time` (e.g., "2 weeks")
    - `sunlight` (e.g., "Full sun", "Partial shade")
    - `water` (e.g., "Moderate daily", "Weekly")
    - `difficulty` (e.g., "Easy", "Hard")
    - `image_url`
    - `description`
    - `user_id` (nullable for global entries)
    - `created_at`
4. Also, generate **mock users and sample data** for each table (e.g., growth logs, barter offers, recipes).

---

## 🌍 Pages / Tabs

### 1. 🌱 **Plants Page**
- Display **community-submitted plants** in **grid-based square cards**.
- Each plant card includes:
  - Name
  - Growth time
  - Category
  - Sunlight & water needs
  - Difficulty
  - Image
- Animate cards on hover/click using **Framer Motion**.
- Clicking “🌿 Grow This”:
  - Adds the plant to user’s **inventory**
  - Opens a **growth log page** to track planting progress
- Include a form at the top or sidebar for **adding new plants**, which saves directly to Supabase.
- Only logged-in users can add.

---

### 2. 🧪 **Medicinal Recipes Page**
- Show survival recipes (e.g., natural antiseptic, detox tea).
- Each recipe includes:
  - Name
  - Description
  - Required ingredients (linked to growable plants)
  - Steps
- Users can click “Grow ingredient” to add it to their inventory.
- Add community contribution feature to submit new recipes.

---

### 3. 🔁 **Barter Page**
- Community bartering system:
  - Users can post **items they want** and **items they’re offering**
  - When clicking "Trade", show a **popup with user's inventory** for selection
- Use Supabase to store trade offers:
  - `barter_id`, `user_id`, `want`, `offer`, `created_at`
- Animations for offer submission and trade confirmation.

---

### 4. 🧠 **AI Companion Page (Gemini API)**
- Show user’s **inventory**
- Users select multiple items and ask:  
  - “What can I make with these?”
  - “Can I trade something useful?”
- Use Gemini to generate survival insights and recipes.
- Display result in conversational format or collapsible cards.

---

### 5. 🏆 **Karma Leaderboard**
- Display a weekly leaderboard of most active community members.
- Karma points earned by:
  - Adding plants
  - Logging growth
  - Submitting trades
  - Sharing medicines
- Animated counters and glowing badges for top contributors.

---

## 📦 Supabase Tables

### `plants`
```sql
id UUID PRIMARY KEY,
user_id UUID,
name TEXT,
category TEXT,
growth_time TEXT,
sunlight TEXT,
water TEXT,
difficulty TEXT,
image_url TEXT,
description TEXT,
created_at TIMESTAMP
```

### `inventory`
```sql
id UUID PRIMARY KEY,
user_id UUID,
plant_id UUID,
planted_on TIMESTAMP,
growth_logs JSONB
```

### `medicines`
```sql
id UUID PRIMARY KEY,
user_id UUID,
name TEXT,
description TEXT,
ingredients JSONB, -- reference plant_ids
steps TEXT,
created_at TIMESTAMP
```

### `barter`
```sql
id UUID PRIMARY KEY,
user_id UUID,
offer JSONB,
want JSONB,
status TEXT,
created_at TIMESTAMP
```

### `karma`
```sql
id UUID PRIMARY KEY,
user_id UUID,
points INT,
category TEXT,
created_at TIMESTAMP
```

### `users`
```sql
id UUID PRIMARY KEY,
username TEXT,
email TEXT,
avatar_url TEXT,
joined_at TIMESTAMP
```

---

## 🌱 Seed Data (12 Example Plants)

Please populate Supabase with example entries like:

| Name          | Growth Time | Category  | Sunlight    | Water         | Difficulty | Image URL                  |
|---------------|-------------|-----------|-------------|---------------|------------|----------------------------|
| Tomato        | 2 weeks     | Food      | Full Sun    | Daily         | Easy       | `https://...`              |
| Aloe Vera     | 3 weeks     | Medicinal | Partial Sun | Weekly        | Easy       | `https://...`              |
| Lavender      | 4 weeks     | Utility   | Full Sun    | Bi-weekly     | Medium     | `https://...`              |
| Chamomile     | 2 weeks     | Medicinal | Full Sun    | Daily         | Easy       | `https://...`              |
| Onion         | 5 weeks     | Food      | Full Sun    | Daily         | Hard       | `https://...`              |
| Mint          | 3 weeks     | Medicinal | Partial Sun | Daily         | Easy       | `https://...`              |
| Radish        | 1.5 weeks   | Food      | Full Sun    | Every 2 days  | Easy       | `https://...`              |
| Basil         | 2 weeks     | Medicinal | Partial Sun | Daily         | Easy       | `https://...`              |
| Dandelion     | 2 weeks     | Medicinal | Full Sun    | Every 3 days  | Easy       | `https://...`              |
| Cabbage       | 4 weeks     | Food      | Full Sun    | Daily         | Medium     | `https://...`              |
| Calendula     | 3 weeks     | Medicinal | Full Sun    | Weekly        | Medium     | `https://...`              |
| Mushroom (DIY)| 3 weeks     | Food      | Shade       | Mist Daily    | Hard       | `https://...`              |

---

## 🌐 Suggested Domain Names

| Name             | Theme Connection                          |
|------------------|-------------------------------------------|
| verdantvault.com | Lush growth + storing survival knowledge  |
| growntrade.com   | Grow and trade your way to survival       |
| botanica.zone    | A cool thematic survival/gardening hub    |
| survivagarden.com| Survival + garden mash-up                 |
| barterbloom.com  | Trading and growing, post-collapse        |
| seedcycle.org    | The rebirth of life through seeds         |

---

*Generated on 2025-04-12*
