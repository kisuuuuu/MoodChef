"use client";

import { useState } from "react";
import { useMood } from "@/hooks/useMood";

export default function MoodHistory() {
  const { moodHistory, applyHistoryMood } = useMood();
  const [open, setOpen] = useState(false);

  if (!moodHistory.length) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-30 w-80 max-w-[calc(100vw-2rem)]">
      <div className="card-surface rounded-2xl border shadow-lg">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-semibold">Mood History</span>
          <span>{open ? "Hide" : "Show"}</span>
        </button>

        {open && (
          <div className="space-y-2 border-t p-4">
            {moodHistory.map((entry) => (
              <button
                key={entry.timestamp}
                type="button"
                onClick={() => applyHistoryMood(entry)}
                className="flex w-full items-center justify-between rounded-full border px-3 py-2 text-sm capitalize hover:bg-black/5"
              >
                <span>{entry.mood}</span>
                <span className="text-xs opacity-70">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
