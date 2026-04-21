"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { Mood, Recipe } from "@/types";
import { useMood } from "@/hooks/useMood";

const fetcher = async (url: string): Promise<{ recipes: Recipe[] }> => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Failed to fetch recipes.");
  }
  return data;
};

export function useRecipes(mood: Mood | null) {
  const { setLatestMoodRecipes } = useMood();

  const swr = useSWR(mood ? `/api/recipes/search?mood=${mood}` : null, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true
  });

  useEffect(() => {
    if (swr.data?.recipes?.length) {
      setLatestMoodRecipes(swr.data.recipes);
    }
  }, [swr.data, setLatestMoodRecipes]);

  return {
    recipes: swr.data?.recipes ?? [],
    isLoading: swr.isLoading,
    error: swr.error,
    mutate: swr.mutate
  };
}
