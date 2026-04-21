"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMood } from "@/hooks/useMood";
import { Mood } from "@/types";

const moods: Array<{ mood: Mood; icon: string; tagline: string }> = [
  { mood: "stressed", icon: "😰", tagline: "Quick comfort food to ease your mind" },
  { mood: "happy", icon: "😊", tagline: "Adventurous dishes to match your energy" },
  { mood: "sad", icon: "😔", tagline: "Warm, hearty meals to lift your spirits" },
  { mood: "calm", icon: "😌", tagline: "Light, refreshing recipes for peace" },
  { mood: "focused", icon: "🎯", tagline: "Nutritious meals to fuel your mind" },
  { mood: "excited", icon: "🤩", tagline: "Bold, exciting flavors for your mood" }
];

const moodCardClasses: Record<Mood, string> = {
  stressed: "border-[#f29b72] bg-[#fff2ec] text-[#7a2e11]",
  happy: "border-[#f0d35f] bg-[#fffbea] text-[#6d5308]",
  sad: "border-[#9f93f4] bg-[#f1efff] text-[#39307f]",
  calm: "border-[#66d1b7] bg-[#ecfcf7] text-[#165848]",
  focused: "border-[#6aa8e8] bg-[#edf5ff] text-[#174576]",
  excited: "border-[#ef8abc] bg-[#fff0f7] text-[#7a1c49]"
};

export default function MoodPicker() {
  const { setMood } = useMood();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    router.push("/");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-3 text-center text-4xl font-semibold">How are you feeling today?</h1>
      <p className="mb-10 text-center text-base text-slate-500">Choose your mood and we'll recommend the perfect recipes</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {moods.map((item) => (
          <motion.button
            key={item.mood}
            whileHover={{ scale: 1.03 }}
            type="button"
            onClick={() => handleSelect(item.mood)}
            className={`rounded-2xl border-2 p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${moodCardClasses[item.mood]}`}
          >
            <div className="text-5xl">{item.icon}</div>
            <div className="mt-4 text-3xl font-semibold capitalize">{item.mood}</div>
            <div className="mx-auto mt-3 max-w-[16rem] text-sm leading-6 opacity-80">{item.tagline}</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
