import { Ingredient, Recipe, Step } from "@/app/models";

const { db } = require("@vercel/postgres");

const recipes: Recipe[] = [
  {
    id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    title: "Meat pie",
  },
  {
    id: "e3e4471b-12f9-43e8-9b8c-18b252fa237b",
    title: "Roast Beef",
  },
  {
    id: "e3e4471b-12f9-43e8-9b8c-18b252fa237c",
    title: "Stir-fried Broccoli",
  },
];

async function seedRecipes(client: any) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS recipes CASCADE;`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    console.log(`Created "recipes" table`);

    const insertedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        return client.sql`
        INSERT INTO recipes (id, title)
        VALUES (${recipe.id}, ${recipe.title})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedRecipes.length} recipes`);

    return {
      createTable,
      recipes: insertedRecipes,
    };
  } catch (error) {
    console.error("Error seeding recipes:", error);
    throw error;
  }
}

const ingredients: Ingredient[] = [
  {
    id: "5a6836ac-a2ad-4b71-a51c-c47d1ea1f93a",
    recipe_id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    value: "meat",
  },
  {
    id: "5a6836ac-a2ad-4b71-a51c-c47d1ea1f93b",
    recipe_id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    value: "pastry",
  },
];

async function seedIngredients(client: any) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS ingredients;`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ingredients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recipe_id UUID NOT NULL, 
        value VARCHAR(255) NOT NULL,
        CONSTRAINT fk_recipe
        FOREIGN KEY(recipe_id) 
          REFERENCES recipes(id)
          ON DELETE CASCADE
      );
    `;

    console.log(`Created "ingredients" table`);

    const insertedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        return client.sql`
        INSERT INTO ingredients (id, recipe_id, value)
        VALUES (${ingredient.id}, ${ingredient.recipe_id}, ${ingredient.value})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedIngredients.length} recipes`);

    return {
      createTable,
      ingredients: insertedIngredients,
    };
  } catch (error) {
    console.error("Error seeding recipes:", error);
    throw error;
  }
}

const steps: Step[] = [
  {
    id: "5a6836ac-a2ad-4b71-a51c-c47d1ea1f93a",
    recipe_id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    value: "Cook meat",
  },
  {
    id: "5a6836ac-a2ad-4b71-a51c-c47d1ea1f93b",
    recipe_id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    value: "Put pastry in pie dish",
  },
  {
    id: "5a6836ac-a2ad-4b71-a51c-c47d1ea1f93c",
    recipe_id: "e3e4471b-12f9-43e8-9b8c-18b252fa237a",
    value: "Cook in oven",
  },
];

async function seedSteps(client: any) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS steps;`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS steps (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recipe_id UUID NOT NULL, 
        value VARCHAR(255) NOT NULL,
        CONSTRAINT fk_recipe
        FOREIGN KEY(recipe_id) 
          REFERENCES recipes(id)
          ON DELETE CASCADE
      );
    `;

    console.log(`Created "steps" table`);

    const insertedSteps = await Promise.all(
      steps.map(async (step) => {
        return client.sql`
        INSERT INTO steps (id, recipe_id, value)
        VALUES (${step.id}, ${step.recipe_id}, ${step.value})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedSteps.length} recipes`);

    return {
      createTable,
      ingredients: insertedSteps,
    };
  } catch (error) {
    console.error("Error seeding steps:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedRecipes(client);
  await seedIngredients(client);
  await seedSteps(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
