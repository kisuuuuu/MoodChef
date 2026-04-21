export type Mood = "stressed" | "happy" | "sad" | "calm" | "focused" | "excited";

export type ThemeName = "warm" | "bright" | "soft" | "clean" | "minimal" | "vibrant";

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  analyzedInstructions?: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  extendedIngredients?: Array<{
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
  }>;
};

export type MoodEntry = {
  mood: Mood;
  timestamp: string;
  recipes: Recipe[];
};

export type MoodMapEntry = {
  tags: string;
  maxTime: number;
  theme: ThemeName;
};
