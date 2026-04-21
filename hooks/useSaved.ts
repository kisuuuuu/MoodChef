"use client";

import { useEffect, useMemo, useState } from "react";
import { useSavedStore } from "@/store/savedStore";

export function useSaved() {
  const savedRecipes = useSavedStore((state) => state.savedRecipes);
  const toggleSaved = useSavedStore((state) => state.toggleSaved);
  const clearSaved = useSavedStore((state) => state.clearSaved);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const savedIds = useMemo(() => new Set(savedRecipes.map((recipe) => recipe.id)), [savedRecipes]);

  return {
    savedRecipes,
    savedIds,
    isReady,
    toggleSaved,
    clearSaved
  };
}
