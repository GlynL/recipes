'use client'
import { Link } from "./components/basic"
import { getRecipes } from "./data"

const Recipes = () => {
    const recipes = getRecipes()
    return (
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.title}>
                    <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Recipes