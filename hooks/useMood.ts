"use client";

import { useEffect } from "react";
import { moodMap } from "@/lib/moodMap";
import { applyDefaultTheme, applyTheme } from "@/lib/themes";
import { useMoodStore } from "@/store/moodStore";

export function useMood() {
  const currentMood = useMoodStore((state) => state.currentMood);
  const moodHistory = useMoodStore((state) => state.moodHistory);
  const setMood = useMoodStore((state) => state.setMood);
  const setLatestMoodRecipes = useMoodStore((state) => state.setRecipesForLatestMood);
  const applyHistoryMood = useMoodStore((state) => state.applyHistoryMood);
  const resetMood = useMoodStore((state) => state.resetMood);

  useEffect(() => {
    if (!currentMood) {
      applyDefaultTheme();
      return;
    }
    applyTheme(moodMap[currentMood].theme);
  }, [currentMood]);

  return {
    currentMood,
    moodHistory,
    setMood,
    setLatestMoodRecipes,
    applyHistoryMood,
    resetMood
  };
}
