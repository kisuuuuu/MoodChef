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

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function scoreRecipe(recipe: Recipe, moodTerms: string[], maxReadyTime: number): number {
  const title = normalizeText(recipe.title ?? "");
  const summary = normalizeText(recipe.summary ?? "");

  let score = 0;

  for (const term of moodTerms) {
    const normalized = normalizeText(term);
    if (title.includes(normalized)) score += 6;
    if (summary.includes(normalized)) score += 3;
  }

  const readyIn = recipe.readyInMinutes ?? maxReadyTime;
  if (readyIn <= maxReadyTime) {
    score += 3;
  } else if (readyIn <= maxReadyTime + 15) {
    score += 1;
  }

  if (recipe.image) score += 1;
  if ((recipe.servings ?? 0) > 0) score += 1;

  return score;
}

async function fetchComplexSearch(params: Record<string, string>): Promise<Recipe[]> {
  const url = new URL(`${BASE_URL}/recipes/complexSearch`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Spoonacular search failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results ?? [];
}

export async function searchRecipes(mood: Mood): Promise<Recipe[]> {
  const moodConfig = moodMap[mood];
  const apiKey = getApiKey();
  const moodTerms = moodConfig.tags
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);
  const primaryTerms = moodTerms.length ? moodTerms.slice(0, 4) : [mood];

  const searchRequests = primaryTerms.map((term, idx) =>
    fetchComplexSearch({
      query: term,
      maxReadyTime: String(moodConfig.maxTime + (idx > 1 ? 10 : 0)),
      number: "8",
      addRecipeInformation: "true",
      fillIngredients: "true",
      sort: idx === 0 ? "popularity" : "meta-score",
      apiKey
    })
  );

  const searchResults = await Promise.all(searchRequests);
  let combined = searchResults.flat();

  // Fallback: relax constraints if initial mood queries returned too few suggestions.
  if (combined.length < 10) {
    const fallback = await fetchComplexSearch({
      query: mood,
      number: "14",
      addRecipeInformation: "true",
      fillIngredients: "true",
      sort: "popularity",
      apiKey
    });
    combined = [...combined, ...fallback];
  }

  const deduped = Array.from(new Map(combined.map((recipe) => [recipe.id, recipe])).values());

  return deduped
    .map((recipe) => ({
      recipe,
      score: scoreRecipe(recipe, primaryTerms, moodConfig.maxTime)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((entry) => entry.recipe);
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
