import { Link } from "./components/basic"
import { getRecipes } from "./data"
import { deleteRecipe } from "./lib/actions"
import { Recipe } from "./models"

const Recipes = async () => {
    const recipes = await getRecipes()

    return (
        <ul>
            {recipes.map(recipe => (
                <RecipeSingle recipe={recipe} />
            ))}
        </ul>
    )
}

export default Recipes

const RecipeSingle = ({ recipe }: {recipe: Recipe}) => {
    const deleteRecipeWithId = deleteRecipe.bind(null, recipe.id);
    return (
        <li key={recipe.id}>
            <form action={deleteRecipeWithId}>
                <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                <button>delete</button>
            </form>
        </li>
    )
}