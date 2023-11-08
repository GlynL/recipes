import {  z } from "zod"

export const RecipeSchema = z.object({
    id: z.string(),
    title: z.string()
})

export const RecipeSchemaArray = z.array(RecipeSchema)

export type Recipe = z.infer<typeof RecipeSchema>


export const IngredientSchema = z.object({
    id: z.string(),
    recipe_id: z.string(),
    value: z.string(),  
})

export const IngredientSchemaArray = z.array(IngredientSchema)

export type Ingredient = z.infer<typeof IngredientSchema>