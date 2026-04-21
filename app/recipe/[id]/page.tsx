"use client";

import useSWR from "swr";
import Navbar from "@/components/Navbar";
import RecipeDetail from "@/components/RecipeDetail";
import { Recipe } from "@/types";

type Props = {
  params: {
    id: string;
  };
};

const fetcher = async (url: string): Promise<{ recipe: Recipe }> => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Failed to fetch recipe details.");
  }
  return data;
};

export default function RecipeDetailPage({ params }: Props) {
  const { data, isLoading, error, mutate } = useSWR(`/api/recipes/${params.id}`, fetcher);

  return (
    <main className="min-h-screen pb-12">
      <Navbar />
      {isLoading && <div className="mx-auto mt-8 h-96 max-w-4xl animate-pulse rounded-2xl border card-surface" />}
      {error && (
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border card-surface p-6">
          <h2 className="text-xl font-semibold">Failed to load recipe details.</h2>
          <button type="button" onClick={() => mutate()} className="mt-3 rounded-md border px-3 py-2">
            Retry
          </button>
        </div>
      )}
      {data?.recipe && <RecipeDetail recipe={data.recipe} />}
    </main>
  );
}
