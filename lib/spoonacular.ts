import { moodMap } from "@/lib/moodMap";
import { Mood, Recipe } from "@/types";

const BASE_URL = "https://api.spoonacular.com";

function getApiKey(): string {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error("Missing SPOONACULAR_API_KEY.");
  }
  return apiKey;
}

export async function searchRecipes(mood: Mood): Promise<Recipe[]> {
  const moodConfig = moodMap[mood];
  const apiKey = getApiKey();
  const moodTerms = moodConfig.tags
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);
  const primaryQuery = moodTerms[0] ?? mood;

  const url = new URL(`${BASE_URL}/recipes/complexSearch`);
  url.searchParams.set("query", primaryQuery);
  url.searchParams.set("maxReadyTime", String(moodConfig.maxTime));
  url.searchParams.set("number", "12");
  url.searchParams.set("addRecipeInformation", "true");
  url.searchParams.set("sort", "random");
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Spoonacular search failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results ?? [];
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const apiKey = getApiKey();
  const url = new URL(`${BASE_URL}/recipes/${id}/information`);
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Spoonacular recipe details failed: ${response.status}`);
  }

  return response.json();
}
