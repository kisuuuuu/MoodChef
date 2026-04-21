"use client";

import { useMemo, useState } from "react";
import { Recipe } from "@/types";

type Props = {
  ingredients: NonNullable<Recipe["extendedIngredients"]>;
  servings: number;
  originalServings: number;
};

export default function IngredientList({ ingredients, servings, originalServings }: Props) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const scale = useMemo(() => servings / Math.max(originalServings, 1), [servings, originalServings]);

  return (
    <ul className="space-y-2">
      {ingredients.map((ingredient) => {
        const isChecked = checked[ingredient.id];
        const scaledAmount = Number((ingredient.amount * scale).toFixed(2));

        return (
          <li key={ingredient.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={Boolean(isChecked)}
              onChange={() => setChecked((prev) => ({ ...prev, [ingredient.id]: !prev[ingredient.id] }))}
            />
            <span className={isChecked ? "line-through opacity-50" : ""}>
              {scaledAmount} {ingredient.unit} {ingredient.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
