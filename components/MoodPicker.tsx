"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMood } from "@/hooks/useMood";
import { Mood } from "@/types";

const moods: Array<{ mood: Mood; icon: string; tagline: string }> = [
  { mood: "stressed", icon: "😮‍💨", tagline: "Quick & comforting" },
  { mood: "happy", icon: "😄", tagline: "Try something new" },
  { mood: "sad", icon: "🥹", tagline: "Warm your soul" },
  { mood: "calm", icon: "😌", tagline: "Fresh and balanced" },
  { mood: "focused", icon: "🧠", tagline: "Fuel your brain" },
  { mood: "excited", icon: "🤩", tagline: "Fun party bites" }
];

export default function MoodPicker() {
  const { setMood } = useMood();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    router.push("/");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-center text-4xl font-bold">How are you feeling?</h1>
      <p className="mb-8 text-center text-sm opacity-80">Pick a mood and MoodChef will match your cravings.</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {moods.map((item) => (
          <motion.button
            key={item.mood}
            whileHover={{ scale: 1.03 }}
            type="button"
            onClick={() => handleSelect(item.mood)}
            className="card-surface rounded-2xl border p-5 text-left shadow-sm"
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="mt-3 text-lg font-semibold capitalize">{item.mood}</div>
            <div className="text-sm opacity-75">{item.tagline}</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
