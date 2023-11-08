import { Recipe } from "@/app/models"
import { sql } from "@vercel/postgres"

(async function() {
  const recipeData: Recipe = {
        id: crypto.randomUUID(),
        title : 'pigeon pie',
  }
  await sql`
      INSERT INTO recipes (id, title)
      VALUES (${recipeData.id}, ${recipeData.title});
  `
})()
