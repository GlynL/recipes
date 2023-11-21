"use server";
import { db, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  IngredientSchemaArray,
  RecipeSchema,
  StepSchemaArray,
} from "../models";

export async function createRecipe(
  recipeId: string,
  prevState: any,
  formData: FormData,
) {
  const recipeData = {
    id: recipeId,
    title: formData.get("title") as string,
  };
  const { id, title } = RecipeSchema.parse(recipeData);

  const ingredientsData = formData.getAll("ingredient").map((ingredient) => ({
    id: crypto.randomUUID(),
    recipe_id: recipeId,
    value: ingredient,
  }));

  const ingredients = IngredientSchemaArray.parse(ingredientsData);

  const methodData = formData.getAll("step").map((step) => ({
    id: crypto.randomUUID(),
    recipe_id: recipeId,
    value: step,
  }));

  const method = StepSchemaArray.parse(methodData);
  const client = await db.connect();
  try {
    await client.sql`
            INSERT INTO recipes (id, title)
            VALUES (${id}, ${title});
        `;
    for (const ingredient of ingredients) {
      await client.sql`
              INSERT INTO ingredients (id, recipe_id, value)
              VALUES (${ingredient.id}, ${ingredient.recipe_id}, ${ingredient.value});
          `;
    }
    for (const step of method) {
      await client.sql`
              INSERT INTO steps (id, recipe_id, value)
              VALUES (${step.id}, ${step.recipe_id}, ${step.value});
          `;
    }
    await client.end();
  } catch (err) {
    await client.end();
    return { message: "Database Error" };
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateRecipe(
  recipeId: string,
  prevState: any,
  formData: FormData,
) {
  const recipeData = {
    id: recipeId,
    title: formData.get("title") as string,
  };
  const { id, title } = RecipeSchema.parse(recipeData);

  const ingredientsData = formData.getAll("ingredient").map((ingredient) => ({
    id: crypto.randomUUID(),
    recipe_id: recipeId,
    value: ingredient,
  }));

  const ingredients = IngredientSchemaArray.parse(ingredientsData);

  const methodData = formData.getAll("step").map((step) => ({
    id: crypto.randomUUID(),
    recipe_id: recipeId,
    value: step,
  }));

  const method = StepSchemaArray.parse(methodData);
  const client = await db.connect();
  try {
    await client.sql`
          DELETE FROM recipes WHERE id = ${recipeId};
      `;

    await client.sql`
            INSERT INTO recipes (id, title)
            VALUES (${id}, ${title});
        `;
    for (const ingredient of ingredients) {
      await client.sql`
              INSERT INTO ingredients (id, recipe_id, value)
              VALUES (${ingredient.id}, ${ingredient.recipe_id}, ${ingredient.value});
          `;
    }
    for (const step of method) {
      await client.sql`
              INSERT INTO steps (id, recipe_id, value)
              VALUES (${step.id}, ${step.recipe_id}, ${step.value});
          `;
    }
    await client.end();
  } catch (err) {
    await client.end();
    console.error(err);
    return { message: "Database Error" };
  }
  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${recipeId}`);
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id};`;
  } catch (err) {
    return { message: "Database Error" };
  }
  revalidatePath("/");
}
