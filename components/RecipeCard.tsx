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
      className="card-surface relative overflow-hidden rounded-3xl border border-black/10 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onToggleSave(recipe)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-xl leading-none shadow"
        aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
      >
        {isSaved ? "♥" : "♡"}
      </button>
      <Link href={`/recipe/${recipe.id}`} className="block">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={600}
          height={360}
          className="h-52 w-full object-cover"
        />
      </Link>
      <div className="space-y-3 p-5">
        <Link href={`/recipe/${recipe.id}`} className="line-clamp-2 text-3xl font-semibold text-[#2f2d67] hover:underline">
          {recipe.title}
        </Link>
        <div className="flex gap-4 text-sm font-medium text-[#7c79bd]">
          <span>◷ {recipe.readyInMinutes} min</span>
          <span>👥 {recipe.servings} servings</span>
        </div>
        <p className="line-clamp-2 text-base text-[#6c6a8f]">
          {recipe.summary ? recipe.summary.replace(/<[^>]*>/g, "") : "Delicious comfort food made with love"}
        </p>
      </div>
    </motion.div>
  );
}
