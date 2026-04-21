import { Mood, MoodMapEntry } from "@/types";

export const moodMap: Record<Mood, MoodMapEntry> = {
  stressed: { tags: "pasta,comfort food,soup,ramen", maxTime: 15, theme: "warm" },
  happy: { tags: "fusion,exotic,colorful,bowls", maxTime: 60, theme: "bright" },
  sad: { tags: "mac and cheese,stew,baked,comfort food", maxTime: 45, theme: "soft" },
  calm: { tags: "salad,healthy,light,sushi", maxTime: 30, theme: "clean" },
  focused: { tags: "salmon,nuts,avocado,brain food", maxTime: 30, theme: "minimal" },
  excited: { tags: "tacos,pizza,sliders,party food", maxTime: 45, theme: "vibrant" }
};
