"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Recipe } from "@/types";

const STORAGE_KEY = "moodchef_saved_recipes";

type SavedState = {
  savedRecipes: Recipe[];
  toggleSaved: (recipe: Recipe) => void;
  clearSaved: () => void;
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedRecipes: [],
      toggleSaved: (recipe) => {
        const { savedRecipes } = get();
        const exists = savedRecipes.some((item) => item.id === recipe.id);

        if (exists) {
          set({ savedRecipes: savedRecipes.filter((item) => item.id !== recipe.id) });
          return;
        }

        set({ savedRecipes: [recipe, ...savedRecipes] });
      },
      clearSaved: () => set({ savedRecipes: [] })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
