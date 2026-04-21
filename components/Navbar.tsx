"use client";

import Link from "next/link";
import { useMood } from "@/hooks/useMood";

export default function Navbar() {
  const { currentMood, resetMood } = useMood();

  return (
    <nav className="sticky top-0 z-20 border-b bg-white/65 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MoodChef
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/saved" className="rounded-md px-3 py-2 hover:bg-black/5">
            Saved Recipes
          </Link>
          {currentMood && (
            <button
              type="button"
              onClick={resetMood}
              className="rounded-md border px-3 py-2 hover:bg-black/5"
            >
              Reset Mood
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
