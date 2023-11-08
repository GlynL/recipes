'use server'
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RecipeSchema } from "../models";


export async function createRecipe(prevState: any, formData: FormData) {
    const recipeData = {
         id : crypto.randomUUID(),
         title : formData.get('title') as string,
    }
    const {id, title} = RecipeSchema.parse(recipeData)
    try{
        await sql`
            INSERT INTO recipes (id, title)
            VALUES (${id}, ${title})
        `
    } catch(err) {
        // console.error(err)
        return { message: "Database Error"}
    }
    revalidatePath('/')
    redirect('/')
}

export async function deleteRecipe(id: string) {
    try {
        await sql`DELETE FROM recipes WHERE id = ${id};`
    } catch(err){
        // console.error(err)
        return {message: "Database Error"}
    }
    revalidatePath('/');
}