import { searchRecipes } from "@/lib/spoonacular";
import { Mood } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const validMoods: Mood[] = ["stressed", "happy", "sad", "calm", "focused", "excited"];

export async function GET(request: NextRequest) {
  try {
    const mood = request.nextUrl.searchParams.get("mood") as Mood | null;

    if (!mood || !validMoods.includes(mood)) {
      return NextResponse.json({ error: "Invalid mood." }, { status: 400 });
    }

    const recipes = await searchRecipes(mood);
    return NextResponse.json({ recipes });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Recipe search failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
