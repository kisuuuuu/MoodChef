"use client";

import MoodPicker from "@/components/MoodPicker";
import MoodHistory from "@/components/MoodHistory";
import Navbar from "@/components/Navbar";
import RecipeGrid from "@/components/RecipeGrid";
import { useMood } from "@/hooks/useMood";
import { useRecipes } from "@/hooks/useRecipes";

export default function HomePage() {
  const { currentMood } = useMood();
  const { recipes, isLoading, error, mutate } = useRecipes(currentMood);

  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      {!currentMood ? (
        <MoodPicker />
      ) : (
        <section className="mx-auto max-w-6xl space-y-6 px-4 py-8">
          <header>
            <h1 className="text-3xl font-bold capitalize">{currentMood} recipes</h1>
            <p className="mt-1 text-sm opacity-80">Mood-aware dishes curated from Spoonacular.</p>
          </header>

          {error ? (
            <div className="card-surface rounded-2xl border p-8">
              <h2 className="text-xl font-semibold">We could not fetch recipes right now.</h2>
              <p className="mt-2 text-sm opacity-80">Please retry in a moment.</p>
              <button type="button" onClick={() => mutate()} className="mt-4 rounded-md border px-3 py-2">
                Retry
              </button>
            </div>
          ) : (
            <RecipeGrid recipes={recipes} isLoading={isLoading} />
          )}
        </section>
      )}
      <MoodHistory />
    </main>
  );
}
