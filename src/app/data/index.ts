import { Recipe } from "../add_recipe/page"

export function getRecipes() {
    const storedRecipes = localStorage.getItem('recipes') ?? '[]'
    const recipes = JSON.parse(storedRecipes) as Recipe[]
    return recipes
}

export function getRecipe(id: string) {
    const recipes = getRecipes();
    return recipes.find(recipe => recipe.id === id);
}