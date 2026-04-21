"use client";

import { useEffect, useMemo, useState } from "react";
import { Recipe } from "@/types";

const STORAGE_KEY = "moodchef_saved_recipes";

export function useSaved() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedRecipes(JSON.parse(raw) as Recipe[]);
      }
    } catch {
      setSavedRecipes([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  const save = (recipes: Recipe[]) => {
    setSavedRecipes(recipes);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  };

  const toggleSaved = (recipe: Recipe) => {
    const exists = savedRecipes.some((item) => item.id === recipe.id);
    if (exists) {
      save(savedRecipes.filter((item) => item.id !== recipe.id));
      return;
    }
    save([recipe, ...savedRecipes]);
  };

  const clearSaved = () => save([]);

  const savedIds = useMemo(() => new Set(savedRecipes.map((recipe) => recipe.id)), [savedRecipes]);

  return {
    savedRecipes,
    savedIds,
    isReady,
    toggleSaved,
    clearSaved
  };
}
