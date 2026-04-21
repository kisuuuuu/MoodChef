"use client";

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { useSaved } from "@/hooks/useSaved";

export default function SavedPage() {
  const { savedRecipes, savedIds, toggleSaved, isReady, clearSaved } = useSaved();

  return (
    <main className="min-h-screen pb-10">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Saved Recipes</h1>
          {savedRecipes.length > 0 && (
            <button type="button" onClick={clearSaved} className="rounded-md border px-3 py-2 text-sm">
              Clear All
            </button>
          )}
        </div>

        {!isReady ? (
          <div className="h-40 animate-pulse rounded-2xl border card-surface" />
        ) : savedRecipes.length === 0 ? (
          <div className="rounded-2xl border card-surface p-8 text-center">No saved recipes yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedRecipes.map((recipe, idx) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedIds.has(recipe.id)}
                onToggleSave={toggleSaved}
                delay={idx * 0.05}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
