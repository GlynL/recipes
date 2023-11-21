import { Ingredient, Recipe, Step } from "@/app/models";
import { sql } from "@vercel/postgres";
import { test as setup } from "@playwright/test";

setup("seed db", async ({ page }) => {
  const recipeData: Recipe = {
    id: "0b10aa7f-acc0-4aa8-82cc-ef9f13eb2483",
    title: "holy grail",
  };
  const ingredientsData: Ingredient[] = [
    {
      id: crypto.randomUUID(),
      recipe_id: recipeData.id,
      value: "holy",
    },
    {
      id: crypto.randomUUID(),
      recipe_id: recipeData.id,
      value: "grail",
    },
  ];
  const methodData: Step[] = [
    {
      id: crypto.randomUUID(),
      recipe_id: recipeData.id,
      value: "mix holy and grail",
    },
  ];
  await sql`
      INSERT INTO recipes (id, title)
      VALUES (${recipeData.id}, ${recipeData.title});
  `;
  await Promise.all(
    ingredientsData.map(async (ingredientData) => {
      await sql`
      INSERT INTO ingredients (id, recipe_id, value)
      VALUES (${ingredientData.id}, ${ingredientData.recipe_id}, ${ingredientData.value});
    `;
    }),
  );
  await Promise.all(
    methodData.map(async (step) => {
      await sql`
        INSERT INTO steps (id, recipe_id, value)
        VALUES (${step.id}, ${step.recipe_id}, ${step.value});
      `;
    }),
  );
});
