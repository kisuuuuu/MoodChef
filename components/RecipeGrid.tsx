"use client";

import { useSaved } from "@/hooks/useSaved";
import { Recipe } from "@/types";
import RecipeCard from "@/components/RecipeCard";

type Props = {
  recipes: Recipe[];
  isLoading: boolean;
};

function SkeletonCard() {
  return <div className="h-80 animate-pulse rounded-3xl border border-black/10 card-surface" />;
}

export default function RecipeGrid({ recipes, isLoading }: Props) {
  const { savedIds, toggleSaved } = useSaved();

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="card-surface rounded-2xl border p-8 text-center">
        <h2 className="text-xl font-semibold">No recipes found</h2>
        <p className="mt-2 text-sm opacity-80">Try a different mood to discover more dishes.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
      {recipes.map((recipe, idx) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSaved={savedIds.has(recipe.id)}
          onToggleSave={toggleSaved}
          delay={idx * 0.05}
        />
      ))}
    </div>
  );
}
