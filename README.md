# MoodChef 🍽️

> An emotion-aware recipe finder that suggests what to cook based on how you feel.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is MoodChef?

MoodChef reads your current emotional state and recommends real recipes that match it. Stressed after a long day? Get quick 15-minute comfort food. Happy and energetic? Discover something adventurous and new. Sad? Warm, hearty dishes to lift your spirits.

The app uses the **Spoonacular API** for real recipe data and **face-api.js** for optional webcam-based emotion detection — so you can either pick your mood manually or let the app detect it from your face.

---

## Features

- **6 emotion states** — Stressed, Happy, Sad, Calm, Focused, Excited
- **Dynamic UI theming** — the entire app visually shifts per mood
- **Real recipe data** — powered by the Spoonacular API (photos, ingredients, steps)
- **Interactive ingredient checklist** — tap to cross off as you cook
- **Servings adjuster** — scales ingredient amounts automatically
- **Save favorites** — bookmarked recipes persist via localStorage
- **Mood history** — see your last 7 moods and what you browsed
- **Emotion detection** *(coming April 30)* — webcam auto-detects your mood via face-api.js

---

## Mood → Cuisine Mapping

| Mood | Cuisine Style | Max Cook Time | UI Theme |
|------|--------------|---------------|----------|
| 😤 Stressed | Comfort food, pasta, ramen, soup | 15 min | Warm earthy |
| 😄 Happy | Fusion, exotic, colorful bowls | 60 min | Bright yellow |
| 😢 Sad | Mac & cheese, stew, baked goods | 45 min | Soft purple |
| 😌 Calm | Salads, grain bowls, sushi | 30 min | Clean teal |
| 🧠 Focused | Salmon, nuts, avocado, brain food | 30 min | Minimal blue |
| 🎉 Excited | Tacos, pizza, sliders, party food | 45 min | Vibrant pink |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| State | Zustand |
| Data fetching | SWR |
| Animations | Framer Motion |
| Recipe API | Spoonacular |
| Emotion detection | face-api.js *(April 30)* |

---

## Project Structure

```
moodchef/
├── app/
│   ├── page.tsx                  # Mood picker landing page
│   ├── layout.tsx                # Root layout with theme injection
│   ├── globals.css
│   ├── recipe/
│   │   └── [id]/page.tsx         # Recipe detail dynamic route
│   ├── saved/
│   │   └── page.tsx              # Saved/bookmarked recipes
│   └── api/
│       └── recipes/
│           ├── search/route.ts   # Proxies Spoonacular search (server-side)
│           └── [id]/route.ts     # Proxies Spoonacular detail (server-side)
├── components/
│   ├── MoodPicker.tsx            # 6 mood card selector
│   ├── RecipeGrid.tsx            # Responsive recipe card grid
│   ├── RecipeCard.tsx            # Single recipe card with bookmark
│   ├── RecipeDetail.tsx          # Full recipe view
│   ├── IngredientList.tsx        # Tap-to-cross-off checklist
│   ├── MoodHistory.tsx           # Last 7 moods sidebar
│   ├── Navbar.tsx                # Top navigation bar
│   └── EmotionDetector.tsx       # face-api.js webcam (April 30)
├── hooks/
│   ├── useMood.ts                # Mood state and history
│   ├── useRecipes.ts             # SWR-based recipe fetching
│   └── useSaved.ts               # localStorage favorites CRUD
├── lib/
│   ├── moodMap.ts                # Mood → cuisine/tag/time/theme mapping
│   ├── themes.ts                 # CSS variables per mood
│   └── spoonacular.ts            # Spoonacular API wrapper functions
├── store/
│   └── moodStore.ts              # Zustand global store
├── types/
│   └── index.ts                  # Recipe, Mood, MoodEntry types
└── .env.local                    # API keys (never commit this)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Spoonacular API key](https://spoonacular.com/food-api)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/moodchef.git
cd moodchef

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Open `.env.local` and add your Spoonacular API key:

```env
SPOONACULAR_API_KEY=your_api_key_here
```

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SPOONACULAR_API_KEY` | Your Spoonacular API key | Yes |

> **Important:** Never expose your API key client-side. All Spoonacular calls are proxied through Next.js API route handlers (`/app/api/`). The key is only read server-side via `process.env.SPOONACULAR_API_KEY`.

---

## API Usage

MoodChef uses two Spoonacular endpoints:

```
GET /recipes/complexSearch     → Search recipes by mood tags and max time
GET /recipes/{id}/information  → Fetch full recipe detail
```

The free Spoonacular tier provides **150 API points/day**. Each search costs ~1 point and each detail fetch costs ~1 point — sufficient for development and demo use.

---

## Roadmap

- [x] Mood picker UI with 6 emotion states
- [x] Dynamic theming system per mood
- [x] Spoonacular API integration (server-side)
- [x] Recipe grid with loading skeletons
- [x] Recipe detail page with ingredient checklist
- [x] Servings adjuster
- [x] Save/bookmark recipes (localStorage)
- [x] Mood history sidebar
- [ ] **Emotion detection via webcam** *(face-api.js — April 30)*
- [ ] Offline support / PWA
- [ ] Share recipe feature
- [ ] Dietary filter (vegetarian, gluten-free, etc.)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Spoonacular](https://spoonacular.com/food-api) — recipe data API
- [face-api.js](https://github.com/justadudewhohacks/face-api.js) — browser-based face detection
- [Framer Motion](https://www.framer.com/motion/) — animation library
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
