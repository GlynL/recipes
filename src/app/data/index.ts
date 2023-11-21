import { sql } from "@vercel/postgres";
import {
  IngredientSchemaArray,
  RecipeSchema,
  RecipeSchemaArray,
  StepSchemaArray,
} from "../models";
import { unstable_noStore } from "next/cache";

export async function getRecipes() {
  // unstable_noStore() -- using revalidatePath() when changing recipes for now
  unstable_noStore();
  const { rows } = await sql`SELECT * from RECIPES;`;
  const recipes = RecipeSchemaArray.parse(rows);
  return recipes;
}

export async function getRecipe(id: string) {
  const { rows } = await sql`SELECT * FROM recipes WHERE id = ${id};`;
  const recipe = RecipeSchema.parse(rows[0]);
  return recipe;
}

export async function getIngredients(recipeId: string) {
  const { rows } =
    await sql`SELECT * FROM ingredients WHERE recipe_id = ${recipeId};`;
  const ingredients = IngredientSchemaArray.parse(rows);
  return ingredients;
}

export async function getMethod(recipeId: string) {
  const { rows } =
    await sql`SELECT * FROM steps WHERE recipe_id = ${recipeId};`;
  const method = StepSchemaArray.parse(rows);
  return method;
}
