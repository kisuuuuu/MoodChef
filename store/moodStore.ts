import { create } from "zustand";
import { Mood, MoodEntry, Recipe } from "@/types";

type MoodState = {
  currentMood: Mood | null;
  moodHistory: MoodEntry[];
  setMood: (mood: Mood) => void;
  setRecipesForLatestMood: (recipes: Recipe[]) => void;
  applyHistoryMood: (entry: MoodEntry) => void;
  resetMood: () => void;
};

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  moodHistory: [],
  setMood: (mood) =>
    set((state) => {
      const newEntry: MoodEntry = {
        mood,
        timestamp: new Date().toISOString(),
        recipes: []
      };

      return {
        currentMood: mood,
        moodHistory: [newEntry, ...state.moodHistory].slice(0, 7)
      };
    }),
  setRecipesForLatestMood: (recipes) =>
    set((state) => {
      if (state.moodHistory.length === 0) return state;
      const [latest, ...rest] = state.moodHistory;
      return {
        moodHistory: [{ ...latest, recipes }, ...rest]
      };
    }),
  applyHistoryMood: (entry) =>
    set((state) => ({
      currentMood: entry.mood,
      moodHistory: [entry, ...state.moodHistory.filter((item) => item.timestamp !== entry.timestamp)].slice(0, 7)
    })),
  resetMood: () => set({ currentMood: null })
}));
