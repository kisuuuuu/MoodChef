"use client";

import { useMood } from "@/hooks/useMood";
import { Mood } from "@/types";

const moodCardStyles: Record<Mood, string> = {
  stressed: "border-[#f0cf5b] bg-[#fff8ea] text-[#5e4306]",
  happy: "border-[#e7d35f] bg-[#fffceb] text-[#6b570e]",
  sad: "border-[#a9a0f4] bg-[#f2f0ff] text-[#3f3784]",
  calm: "border-[#83deca] bg-[#f0fcf8] text-[#1d5e51]",
  focused: "border-[#58d6c0] bg-[#ecfbf6] text-[#175f52]",
  excited: "border-[#edc36f] bg-[#fff7eb] text-[#704818]"
};

const moodIcons: Record<Mood, string> = {
  stressed: "😰",
  happy: "😊",
  sad: "😔",
  calm: "😌",
  focused: "🎯",
  excited: "🤩"
};

export default function MoodHistory() {
  const { moodHistory, applyHistoryMood } = useMood();

  if (!moodHistory.length) return null;

  return (
    <aside className="mx-auto mt-12 w-full max-w-6xl px-4 pb-10">
      <div className="flex items-center gap-3">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0 text-slate-500"
        >
          <path
            d="M8 3V6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3V6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="4"
            y="5"
            width="16"
            height="16"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 9.5H20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-[#1d1a3f]">Your Mood History</h2>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {moodHistory.map((entry) => (
          <button
            key={entry.timestamp}
            type="button"
            onClick={() => applyHistoryMood(entry)}
            className={`w-[98px] rounded-3xl border-2 px-3 py-4 text-center transition-all hover:-translate-y-0.5 ${moodCardStyles[entry.mood]}`}
          >
            <div className="text-4xl">{moodIcons[entry.mood]}</div>
            <div className="mt-2 text-lg font-semibold capitalize leading-none">{entry.mood}</div>
            <div className="mt-2 text-xs font-medium opacity-70">Today</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
