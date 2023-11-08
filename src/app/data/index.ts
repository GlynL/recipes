import { sql } from "@vercel/postgres";
import { IngredientSchemaArray, RecipeSchema, RecipeSchemaArray } from "../models";

export async function getRecipes() {
    // unstable_noStore() -- using revalidatePath() when changing recipes for now
    // unstable_noStore()
    const { rows } = await sql`SELECT * from RECIPES;`;
    const recipes = RecipeSchemaArray.parse(rows)
    return recipes
}

export async function getRecipe(id: string) {
    const { rows } = await sql`SELECT * FROM recipes WHERE id = ${id};`
    const recipe = RecipeSchema.parse(rows[0])
    return recipe;
}

export async function getIngredients(recipeId: string) {
    const { rows } = await sql`SELECT * FROM ingredients WHERE recipe_id = ${recipeId};`
    console.log('rooowssssss')
    console.log(rows)
    const ingredients = IngredientSchemaArray.parse(rows)
    return ingredients;

}
