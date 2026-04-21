"use client";

import Link from "next/link";
import { useMood } from "@/hooks/useMood";
import { useSaved } from "@/hooks/useSaved";

const moodEmoji: Record<string, string> = {
  stressed: "😰",
  happy: "😊",
  sad: "😔",
  calm: "😌",
  focused: "🎯",
  excited: "🤩"
};

export default function Navbar() {
  const { currentMood, resetMood } = useMood();
  const { savedRecipes } = useSaved();

  return (
    <nav className="theme-header sticky top-0 z-20 border-b border-black/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M7.5 18.5H16.5C17.8807 18.5 19 17.3807 19 16V11.9C19.8973 11.4348 20.5 10.4987 20.5 9.42105C20.5 7.87941 19.2206 6.63158 17.6667 6.63158C17.4538 6.63158 17.2464 6.65498 17.0469 6.69939C16.3907 5.11069 14.819 4 13 4C11.3985 4 9.97652 4.86012 9.21456 6.16202C8.98698 6.11787 8.752 6.09474 8.51111 6.09474C6.57142 6.09474 5 7.65377 5 9.57895C5 10.5264 5.38268 11.3847 6 11.9995V16C6 17.3807 7.11929 18.5 8.5 18.5H7.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>MoodChef</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/saved"
            className="theme-pill rounded-full border px-5 py-2 font-semibold opacity-95 transition-opacity hover:opacity-100"
          >
            ♡ Favorites ({savedRecipes.length})
          </Link>
          {currentMood && (
            <button
              type="button"
              className="theme-pill rounded-full border px-5 py-2 font-semibold capitalize"
            >
              {moodEmoji[currentMood]} {currentMood}
            </button>
          )}
          {currentMood && (
            <button
              type="button"
              onClick={resetMood}
              className="theme-pill rounded-full border px-5 py-2 font-semibold opacity-95 transition-opacity hover:opacity-100"
            >
              Reset Mood
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
