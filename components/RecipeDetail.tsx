"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import IngredientList from "@/components/IngredientList";
import { Recipe } from "@/types";

type Props = {
  recipe: Recipe;
};

export default function RecipeDetail({ recipe }: Props) {
  const router = useRouter();
  const [servings, setServings] = useState(recipe.servings || 1);

  const steps = useMemo(
    () => recipe.analyzedInstructions?.[0]?.steps ?? [],
    [recipe.analyzedInstructions]
  );

  return (
    <article className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <button type="button" onClick={() => router.back()} className="rounded-md border px-3 py-2 text-sm hover:bg-black/5">
        Back
      </button>

      <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={1200}
          height={680}
          className="h-72 w-full rounded-2xl object-cover"
        />
      </motion.div>

      <div className="card-surface rounded-2xl border p-5">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <p className="mt-1 text-sm opacity-80">
          Ready in {recipe.readyInMinutes} mins • Base servings: {recipe.servings}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm">Adjust servings</span>
          <button
            type="button"
            onClick={() => setServings((prev) => Math.max(1, prev - 1))}
            className="rounded border px-3 py-1"
          >
            -
          </button>
          <span className="min-w-8 text-center">{servings}</span>
          <button type="button" onClick={() => setServings((prev) => prev + 1)} className="rounded border px-3 py-1">
            +
          </button>
        </div>
      </div>

      {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
        <section className="card-surface rounded-2xl border p-5">
          <h2 className="mb-3 text-xl font-semibold">Ingredients</h2>
          <IngredientList
            ingredients={recipe.extendedIngredients}
            servings={servings}
            originalServings={recipe.servings || 1}
          />
        </section>
      )}

      <section className="card-surface rounded-2xl border p-5">
        <h2 className="mb-3 text-xl font-semibold">Instructions</h2>
        <ol className="list-inside list-decimal space-y-2">
          {steps.length ? (
            steps.map((step) => <li key={step.number}>{step.step}</li>)
          ) : (
            <li>Instructions unavailable for this recipe.</li>
          )}
        </ol>
      </section>
    </article>
  );
}
