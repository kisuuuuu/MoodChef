"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Recipe } from "@/types";

type Props = {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
  delay: number;
};

export default function RecipeCard({ recipe, isSaved, onToggleSave, delay }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="card-surface overflow-hidden rounded-2xl border shadow-sm"
    >
      <Link href={`/recipe/${recipe.id}`} className="block">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={600}
          height={360}
          className="h-48 w-full object-cover"
        />
      </Link>
      <div className="space-y-2 p-4">
        <Link href={`/recipe/${recipe.id}`} className="line-clamp-2 text-lg font-semibold hover:underline">
          {recipe.title}
        </Link>
        <div className="text-sm opacity-80">
          Ready in {recipe.readyInMinutes} mins • Serves {recipe.servings}
        </div>
        <button
          type="button"
          onClick={() => onToggleSave(recipe)}
          className="rounded-md border px-3 py-2 text-sm hover:bg-black/5"
        >
          {isSaved ? "Remove Bookmark" : "Save Recipe"}
        </button>
      </div>
    </motion.div>
  );
}
