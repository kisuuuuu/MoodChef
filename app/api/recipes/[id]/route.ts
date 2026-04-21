import { getRecipeById } from "@/lib/spoonacular";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  try {
    const recipe = await getRecipeById(params.id);
    return NextResponse.json({ recipe });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Recipe detail fetch failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
